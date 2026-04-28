"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  motion,
  useMotionTemplate,
} from "framer-motion";
import type { MotionValue } from "framer-motion";

// Waypoints [scrollProgress, x%, y%] — weaves across the viewport as you scroll
const KEYS = [0, 0.13, 0.27, 0.41, 0.55, 0.69, 0.83, 1];
const XS   = [80, 13,  78,  14,  74,  15,  64,  50];
const YS   = [7,  19,  33,  47,  61,  75,  87,  95];

// SVG path in viewBox 0 0 100 100 (matches the waypoints as %)
const PATH =
  "M 80 7 C 80 13 20 13 13 19 C 6 25 72 27 78 33 C 84 39 8 41 14 47 C 20 53 78 55 74 61 C 70 67 8 69 15 75 C 21 81 67 81 64 87 C 61 92 52 93 50 95";

function RocketSVG() {
  return (
    <svg width="22" height="32" viewBox="0 0 22 32" fill="none">
      {/* nose */}
      <path d="M11 1L18 12H4L11 1Z" fill="#5ec8f0" />
      {/* body */}
      <rect x="4" y="12" width="14" height="12" rx="2" fill="white" fillOpacity={0.92} />
      {/* porthole */}
      <circle cx="11" cy="18" r="3" fill="#0892D0" fillOpacity={0.6} />
      <circle cx="11" cy="18" r="1.6" fill="#5ec8f0" fillOpacity={0.45} />
      {/* fins */}
      <path d="M4 20L1 28L5 26V20Z" fill="#0892D0" fillOpacity={0.75} />
      <path d="M18 20L21 28L17 26V20Z" fill="#0892D0" fillOpacity={0.75} />
      {/* flame */}
      <motion.ellipse
        cx={11} cy={26} rx={3.5} ry={4.5}
        fill="#ff9900" fillOpacity={0.88}
        animate={{ ry: [4.5, 6.5, 3.8, 6, 4.5], opacity: [0.88, 1, 0.75, 0.95, 0.88] }}
        transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.ellipse
        cx={11} cy={26} rx={1.8} ry={2.5}
        fill="#ffee44" fillOpacity={0.9}
        animate={{ ry: [2.5, 4, 2, 3.5, 2.5] }}
        transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function ScrollRocket() {
  const { scrollYProgress } = useScroll();
  const pathRef = useRef<SVGPathElement>(null);
  const lastAngle = useRef(135);
  const [pathLength, setPathLength] = useState(0);

  useLayoutEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
  }, []);

  const xRaw = useTransform(scrollYProgress, KEYS, XS);
  const yRaw = useTransform(scrollYProgress, KEYS, YS);
  const xSpring = useSpring(xRaw, { stiffness: 85, damping: 24 });
  const ySpring = useSpring(yRaw, { stiffness: 85, damping: 24 });

  const xVel = useVelocity(xSpring);
  const yVel = useVelocity(ySpring);

  const rotateRaw = useTransform(
    [xVel, yVel] as MotionValue<number>[],
    ([vx, vy]: number[]) => {
      const spd = Math.sqrt(vx * vx + vy * vy);
      if (spd < 1) return lastAngle.current;
      const angle = Math.atan2(vy, vx) * (180 / Math.PI) + 90;
      lastAngle.current = angle;
      return angle;
    }
  );
  const rotate = useSpring(rotateRaw, { stiffness: 55, damping: 18 });

  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [pathLength, 0]);

  const left = useMotionTemplate`${xSpring}vw`;
  const top  = useMotionTemplate`${ySpring}vh`;

  return (
    <>
      {/* SVG route overlay */}
      <svg
        className="fixed inset-0 pointer-events-none hidden lg:block"
        style={{ width: "100vw", height: "100vh", zIndex: 5 }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Invisible path used to measure total length */}
        <path ref={pathRef} d={PATH} fill="none" stroke="none" />

        {/* Ghost route (full path, very faint) */}
        <path
          d={PATH}
          fill="none"
          stroke="rgba(8,146,208,0.07)"
          strokeWidth="0.22"
          strokeDasharray="1.4 2"
        />

        {/* Drawn route (revealed as you scroll) */}
        {pathLength > 0 && (
          <motion.path
            d={PATH}
            fill="none"
            stroke="rgba(8,146,208,0.28)"
            strokeWidth="0.22"
            strokeLinecap="round"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset,
            }}
          />
        )}
      </svg>

      {/* Rocket */}
      <motion.div
        className="fixed pointer-events-none select-none hidden lg:block"
        style={{
          left,
          top,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 15,
        }}
        aria-hidden="true"
      >
        <motion.div style={{ rotate }} className="relative">
          <RocketSVG />
          {/* Glow halo */}
          <div
            className="absolute inset-0 -z-10 rounded-full blur-xl"
            style={{
              background: "radial-gradient(circle, rgba(8,146,208,0.45) 0%, transparent 70%)",
              transform: "scale(3.5)",
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
