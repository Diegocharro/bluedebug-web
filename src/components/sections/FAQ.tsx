"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "@/components/Reveal";

const QUESTIONS = [
  {
    q: "¿Cuánto cuesta la primera consultoría?",
    a: "Nada. Sentarnos contigo, mirar cómo trabajáis y decirte dónde se te van las horas y qué tiene sentido automatizar no se cobra. De ahí sales sabiendo en qué podemos ayudarte, aunque después no trabajes con nosotros. Lo único que se presupuesta es el desarrollo, y siempre con precio cerrado antes de empezar: ni horas abiertas ni facturas que crecen por el camino.",
  },
  {
    q: "¿Tengo que cambiar de programas?",
    a: "Casi nunca. Trabajamos encima de lo que ya usas. Si tu ERP tiene API, la usamos; si no la tiene, buscamos otra vía. Cambiar de sistema es la última opción, no la primera.",
  },
  {
    q: "¿Y si mi equipo no es técnico?",
    a: "Mejor. Los sistemas que construimos los usa gente que no sabe programar: entrenadores, administrativos, comerciales. Si hace falta un manual de veinte páginas, está mal diseñado.",
  },
  {
    q: "¿Esto es montar un ChatGPT en mi empresa?",
    a: "No. La mayoría de procesos que quitan horas no necesitan un modelo de lenguaje: necesitan que dos sistemas se hablen y que nadie copie nada a mano. Cuando la IA aporta de verdad, la usamos; cuando no, te lo decimos.",
  },
  {
    q: "¿Qué pasa si os vais?",
    a: "El código es tuyo y se queda en tu repositorio, documentado. No usamos plataformas que te aten ni licencias nuestras. Si mañana quieres llevártelo a otro equipo, puedes.",
  },
  {
    q: "¿Trabajáis con empresas pequeñas?",
    a: "Sí. De hecho es donde más se nota: en una empresa de diez personas, recuperar 40 horas al mes es como contratar a alguien más sin pagar una nómina.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="py-20 lg:py-28"
      style={{ borderTop: "1px solid var(--line)", background: "var(--paper-warm)" }}
    >
      <div className="mx-auto grid w-[min(1180px,92vw)] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Reveal>
            <span className="mono" style={{ color: "var(--blue)" }}>
              06 — dudas
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display mt-5 text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-[1.06] tracking-[-0.038em]">
              Lo que nos preguntan siempre
            </h2>
          </Reveal>
        </div>

        <div style={{ borderTop: "1px solid var(--line-strong)" }}>
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} style={{ borderBottom: "1px solid var(--line)" }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-[1.06rem] font-bold tracking-[-0.02em]">
                    {item.q}
                  </span>
                  <span
                    className="mono shrink-0 transition-transform duration-200"
                    style={{
                      color: isOpen ? "var(--signal)" : "var(--ink-faint)",
                      transform: isOpen ? "rotate(45deg)" : "none",
                    }}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className="max-w-[60ch] pb-6 text-[0.96rem] leading-[1.7]"
                        style={{ color: "var(--ink-soft)" }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
