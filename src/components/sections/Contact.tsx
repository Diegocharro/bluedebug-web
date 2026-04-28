"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

const areas = [
  "Automatización de tareas repetitivas",
  "Integración entre sistemas",
  "Dashboard y reportes automáticos",
  "App o herramienta a medida",
  "Otro / No lo tengo claro aún",
];

type FormState = "idle" | "loading" | "success";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    area: "",
    message: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nombre requerido";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email válido requerido";
    if (!form.area) e.area = "Selecciona una opción";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setFormState("success");
  }

  if (formState === "success") {
    return (
      <section className="py-16 lg:py-28" id="contact" style={{ borderTop: "1px solid var(--bd-border)" }}>
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-12 rounded-2xl"
            style={{ background: "var(--bd-card)", border: "1px solid var(--bd-blue-border)" }}
          >
            <CheckCircle size={48} style={{ color: "var(--bd-blue)" }} className="mx-auto mb-5" />
            <h3 className="text-2xl font-black mb-3 tracking-tight">¡Mensaje enviado!</h3>
            <p style={{ color: "var(--bd-muted)" }} className="text-[15px] leading-relaxed">
              Te contactaremos en menos de 24 horas para coordinar la llamada.
              Revisa tu bandeja de entrada (y el spam, por si acaso).
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-16 lg:py-28 relative overflow-hidden"
      id="contact"
      style={{ borderTop: "1px solid var(--bd-border)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(8,146,208,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 52 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
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
              Agenda una llamada
            </div>
            <h2 className="text-4xl font-black tracking-[-0.025em] leading-[1.1] mb-5">
              Cuéntanos qué necesitas.{" "}
              <span className="text-gradient-blue">Te llamamos nosotros.</span>
            </h2>
            <p className="text-[16px] leading-relaxed mb-8" style={{ color: "var(--bd-muted)" }}>
              Rellena el formulario y uno de nuestros especialistas te contactará
              en menos de 24 horas para una primera llamada sin compromiso donde
              analizaremos si podemos ayudarte.
            </p>

            <div className="space-y-4">
              {[
                { icon: "✓", text: "Primera llamada gratuita de 30 min" },
                { icon: "✓", text: "Análisis de viabilidad sin compromiso" },
                { icon: "✓", text: "Presupuesto detallado antes de firmar nada" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                    style={{ background: "var(--bd-blue-dim)", color: "var(--bd-blue)" }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[14px]" style={{ color: "var(--bd-muted)" }}>
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 52 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl space-y-5"
              style={{
                background: "var(--bd-card)",
                border: "1px solid var(--bd-border-strong)",
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Nombre *"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  error={errors.name}
                  placeholder="Tu nombre"
                />
                <Field
                  label="Email *"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  error={errors.email}
                  placeholder="tu@empresa.com"
                />
              </div>

              <Field
                label="Empresa"
                value={form.company}
                onChange={(v) => setForm({ ...form, company: v })}
                placeholder="Nombre de tu empresa"
              />

              {/* Area select */}
              <div>
                <label
                  className="block text-[12px] font-semibold mb-2"
                  style={{ color: "var(--bd-muted)" }}
                >
                  ¿Qué quieres automatizar? *
                </label>
                <div className="flex flex-wrap gap-2">
                  {areas.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => setForm({ ...form, area })}
                      className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150"
                      style={{
                        background:
                          form.area === area
                            ? "var(--bd-blue)"
                            : "var(--bd-elevated)",
                        border: `1px solid ${form.area === area ? "var(--bd-blue)" : "var(--bd-border)"}`,
                        color: form.area === area ? "#fff" : "var(--bd-muted)",
                      }}
                    >
                      {area}
                    </button>
                  ))}
                </div>
                {errors.area && (
                  <p className="text-[11px] mt-1" style={{ color: "#f87171" }}>
                    {errors.area}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-[12px] font-semibold mb-2"
                  style={{ color: "var(--bd-muted)" }}
                >
                  Cuéntanos más (opcional)
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  placeholder="Describe brevemente tu situación actual..."
                  className="w-full px-4 py-3 rounded-lg text-[13px] outline-none resize-none transition-colors duration-150"
                  style={{
                    background: "var(--bd-elevated)",
                    border: "1px solid var(--bd-border-strong)",
                    color: "#fff",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--bd-blue-border)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "var(--bd-border-strong)")
                  }
                />
              </div>

              <button
                type="submit"
                disabled={formState === "loading"}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-[14px] font-semibold text-white transition-all duration-200 disabled:opacity-60"
                style={{ background: "var(--bd-blue)" }}
                onMouseEnter={(e) => {
                  if (formState !== "loading")
                    e.currentTarget.style.background = "#0780bc";
                }}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "var(--bd-blue)")
                }
              >
                {formState === "loading" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando…
                  </>
                ) : (
                  <>
                    Agendar llamada gratuita
                    <Send size={14} />
                  </>
                )}
              </button>

              <p className="text-center text-[11px]" style={{ color: "var(--bd-subtle)" }}>
                Sin spam. Te contactamos solo para la llamada.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, value, onChange, error, placeholder, type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[12px] font-semibold mb-2" style={{ color: "var(--bd-muted)" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg text-[13px] outline-none transition-colors duration-150"
        style={{
          background: "var(--bd-elevated)",
          border: `1px solid ${error ? "#f87171" : "var(--bd-border-strong)"}`,
          color: "#fff",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = error ? "#f87171" : "var(--bd-blue-border)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = error ? "#f87171" : "var(--bd-border-strong)")
        }
      />
      {error && (
        <p className="text-[11px] mt-1" style={{ color: "#f87171" }}>{error}</p>
      )}
    </div>
  );
}
