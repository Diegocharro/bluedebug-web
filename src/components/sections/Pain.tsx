"use client";

import { motion } from "framer-motion";
import { Clock, FileX, RefreshCw, TrendingDown } from "lucide-react";

const pains = [
  {
    icon: Clock,
    title: "Horas perdidas en tareas repetitivas",
    description:
      "Tu equipo dedica horas cada semana a introducir datos, copiar información entre sistemas y hacer seguimientos manuales.",
  },
  {
    icon: FileX,
    title: "Errores humanos costosos",
    description:
      "Los procesos manuales generan errores que cuestan tiempo, dinero y credibilidad frente a tus clientes.",
  },
  {
    icon: RefreshCw,
    title: "Procesos imposibles de escalar",
    description:
      "Cada vez que crece el volumen de trabajo, tienes que contratar más personas en lugar de optimizar lo que ya tienes.",
  },
  {
    icon: TrendingDown,
    title: "Visibilidad cero sobre tus operaciones",
    description:
      "Sin datos en tiempo real, tomar decisiones es adivinar. No sabes qué funciona y qué está frenando tu crecimiento.",
  },
];

export default function Pain() {
  return (
    <section className="py-28 relative" id="pain">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 52 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="max-w-[560px] mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-5"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#f87171",
            }}
          >
            El problema
          </div>
          <h2 className="text-4xl font-black tracking-[-0.025em] leading-[1.1] mb-5">
            ¿Cuántas horas pierde tu equipo{" "}
            <span style={{ color: "#f87171" }}>cada semana?</span>
          </h2>
          <p className="text-[16px] leading-relaxed" style={{ color: "var(--bd-muted)" }}>
            La mayoría de pymes y startups operan con procesos diseñados para
            cuando eran pequeños. A medida que creces, esos procesos manuales
            se convierten en el mayor freno de tu empresa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {pains.map((pain, i) => {
            const Icon = pain.icon;
            return (
              <motion.div
                key={pain.title}
                initial={{ opacity: 0, y: 52 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl group cursor-default overflow-hidden"
                style={{
                  background: "var(--bd-card)",
                  border: "1px solid var(--bd-border)",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(239,68,68,0.07)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--bd-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Accent top bar */}
                <div
                  className="h-[2px] w-full"
                  style={{ background: "linear-gradient(90deg, rgba(239,68,68,0.7), rgba(239,68,68,0.1))" }}
                />
                <div className="p-6">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.2)",
                    }}
                  >
                    <Icon size={20} color="#f87171" />
                  </div>
                  <h3 className="text-[15px] font-bold mb-2 tracking-tight">
                    {pain.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: "var(--bd-muted)" }}>
                    {pain.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
