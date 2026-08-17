"use client";

import TypewriterTitle from "@/components/kokonutui/type-writer";
import Reveal from "@/components/Reveal";

const STEPS = [
  {
    tag: "Diagnóstico",
    title: "Nos sentamos contigo",
    text: "Miramos cómo trabajáis de verdad, no cómo dice el manual que trabajáis. Cronometramos las tareas y anotamos quién hace qué.",
  },
  {
    tag: "Números",
    title: "Te damos los números",
    text: "Las horas que se van en cada proceso, cuánto cuestan al año y qué conviene automatizar primero, con presupuesto cerrado para lo que decidas hacer.",
  },
  {
    tag: "Construcción",
    title: "Construimos y lo pones a correr",
    text: "Entregas continuas, en tu entorno real y con tus datos. Ves cómo avanza desde el principio, no cuando ya está todo hecho.",
  },
  {
    tag: "Mantenimiento",
    title: "Lo mantenemos vivo",
    text: "Los procesos cambian y el sistema tiene que cambiar con ellos. Soporte y ajustes, sin contratos que te aten de por vida.",
  },
];

export default function Method() {
  return (
    <section
      id="metodo"
      className="dotted py-20 lg:py-28"
      style={{ background: "var(--paper-warm)", borderTop: "1px solid var(--line)" }}
    >
      <div className="mx-auto w-[min(1180px,92vw)]">
        <Reveal>
          <span className="mono" style={{ color: "var(--signal)" }}>
            03 — método
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display mt-5 max-w-[20ch] text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-[1.06] tracking-[-0.038em]">
            De la primera llamada a que funcione solo
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div
            className="mono mt-6 flex items-center gap-2"
            style={{ color: "var(--ink-soft)" }}
          >
            <span style={{ color: "var(--signal)" }}>&gt;</span>
            <TypewriterTitle
              sequences={[
                { text: "cronometrando el proceso", deleteAfter: true },
                { text: "midiendo horas perdidas", deleteAfter: true },
                { text: "calculando el coste anual", deleteAfter: true },
              ]}
              typingSpeed={48}
              deleteSpeed={26}
              loopDelay={900}
            />
          </div>
        </Reveal>

        <ol className="mt-14 grid gap-px lg:grid-cols-4" style={{ background: "var(--line)" }}>
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.tag} delay={0.06 * i}>
              <div className="flex h-full flex-col p-8" style={{ background: "var(--paper-warm)" }}>
                <div className="flex items-baseline justify-between">
                  <span
                    className="font-display text-[2.4rem] font-extrabold leading-none tracking-[-0.05em]"
                    style={{ color: "var(--blue)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mono" style={{ color: "var(--ink-faint)" }}>
                    {step.tag}
                  </span>
                </div>
                <h3 className="font-display mt-6 text-[1.16rem] font-bold leading-[1.25] tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.93rem] leading-[1.65]" style={{ color: "var(--ink-soft)" }}>
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
