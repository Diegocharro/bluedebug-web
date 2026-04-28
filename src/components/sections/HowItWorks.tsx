"use client";

import { motion } from "framer-motion";
import { Search, Wrench, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Análisis",
    description:
      "Nos reunimos contigo, mapeamos tus procesos actuales e identificamos exactamente qué automatizar y en qué orden para maximizar el impacto desde el primer día.",
    duration: "1–2 semanas",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Automatización",
    description:
      "Construimos las soluciones a medida: integraciones entre sistemas, flujos automáticos, dashboards y herramientas personalizadas para tu equipo.",
    duration: "2–6 semanas",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Escalado",
    description:
      "Una vez que los procesos básicos funcionan solos, ampliamos la automatización a más áreas de tu empresa y medimos el impacto real en tiempo y dinero.",
    duration: "Continuo",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-16 lg:py-28 relative"
      id="how-it-works"
      style={{ borderTop: "1px solid var(--bd-border)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 52 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-[560px] mx-auto mb-12 lg:mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-5"
            style={{
              background: "var(--bd-blue-dim)",
              border: "1px solid var(--bd-blue-border)",
              color: "var(--bd-blue)",
            }}
          >
            Cómo funciona
          </div>
          <h2 className="text-4xl font-black tracking-[-0.025em] leading-[1.1] mb-4">
            De cero a automatizado{" "}
            <span className="text-gradient-blue">en 3 pasos</span>
          </h2>
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--bd-muted)" }}>
            Un proceso probado que minimiza el tiempo de puesta en marcha y
            maximiza el retorno desde el primer mes.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute top-12 left-[calc(16.67%)] right-[calc(16.67%)] hidden lg:block"
            style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(8,146,208,0.5), rgba(8,146,208,0.5), transparent)" }}
          />
          {/* Dots on the line at 33% and 66% */}
          <div className="absolute top-[44px] left-[33%] w-2 h-2 rounded-full hidden lg:block" style={{ background: "rgba(8,146,208,0.6)", transform: "translateX(-50%)" }} />
          <div className="absolute top-[44px] left-[66%] w-2 h-2 rounded-full hidden lg:block" style={{ background: "rgba(8,146,208,0.6)", transform: "translateX(-50%)" }} />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 52 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative"
                >
                  {/* Step number + icon */}
                  <div className="flex flex-col items-center mb-8">
                    <div
                      className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center mb-0 relative"
                      style={{
                        background: "var(--bd-card)",
                        border: "1px solid var(--bd-blue-border)",
                        boxShadow: "0 0 32px rgba(8,146,208,0.08)",
                      }}
                    >
                      <Icon size={28} style={{ color: "var(--bd-blue)" }} />
                      <span
                        className="absolute -top-2.5 -right-2.5 text-[10px] font-black px-2 py-0.5 rounded-full"
                        style={{
                          background: "var(--bd-blue)",
                          color: "#fff",
                        }}
                      >
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <div
                    className="p-6 rounded-xl text-center"
                    style={{
                      background: "var(--bd-card)",
                      border: "1px solid var(--bd-border)",
                    }}
                  >
                    <h3 className="text-xl font-black tracking-[-0.02em] mb-3">
                      {step.title}
                    </h3>
                    <p
                      className="text-[13px] leading-relaxed mb-4"
                      style={{ color: "var(--bd-muted)" }}
                    >
                      {step.description}
                    </p>
                    <div
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: "var(--bd-blue-dim)",
                        color: "var(--bd-blue)",
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {step.duration}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 52 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold text-white transition-all duration-200"
            style={{ background: "var(--bd-blue)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#0780bc";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--bd-blue)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Empezar el análisis gratuito
          </a>
        </motion.div>
      </div>
    </section>
  );
}
