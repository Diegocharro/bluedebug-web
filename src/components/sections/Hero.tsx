"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center grid-bg overflow-hidden"
      style={{ paddingTop: "72px" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(8,146,208,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase"
              style={{
                background: "var(--bd-blue-dim)",
                border: "1px solid var(--bd-blue-border)",
                color: "var(--bd-blue)",
              }}
            >
              <Zap size={10} fill="currentColor" />
              Automatización empresarial
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[2.5rem] sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-[1.05] mb-6"
            >
              Automatiza tu empresa{" "}
              <span className="text-gradient-blue">y ahorra tiempo</span>{" "}
              desde el primer mes
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[17px] leading-relaxed mb-10 max-w-[480px]"
              style={{ color: "var(--bd-muted)" }}
            >
              Eliminamos las tareas manuales que frenan tu crecimiento y
              optimizamos tus procesos para que puedas centrarte en escalar
              tu negocio.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-[14px] font-semibold text-white transition-all duration-200 group"
                style={{ background: "var(--bd-blue)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0780bc";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(8,146,208,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--bd-blue)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Agendar llamada gratuita
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-[14px] font-medium transition-colors duration-200"
                style={{ color: "var(--bd-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--bd-muted)")}
              >
                Ver cómo funciona
                <ArrowRight size={13} />
              </a>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {[
                "+4 apps en producción",
                "Federaciones autonómicas",
                "Entornos reales",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-[12px]"
                  style={{ color: "var(--bd-subtle)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--bd-blue)" }}
                  />
                  {item}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: floating UI cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[480px] hidden lg:block"
          >
            {/* Background glow behind cards */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 70% 60% at 60% 45%, rgba(8,146,208,0.12) 0%, transparent 70%)",
                filter: "blur(24px)",
              }}
            />
            {/* Main dashboard card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-[300px] rounded-xl p-5"
              style={{
                background: "var(--bd-card)",
                border: "1px solid var(--bd-border-strong)",
                boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-medium" style={{ color: "var(--bd-muted)" }}>
                  Horas ahorradas este mes
                </span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(8,146,208,0.12)",
                    color: "var(--bd-blue)",
                  }}
                >
                  +47%
                </span>
              </div>
              <div className="text-3xl font-black tracking-tight mb-4">
                <span className="text-gradient-blue">40h</span>
                <span className="text-lg font-medium ml-1" style={{ color: "var(--bd-muted)" }}>
                  /mes
                </span>
              </div>
              <div className="space-y-2">
                {[72, 45, 88, 60].map((w, i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #0892D0, #5ec8f0)" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${w}%` }}
                      transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Process flow card */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 left-0 w-[260px] rounded-xl p-4"
              style={{
                background: "var(--bd-elevated)",
                border: "1px solid var(--bd-border)",
                boxShadow: "0 16px 32px rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--bd-muted)" }}
              >
                Flujo automatizado
              </div>
              <div className="flex items-center gap-2">
                {[
                  { icon: "📥", label: "Entrada" },
                  { icon: "⚙️", label: "Proceso" },
                  { icon: "✅", label: "Listo" },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-lg flex flex-col items-center justify-center gap-0.5"
                      style={{
                        background: "rgba(8,146,208,0.1)",
                        border: "1px solid rgba(8,146,208,0.2)",
                      }}
                    >
                      <span className="text-sm">{step.icon}</span>
                    </div>
                    {i < 2 && (
                      <div
                        className="w-6 h-px"
                        style={{ background: "rgba(8,146,208,0.25)" }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div
                className="mt-3 text-[10px] flex items-center gap-1.5"
                style={{ color: "var(--bd-subtle)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"
                />
                Activo · 3 procesos en ejecución
              </div>
            </motion.div>

            {/* ROI badge */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-44 left-8 rounded-xl px-4 py-3"
              style={{
                background: "var(--bd-elevated)",
                border: "1px solid var(--bd-border-strong)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
              }}
            >
              <div className="text-[10px] font-medium mb-1" style={{ color: "var(--bd-muted)" }}>
                ROI estimado
              </div>
              <div className="text-xl font-black">
                <span className="text-gradient-blue">3.2x</span>
              </div>
              <div className="text-[9px]" style={{ color: "var(--bd-subtle)" }}>
                en los primeros 90 días
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
