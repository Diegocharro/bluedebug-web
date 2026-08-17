"use client";

import { useMemo, useState } from "react";
import AreaChart, { Area } from "@/components/charts/area-chart";
import Grid from "@/components/charts/grid";
import XAxis from "@/components/charts/x-axis";
import Reveal from "@/components/Reveal";

const BASE_YEAR = 2026;

/** Lo que se recupera no es el 100%: revisar y supervisar sigue costando. */
const RECOVERY_RATE = 0.75;

function euros(value: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Calculator() {
  const [people, setPeople] = useState(4);
  const [hours, setHours] = useState(6);
  const [cost, setCost] = useState(22);

  const result = useMemo(() => {
    const weekly = people * hours * RECOVERY_RATE;
    const monthly = weekly * 4.33;
    const yearlyHours = weekly * 46;
    const yearlyCost = yearlyHours * cost;
    const data = Array.from({ length: 12 }, (_, i) => ({
      date: new Date(BASE_YEAR, i, 1),
      horas: Math.round(monthly * (i + 1)),
    }));
    return { weekly, monthly, yearlyHours, yearlyCost, data };
  }, [people, hours, cost]);

  return (
    <section id="calculadora" className="py-20 lg:py-28" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="mx-auto w-[min(1180px,92vw)]">
        <Reveal>
          <span className="mono" style={{ color: "var(--blue)" }}>
            04 — calculadora
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display mt-5 max-w-[20ch] text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-[1.06] tracking-[-0.038em]">
            Pon tus números y mira cuánto cuesta el trabajo manual
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px lg:grid-cols-[0.85fr_1.15fr]" style={{ background: "var(--line)" }}>
          {/* Controles */}
          <div className="flex flex-col gap-9 p-8" style={{ background: "var(--surface)" }}>
            <Field
              label="Personas haciendo tareas repetitivas"
              value={people}
              min={1}
              max={40}
              onChange={setPeople}
              suffix={people === 1 ? "persona" : "personas"}
            />
            <Field
              label="Horas a la semana, cada una"
              value={hours}
              min={1}
              max={30}
              onChange={setHours}
              suffix="h / semana"
            />
            <Field
              label="Coste por hora de esa persona"
              value={cost}
              min={10}
              max={90}
              onChange={setCost}
              suffix="€ / hora"
            />
            <p className="mono leading-[1.9]" style={{ color: "var(--ink-faint)" }}>
              Calculado sobre el 75% del tiempo: revisar y supervisar sigue
              costando algo. 46 semanas laborables al año.
            </p>
          </div>

          {/* Resultado */}
          <div className="p-8" style={{ background: "var(--surface)" }}>
            <div className="grid grid-cols-2 gap-px" style={{ background: "var(--line)" }}>
              <Metric
                value={`${Math.round(result.monthly)}h`}
                label="recuperadas al mes"
                accent="var(--blue)"
              />
              <Metric
                value={euros(result.yearlyCost)}
                label="que te cuesta al año"
                accent="var(--signal)"
              />
            </div>

            <div className="mono mt-8 mb-2 flex items-baseline justify-between" style={{ color: "var(--ink-faint)" }}>
              <span>horas acumuladas · primer año</span>
              <span style={{ color: "var(--blue)" }}>
                {Math.round(result.yearlyHours)}h
              </span>
            </div>

            <AreaChart
              data={result.data}
              xDataKey="date"
              aspectRatio="16 / 7"
              margin={{ top: 16, right: 8, bottom: 28, left: 34 }}
              revealSignature={`${people}-${hours}-${cost}`}
            >
              <Grid />
              <XAxis numTicks={4} />
              <Area
                dataKey="horas"
                stroke="var(--blue)"
                fill="var(--blue)"
                fillOpacity={0.16}
                strokeWidth={2.2}
              />
            </AreaChart>

            <a
              href="#contacto"
              className="mt-6 inline-flex text-[0.88rem] font-semibold text-white transition-all duration-150"
              style={{ background: "var(--blue)", padding: "14px 24px" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--blue)")}
            >
              Quiero el informe con mis números reales ⟶
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="text-[0.92rem] font-medium" style={{ color: "var(--ink-soft)" }}>
        {label}
      </div>
      <div className="mt-3 flex items-center gap-5">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="min-w-0 flex-1 accent-[var(--blue)]"
          aria-label={label}
        />
        <div className="shrink-0 text-right">
          <span className="font-display text-[1.5rem] font-extrabold leading-none tracking-[-0.04em]">
            {value}
          </span>
          <span className="mono ml-1.5" style={{ color: "var(--ink-faint)" }}>
            {suffix}
          </span>
        </div>
      </div>
    </div>
  );
}

function Metric({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent: string;
}) {
  return (
    <div className="p-6" style={{ background: "var(--surface)" }}>
      <div
        className="font-display text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold leading-none tracking-[-0.045em]"
        style={{ color: accent }}
      >
        {value}
      </div>
      <div className="mono mt-3" style={{ color: "var(--ink-faint)" }}>
        {label}
      </div>
    </div>
  );
}
