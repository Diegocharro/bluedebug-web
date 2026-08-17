"use client";

import { motion } from "motion/react";
import KnotDiagram from "@/components/KnotDiagram";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const FACTS = [
  "04 proyectos en producción",
  "02 federaciones deportivas",
  "0 hojas de papel",
];

export default function Hero() {
  return (
    <section className="blueprint relative overflow-hidden pt-[132px] pb-20 lg:pb-28">
      <div className="mx-auto grid w-[min(1180px,92vw)] items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <div>
          <motion.div custom={0} variants={fade} initial="hidden" animate="show" className="mono" style={{ color: "var(--blue)" }}>
            Bluedebug / ingeniería de procesos — desde 2025
            <span className="blink">▮</span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="font-display mt-6 text-[clamp(2.5rem,5.6vw,4.3rem)] font-extrabold leading-[1.02] tracking-[-0.042em]"
          >
            El trabajo manual
            <br />
            que sobra,{" "}
            <span className="relative inline-block" style={{ color: "var(--blue)" }}>
              fuera
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-x-0 bottom-[0.04em] h-[4px] origin-left"
                style={{ background: "var(--signal)" }}
              />
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-[30rem] text-[1.05rem] leading-[1.7]"
            style={{ color: "var(--ink-soft)" }}
          >
            No vendemos IA ni transformación digital. Auditamos lo que tu equipo
            hace a mano, lo medimos en horas y construimos el sistema que lo
            sustituye.
          </motion.p>

          <motion.div
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <a
              href="#contacto"
              className="inline-flex items-center gap-2.5 text-[0.9rem] font-semibold text-white transition-all duration-150"
              style={{
                background: "var(--ink)",
                padding: "16px 30px",
                boxShadow: "var(--shadow-hard)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(3px,3px)";
                e.currentTarget.style.boxShadow = "2px 2px 0 var(--signal)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "var(--shadow-hard)";
              }}
            >
              Agendar llamada gratuita ⟶
            </a>
            <a
              href="#metodo"
              className="text-[0.9rem] font-medium underline-offset-4 hover:underline"
              style={{ color: "var(--ink-soft)" }}
            >
              Ver cómo trabajamos
            </a>
          </motion.div>

          <motion.ul
            custom={4}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mono mt-11 flex flex-wrap gap-x-8 gap-y-3"
            style={{ color: "var(--ink-faint)" }}
          >
            {FACTS.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <KnotDiagram />
        </motion.div>
      </div>
    </section>
  );
}
