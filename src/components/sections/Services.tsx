import Reveal from "@/components/Reveal";

type Service = {
  code: string;
  title: string;
  text: string;
  examples: string[];
  wide?: boolean;
};

const SERVICES: Service[] = [
  {
    code: "S-01",
    title: "Automatización de tareas repetitivas",
    text: "Todo lo que alguien hace cada semana siguiendo siempre los mismos pasos es candidato. Lo replicamos en un sistema que corre solo y avisa cuando algo se sale del guion.",
    examples: ["Facturas", "Altas de cliente", "Informes", "Avisos"],
    wide: true,
  },
  {
    code: "S-02",
    title: "Integración entre sistemas",
    text: "Tu ERP, tu CRM, tu hoja de cálculo y tu correo dejan de ser islas. Los datos viajan solos y en una sola dirección.",
    examples: ["APIs", "Webhooks", "Migraciones"],
  },
  {
    code: "S-03",
    title: "Paneles y datos de verdad",
    text: "Un sitio donde mirar cómo va el negocio hoy, no el mes pasado. Con los números que de verdad usas para decidir.",
    examples: ["Dashboards", "Alertas", "Exportables"],
  },
  {
    code: "S-04",
    title: "Aplicaciones a medida",
    text: "Cuando no existe la herramienta que necesitas, la construimos. Móvil y web, en producción, con mantenimiento.",
    examples: ["React Native", "Next.js", "Cloud"],
    wide: true,
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-20 lg:py-28" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <span className="mono" style={{ color: "var(--blue)" }}>
                02 — qué hacemos
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display mt-5 max-w-[18ch] text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-[1.06] tracking-[-0.038em]">
                Cuatro formas de quitar trabajo de en medio
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="mono max-w-[24ch] leading-[1.8]" style={{ color: "var(--ink-faint)" }}>
              Casi siempre acaban siendo dos o tres a la vez
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px md:grid-cols-3" style={{ background: "var(--line)" }}>
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.code}
              delay={0.05 * i}
              className={service.wide ? "md:col-span-2" : ""}
            >
              <article
                className="group flex h-full flex-col p-8"
                style={{ background: "var(--surface)" }}
              >
                <span className="mono" style={{ color: "var(--blue)" }}>
                  {service.code}
                </span>
                <h3 className="font-display mt-4 text-[1.32rem] font-bold leading-[1.2] tracking-[-0.025em]">
                  {service.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-[1.65]" style={{ color: "var(--ink-soft)" }}>
                  {service.text}
                </p>
                <ul className="mono mt-6 flex flex-wrap gap-2 pt-5" style={{ borderTop: "1px solid var(--line)" }}>
                  {service.examples.map((example) => (
                    <li
                      key={example}
                      className="px-2.5 py-1.5"
                      style={{ border: "1px solid var(--line)", color: "var(--ink-faint)" }}
                    >
                      {example}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
