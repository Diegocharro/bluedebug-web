"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "¿Esto será muy caro para mi empresa?",
    a: "El coste depende del alcance, pero siempre lo diseñamos para que el ROI sea positivo en los primeros meses. La mayoría de clientes recuperan la inversión antes de los 90 días gracias al tiempo y dinero que ahorran. Empezamos con un análisis gratuito para darte un presupuesto claro antes de comprometerte a nada.",
  },
  {
    q: "¿Qué hacéis exactamente? ¿Es solo software?",
    a: "Somos desarrolladores de software a medida especializados en automatización de procesos. Construimos integraciones entre tus herramientas existentes, flujos automáticos, dashboards y aplicaciones propias. No vendemos plantillas ni soluciones genéricas: todo lo que hacemos está pensado para tu empresa concreta.",
  },
  {
    q: "¿Por qué confiar en vosotros si no os conozco?",
    a: "Tenemos +4 aplicaciones en producción real, dos de ellas adoptadas oficialmente por la Federación Asturiana y la Federación Balear de Voleibol. Eso significa que nuestro software funciona en entornos reales y exigentes. Empezamos siempre con un análisis sin compromiso para que veas nuestra forma de trabajar antes de tomar ninguna decisión.",
  },
  {
    q: "¿Cuánto tiempo tarda en estar listo?",
    a: "Depende del proyecto, pero un primer proceso automatizado suele estar funcionando en 2–4 semanas desde que arrancamos. Nuestra metodología prioriza los cambios que dan más impacto desde el primer día, para que veas resultados antes de terminar el proyecto completo.",
  },
  {
    q: "¿Necesito saber de tecnología para trabajar con vosotros?",
    a: "Para nada. Tú nos explicas cómo trabajas y qué problemas tienes. Nosotros nos encargamos de toda la parte técnica. La única implicación que necesitamos de tu lado es entender bien tu proceso actual, y para eso hacemos una sesión de análisis guiada y sencilla.",
  },
  {
    q: "¿Qué pasa si el proyecto no funciona como esperábamos?",
    a: "Antes de construir nada, validamos contigo el enfoque y los resultados esperados. Trabajamos de forma iterativa, así que si algo no va como esperábamos lo ajustamos. Nunca desaparecemos al entregar: ofrecemos soporte y acompañamiento una vez que la solución está en marcha.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="py-28 relative"
      id="faq"
      style={{ borderTop: "1px solid var(--bd-border)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
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
              FAQ
            </div>
            <h2 className="text-4xl font-black tracking-[-0.025em] leading-[1.1] mb-4">
              Preguntas{" "}
              <span className="text-gradient-blue">frecuentes</span>
            </h2>
            <p className="text-[15px] leading-relaxed" style={{ color: "var(--bd-muted)" }}>
              Las dudas más comunes antes de dar el paso.
            </p>
          </motion.div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-xl overflow-hidden"
                style={{
                  background: open === i ? "var(--bd-elevated)" : "var(--bd-card)",
                  border: `1px solid ${open === i ? "var(--bd-blue-border)" : "var(--bd-border)"}`,
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-[14px] font-semibold leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: open === i ? "var(--bd-blue)" : "var(--bd-border-strong)",
                    }}
                  >
                    {open === i ? (
                      <Minus size={12} color="#fff" />
                    ) : (
                      <Plus size={12} color="rgba(255,255,255,0.6)" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="px-5 pb-5 text-[13px] leading-relaxed"
                        style={{ color: "var(--bd-muted)" }}
                      >
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
