import Reveal from "@/components/Reveal";

const COSTS = [
  {
    figure: "1 de cada 5",
    label: "horas de oficina",
    text: "se van en copiar datos de un sitio a otro. No es una estimación de folleto: sale de cronometrar el proceso con el equipo delante.",
  },
  {
    figure: "3 semanas",
    label: "de retraso medio",
    text: "entre que un dato entra y alguien lo ve en un informe. Para entonces la decisión ya se tomó a ciegas.",
  },
  {
    figure: "El 90%",
    label: "de los errores",
    text: "no son de criterio: son de transcripción. Un IVA mal copiado, una fila pegada donde no iba, un email que nadie reenvió.",
  },
  {
    figure: "1 persona",
    label: "irreemplazable",
    text: "que es la única que sabe cómo va ese Excel. Si se va de vacaciones, el proceso se para.",
  },
];

export default function Pain() {
  return (
    <section id="problema" className="py-20 lg:py-28">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <Reveal>
          <span className="mono" style={{ color: "var(--signal)" }}>
            01 — el problema
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display mt-5 max-w-[22ch] text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-[1.06] tracking-[-0.038em]">
            Lo que se hace a mano no es gratis. Sólo es invisible.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[46ch] text-[1.02rem] leading-[1.7]" style={{ color: "var(--ink-soft)" }}>
            Nadie apunta en ninguna parte las horas que se van en tareas que
            podría hacer una máquina. Por eso nunca aparecen en la cuenta de
            resultados, y por eso nunca se arreglan.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px sm:grid-cols-2" style={{ background: "var(--line)" }}>
          {COSTS.map((cost, i) => (
            <Reveal key={cost.figure} delay={0.05 * i}>
              <div className="h-full p-8" style={{ background: "var(--paper)" }}>
                <div
                  className="font-display text-[2rem] font-extrabold tracking-[-0.04em]"
                  style={{ color: "var(--signal)" }}
                >
                  {cost.figure}
                </div>
                <div className="mono mt-2" style={{ color: "var(--ink-faint)" }}>
                  {cost.label}
                </div>
                <p className="mt-4 text-[0.95rem] leading-[1.65]" style={{ color: "var(--ink-soft)" }}>
                  {cost.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
