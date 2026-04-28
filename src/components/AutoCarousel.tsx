"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";

const CARD_WIDTH = 180;
const CARD_GAP = 16;
const STEP = CARD_WIDTH + CARD_GAP;
const INTERVAL = 2200;

export default function AutoCarousel({
  images,
  color,
  appName,
}: {
  images: string[];
  color: string;
  appName: string;
}) {
  const [current, setCurrent] = useState(0);
  const controls = useAnimationControls();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = images.length;

  // Duplicate for seamless loop
  const looped = [...images, ...images, ...images];

  useEffect(() => {
    const advance = () => {
      setCurrent((prev) => {
        const next = prev + 1;
        controls.start({
          x: -next * STEP,
          transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
        });
        // Reset silently when we've gone through one full set
        if (next >= total) {
          setTimeout(() => {
            controls.set({ x: 0 });
            setCurrent(0);
          }, 650);
        }
        return next >= total ? 0 : next;
      });
    };

    timerRef.current = setInterval(advance, INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [controls, total]);

  return (
    <div className="w-full overflow-hidden" style={{ padding: "8px 0" }}>
      <motion.div
        animate={controls}
        initial={{ x: 0 }}
        className="flex"
        style={{ gap: CARD_GAP, willChange: "transform" }}
      >
        {looped.map((src, i) => {
          const realIdx = i % total;
          const isActive = realIdx === current;
          return (
            <motion.div
              key={`${src}-${i}`}
              animate={{ scale: isActive ? 1.04 : 1, opacity: isActive ? 1 : 0.65 }}
              transition={{ duration: 0.4 }}
              className="relative flex-shrink-0 rounded-2xl overflow-hidden shadow-xl"
              style={{
                width: CARD_WIDTH,
                height: 340,
                border: isActive ? `2px solid ${color}` : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Image
                src={src}
                alt={`${appName} ${realIdx + 1}`}
                fill
                className="object-cover object-top"
                sizes="180px"
              />
              {isActive && (
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    boxShadow: `0 0 24px ${color}40`,
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {images.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              background: i === current ? color : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
