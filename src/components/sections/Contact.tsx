"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site-config";

const AREAS = [
  "Tareas repetitivas",
  "Integrar sistemas",
  "Paneles y datos",
  "App a medida",
  "Aún no lo tengo claro",
];

type State = "idle" | "sending" | "sent" | "error" | "unconfigured";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    area: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Hace falta tu nombre";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Email no válido";
    if (!form.area) next.area = "Elige una opción";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setState("sending");
    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => null);
      if (response.ok) setState("sent");
      else if (data?.error === "unconfigured") setState("unconfigured");
      else setState("error");
    } catch {
      setState("error");
    }
  }

  return (
    <section id="contacto" className="blueprint py-20 lg:py-28" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="mx-auto grid w-[min(1180px,92vw)] gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal>
            <span className="mono" style={{ color: "var(--signal)" }}>
              07 — hablemos
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display mt-5 max-w-[16ch] text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-[1.06] tracking-[-0.038em]">
              Cuéntanos qué se hace a mano en tu empresa
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[42ch] text-[1rem] leading-[1.7]" style={{ color: "var(--ink-soft)" }}>
              Una llamada, sin compromiso. Salimos de ahí sabiendo los dos si
              esto tiene sentido o no. Si no lo tiene, te lo decimos en esa
              misma llamada.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-8 flex flex-col gap-3">
              {[
                "Primera llamada gratis y sin compromiso",
                "Presupuesto cerrado antes de firmar nada",
                "Sin permanencias ni licencias nuestras",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.95rem]" style={{ color: "var(--ink-soft)" }}>
                  <span className="mono mt-0.5" style={{ color: "var(--blue)" }}>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          {state === "sent" ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="cornered p-10"
              style={{ background: "var(--surface)", border: "1px solid var(--line-strong)" }}
            >
              <div className="mono" style={{ color: "var(--blue)" }}>
                mensaje recibido
              </div>
              <h3 className="font-display mt-4 text-[1.6rem] font-extrabold tracking-[-0.03em]">
                Te escribimos en cuanto lo veamos
              </h3>
              <p className="mt-3 text-[0.95rem] leading-[1.7]" style={{ color: "var(--ink-soft)" }}>
                Revisa también la carpeta de spam, que a veces se cuela ahí.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="cornered flex flex-col gap-5 p-8"
              style={{ background: "var(--surface)", border: "1px solid var(--line-strong)" }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Nombre *"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  error={errors.name}
                />
                <Field
                  label="Email *"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  error={errors.email}
                />
              </div>
              <Field
                label="Empresa"
                value={form.company}
                onChange={(v) => setForm({ ...form, company: v })}
              />

              <div>
                <span className="mono block" style={{ color: "var(--ink-faint)" }}>
                  ¿Por dónde empezamos? *
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {AREAS.map((area) => {
                    const active = form.area === area;
                    return (
                      <button
                        key={area}
                        type="button"
                        onClick={() => setForm({ ...form, area })}
                        className="mono px-3 py-2 transition-colors duration-150"
                        style={{
                          background: active ? "var(--blue)" : "transparent",
                          border: `1px solid ${active ? "var(--blue)" : "var(--line-strong)"}`,
                          color: active ? "#fff" : "var(--ink-soft)",
                        }}
                      >
                        {area}
                      </button>
                    );
                  })}
                </div>
                {errors.area && (
                  <p className="mono mt-2" style={{ color: "var(--signal)" }}>
                    {errors.area}
                  </p>
                )}
              </div>

              <label className="block">
                <span className="mono block" style={{ color: "var(--ink-faint)" }}>
                  Cuéntanos un poco más
                </span>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Qué proceso te está comiendo el tiempo…"
                  className="mt-2 w-full px-4 py-3 text-[0.92rem] outline-none"
                  style={{
                    background: "var(--paper)",
                    border: "1px solid var(--line-strong)",
                    color: "var(--ink)",
                  }}
                />
              </label>

              <button
                type="submit"
                disabled={state === "sending"}
                className="mt-1 w-full py-4 text-[0.9rem] font-semibold text-white transition-all duration-150 disabled:opacity-60"
                style={{ background: "var(--ink)", boxShadow: "var(--shadow-hard)" }}
              >
                {state === "sending" ? "Enviando…" : "Agendar llamada gratuita ⟶"}
              </button>

              {state === "unconfigured" && (
                <p className="mono leading-[1.8]" style={{ color: "var(--signal)" }}>
                  El envío todavía no está conectado. Escríbenos directamente a{" "}
                  <a href={`mailto:${site.email}`} className="underline">
                    {site.email}
                  </a>
                </p>
              )}
              {state === "error" && (
                <p className="mono leading-[1.8]" style={{ color: "var(--signal)" }}>
                  No hemos podido enviarlo. Prueba otra vez o escríbenos a{" "}
                  <a href={`mailto:${site.email}`} className="underline">
                    {site.email}
                  </a>
                </p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mono block" style={{ color: "var(--ink-faint)" }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full px-4 py-3 text-[0.92rem] outline-none"
        style={{
          background: "var(--paper)",
          border: `1px solid ${error ? "var(--signal)" : "var(--line-strong)"}`,
          color: "var(--ink)",
        }}
      />
      {error && (
        <span className="mono mt-1.5 block" style={{ color: "var(--signal)" }}>
          {error}
        </span>
      )}
    </label>
  );
}
