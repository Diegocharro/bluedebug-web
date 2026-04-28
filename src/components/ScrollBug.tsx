"use client";

import { useRef } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  motion,
  useMotionTemplate,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import Image from "next/image";

// ─────────────────────────────────────────────────────────
// ✏️  EDITA EL RECORRIDO EN: http://localhost:3000/path-editor.html
//     Copia el código generado y pégalo aquí reemplazando
//     las tres constantes de abajo (KEYS, XS, YS).
// ─────────────────────────────────────────────────────────
const KEYS = [0, 0.077, 0.154, 0.231, 0.308, 0.385, 0.462, 0.538, 0.615, 0.692, 0.769, 0.846, 0.923, 1];
const XS   = [88, 70, 10, 6, 42, 7, 87, 92, 44, 7, 78, 12, 72, 50];
const YS   = [4, 15, 9, 26, 33, 40, 34, 52, 61, 70, 67, 83, 91, 97];

function LadybugWalker() {
  return (
    <motion.div
      // Simulación de pasos: rebota ligeramente arriba/abajo y se aplana un poco
      animate={{
        y: [0, -3, 0, -3, 0],
        scaleX: [1, 1.06, 1, 0.95, 1],
        scaleY: [1, 0.94, 1, 1.06, 1],
      }}
      transition={{
        duration: 0.45,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Image
        src="/logo.png"
        alt="Bluedebug bug"
        width={38}
        height={38}
        className="drop-shadow-lg"
        priority
      />
    </motion.div>
  );
}

export default function ScrollBug() {
  const { scrollYProgress } = useScroll();
  const lastAngle = useRef(90);

  const xRaw = useTransform(scrollYProgress, KEYS, XS);
  const yRaw = useTransform(scrollYProgress, KEYS, YS);
  const xSpring = useSpring(xRaw, { stiffness: 70, damping: 22 });
  const ySpring = useSpring(yRaw, { stiffness: 70, damping: 22 });

  const xVel = useVelocity(xSpring);
  const yVel = useVelocity(ySpring);

  // La mariquita rota para mirar hacia donde camina
  const rotateRaw = useTransform(
    [xVel, yVel] as MotionValue<number>[],
    ([vx, vy]: number[]) => {
      const spd = Math.sqrt(vx * vx + vy * vy);
      if (spd < 1) return lastAngle.current;
      // +90 porque el logo mira hacia arriba por defecto
      const angle = Math.atan2(vy, vx) * (180 / Math.PI) + 90;
      lastAngle.current = angle;
      return angle;
    }
  );
  const rotate = useSpring(rotateRaw, { stiffness: 45, damping: 16 });

  const left = useMotionTemplate`${xSpring}vw`;
  const top  = useMotionTemplate`${ySpring}vh`;

  return (
    <>
      {/* Mariquita — debajo del contenido (zIndex 2, el wrapper tiene zIndex 3) */}
      <motion.div
        className="fixed pointer-events-none select-none hidden lg:block"
        style={{
          left,
          top,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 2,
        }}
        aria-hidden="true"
      >
        <motion.div style={{ rotate }} className="relative flex items-center justify-center">
          {/* Aura exterior — pulsa lento */}
          <motion.div
            className="absolute rounded-full -z-10"
            style={{
              width: 80,
              height: 80,
              background: "radial-gradient(circle, rgba(8,146,208,0.35) 0%, rgba(8,146,208,0.08) 50%, transparent 70%)",
              filter: "blur(10px)",
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Anillo interior — pulsa más rápido y desfasado */}
          <motion.div
            className="absolute rounded-full -z-10"
            style={{
              width: 50,
              height: 50,
              background: "radial-gradient(circle, rgba(94,200,240,0.5) 0%, transparent 65%)",
              filter: "blur(5px)",
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
            }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.9, 0.4, 0.9] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <LadybugWalker />
        </motion.div>
      </motion.div>
    </>
  );
}
