"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Calculator() {
  const [hours, setHours] = useState(10);
  const [people, setPeople] = useState(3);
  const [rate, setRate] = useState(20);

  const weeklyCost = hours * people * rate;
  const monthlyCost = weeklyCost * 4;
  const yearlyCost = monthlyCost * 12;
  const savedHoursMonth = hours * people * 4 * 0.7;
  const savedMoneyMonth = Math.round(monthlyCost * 0.7);

  return (
    <section
      className="py-28 relative overflow-hidden"
      id="calculator"
      style={{ borderTop: "1px solid var(--bd-border)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 100%, rgba(8,146,208,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 52 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-[520px] mx-auto mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-5"
            style={{
              background: "var(--bd-blue-dim)",
              border: "1px solid var(--bd-blue-border)",
              color: "var(--bd-blue)",
            }}
          >
            Calculadora de ahorro
          </div>
          <h2 className="text-4xl font-black tracking-[-0.025em] leading-[1.1] mb-4">
            ¿Cuánto te cuesta{" "}
            <span className="text-gradient-blue">no automatizar?</span>
          </h2>
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--bd-muted)" }}>
            Ajusta los valores de tu empresa y descubre el coste real de los
            procesos manuales.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 52 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-[860px] mx-auto rounded-2xl overflow-hidden"
          style={{
            background: "var(--bd-card)",
            border: "1px solid var(--bd-border-strong)",
          }}
        >
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x"
            style={{ borderColor: "var(--bd-border)" }}>
            {/* Inputs */}
            <div className="p-8">
              <h3 className="text-[15px] font-bold mb-8 tracking-tight">
                Tu situación actual
              </h3>

              <div className="space-y-8">
                <SliderField
                  label="Horas semanales en tareas manuales"
                  value={hours}
                  onChange={setHours}
                  min={1} max={40} step={1}
                  suffix="h/semana"
                />
                <SliderField
                  label="Personas involucradas"
                  value={people}
                  onChange={setPeople}
                  min={1} max={20} step={1}
                  suffix="personas"
                />
                <SliderField
                  label="Coste/hora estimado"
                  value={rate}
                  onChange={setRate}
                  min={10} max={60} step={5}
                  suffix="€/hora"
                />
              </div>
            </div>

            {/* Results */}
            <div
              className="p-8 flex flex-col justify-between"
              style={{ background: "rgba(8,146,208,0.03)" }}
            >
              <div>
                <h3 className="text-[15px] font-bold mb-2 tracking-tight">
                  Tu potencial de ahorro
                </h3>
                <p className="text-[12px] mb-8" style={{ color: "var(--bd-muted)" }}>
                  Estimando un 70% de automatización
                </p>

                <div className="space-y-4 mb-8">
                  <ResultRow
                    label="Horas liberadas/mes"
                    value={`${Math.round(savedHoursMonth)}h`}
                    accent
                  />
                  <ResultRow
                    label="Ahorro mensual estimado"
                    value={`${savedMoneyMonth.toLocaleString("es-ES")}€`}
                    accent
                  />
                  <ResultRow
                    label="Ahorro anual estimado"
                    value={`${Math.round(yearlyCost * 0.7).toLocaleString("es-ES")}€`}
                    highlight
                  />
                  <ResultRow
                    label="Coste actual anual (sin automatizar)"
                    value={`${yearlyCost.toLocaleString("es-ES")}€`}
                    muted
                  />
                </div>
              </div>

              <a
                href="#contact"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-[14px] font-semibold text-white transition-all duration-200"
                style={{ background: "var(--bd-blue)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#0780bc")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bd-blue)")}
              >
                Quiero ahorrar {savedMoneyMonth.toLocaleString("es-ES")}€/mes
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SliderField({
  label, value, onChange, min, max, step, suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number; max: number; step: number;
  suffix: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-[13px] font-medium" style={{ color: "var(--bd-muted)" }}>
          {label}
        </label>
        <span className="text-[14px] font-bold text-white">
          {value} {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(90deg, var(--bd-blue) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%)`,
          accentColor: "var(--bd-blue)",
        }}
      />
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px]" style={{ color: "var(--bd-subtle)" }}>{min}</span>
        <span className="text-[10px]" style={{ color: "var(--bd-subtle)" }}>{max}</span>
      </div>
    </div>
  );
}

function ResultRow({
  label, value, accent, muted, highlight,
}: {
  label: string; value: string; accent?: boolean; muted?: boolean; highlight?: boolean;
}) {
  if (highlight) {
    return (
      <div
        className="flex items-center justify-between px-4 py-3 rounded-xl"
        style={{
          background: "rgba(8,146,208,0.08)",
          border: "1px solid rgba(8,146,208,0.2)",
        }}
      >
        <span className="text-[13px] font-semibold text-white">{label}</span>
        <span className="text-[20px] font-black tracking-tight text-gradient-blue">
          {value}
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "var(--bd-border)" }}>
      <span className="text-[13px]" style={{ color: "var(--bd-muted)" }}>
        {label}
      </span>
      <span
        className="text-[15px] font-black tracking-tight"
        style={{
          color: accent
            ? "var(--bd-blue)"
            : muted
            ? "rgba(255,255,255,0.3)"
            : "#fff",
        }}
      >
        {value}
      </span>
    </div>
  );
}
