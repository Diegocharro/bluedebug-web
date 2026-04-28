"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, GitBranch, BarChart3 } from "lucide-react";

const pillars = [
  {
    icon: Cpu,
    title: "Automatización de procesos",
    description:
      "Identificamos las tareas que más tiempo consumen y las automatizamos para que ocurran solas, sin intervención humana.",
  },
  {
    icon: GitBranch,
    title: "Integración de sistemas",
    description:
      "Conectamos tus herramientas actuales para que hablen entre sí y la información fluya sin copiar y pegar.",
  },
  {
    icon: BarChart3,
    title: "Dashboards y visibilidad",
    description:
      "Construimos paneles a medida para que veas en tiempo real cómo funciona tu empresa y dónde están los cuellos de botella.",
  },
];

export default function Solution() {
  return (
    <section
      className="py-16 lg:py-28 relative overflow-hidden"
      id="solution"
      style={{ borderTop: "1px solid var(--bd-border)" }}
    >
      {/* Glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(8,146,208,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: flow visual */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              className="rounded-2xl p-8"
              style={{
                background: "var(--bd-card)",
                border: "1px solid var(--bd-border-strong)",
              }}
            >
              <div
                className="text-[11px] font-semibold uppercase tracking-widest mb-6"
                style={{ color: "var(--bd-muted)" }}
              >
                Antes vs. Después
              </div>

              {/* Before */}
              <div className="mb-6">
                <div className="text-[12px] font-medium mb-3" style={{ color: "#f87171" }}>
                  Antes — Manual
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Entrada datos", "Revisión manual", "Copia a Excel", "Email a equipo", "Seguimiento", "Reporte final"].map(
                    (step) => (
                      <div
                        key={step}
                        className="px-3 py-1.5 rounded-lg text-[11px] font-medium"
                        style={{
                          background: "rgba(239,68,68,0.08)",
                          border: "1px solid rgba(239,68,68,0.15)",
                          color: "rgba(255,255,255,0.5)",
                        }}
                      >
                        {step}
                      </div>
                    )
                  )}
                </div>
                <div className="mt-3 text-[11px]" style={{ color: "var(--bd-subtle)" }}>
                  ⏱ ~6 horas/semana por persona
                </div>
              </div>

              <div
                className="w-full h-px my-5"
                style={{ background: "var(--bd-border)" }}
              />

              {/* After */}
              <div>
                <div className="text-[12px] font-medium mb-3" style={{ color: "var(--bd-blue)" }}>
                  Después — Automatizado
                </div>
                <div className="flex items-center gap-3">
                  {[
                    { label: "Entrada", icon: "📥" },
                    { label: "Proceso", icon: "⚙️" },
                    { label: "Resultado", icon: "✅" },
                  ].map((step, i) => (
                    <div key={step.label} className="flex items-center gap-3">
                      <div
                        className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl text-center"
                        style={{
                          background: "var(--bd-blue-dim)",
                          border: "1px solid var(--bd-blue-border)",
                        }}
                      >
                        <span className="text-lg">{step.icon}</span>
                        <span className="text-[10px] font-semibold text-white">
                          {step.label}
                        </span>
                      </div>
                      {i < 2 && (
                        <ArrowRight size={14} style={{ color: "var(--bd-blue)" }} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-[11px]" style={{ color: "var(--bd-blue)" }}>
                  ⚡ 0 horas · ocurre automáticamente
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 52 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-5"
                style={{
                  background: "var(--bd-blue-dim)",
                  border: "1px solid var(--bd-blue-border)",
                  color: "var(--bd-blue)",
                }}
              >
                La solución
              </div>
              <h2 className="text-4xl font-black tracking-[-0.025em] leading-[1.1] mb-5">
                Automatizamos tus procesos para que{" "}
                <span className="text-gradient-blue">puedas escalar</span>
              </h2>
              <p
                className="text-[16px] leading-relaxed mb-10"
                style={{ color: "var(--bd-muted)" }}
              >
                Analizamos cómo trabaja tu empresa, identificamos los cuellos
                de botella y construimos las soluciones a medida que eliminan
                el trabajo repetitivo de raíz.
              </p>
            </motion.div>

            <div className="space-y-4">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4 p-5 rounded-xl overflow-hidden"
                    style={{
                      background: "var(--bd-card)",
                      border: "1px solid var(--bd-border)",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                      borderLeft: "3px solid rgba(8,146,208,0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(8,146,208,0.5)";
                      e.currentTarget.style.boxShadow = "0 4px 24px rgba(8,146,208,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--bd-border)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderLeftColor = "rgba(8,146,208,0.4)";
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: "var(--bd-blue-dim)",
                        border: "1px solid var(--bd-blue-border)",
                      }}
                    >
                      <Icon size={18} style={{ color: "var(--bd-blue)" }} />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold mb-1">
                        {pillar.title}
                      </div>
                      <div
                        className="text-[13px] leading-relaxed"
                        style={{ color: "var(--bd-muted)" }}
                      >
                        {pillar.description}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
