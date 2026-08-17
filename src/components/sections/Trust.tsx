import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

type Entity = {
  src: string;
  alt: string;
  name: string;
  what: string;
  href: string;
  external?: boolean;
};

const ENTITIES: Entity[] = [
  {
    src: "/fvpa.png",
    alt: "Escudo de la Federación de Voleibol del Principado de Asturias",
    name: "FVBPA",
    what: "Federación de voleibol de Asturias. Distribuye AlignMe entre sus equipos.",
    href: "https://www.fvbpa.com",
    external: true,
  },
  {
    src: "/fvbib.png",
    alt: "Escudo de la Federació de Voleibol de les Illes Balears",
    name: "FVBIB",
    what: "Federación de voleibol de Baleares. Usa la misma app en sus competiciones.",
    href: "https://www.voleibolib.net",
    external: true,
  },
  {
    src: "/escudo-cvo.png",
    alt: "Escudo del Club Voleibol Oviedo",
    name: "Club Voleibol Oviedo",
    what: "Club de la ciudad, de la cantera a Superliga 2. Su web es nuestra.",
    href: "https://clubvoleiboloviedo.com",
    external: true,
  },
  {
    src: "/vbstats-logo.png",
    alt: "Logo de VBStats",
    name: "VBStats",
    what: "Producto propio: las estadísticas del partido, mientras se juega.",
    href: "/portfolio/vbstats",
  },
];

export default function Trust() {
  return (
    <section style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="mx-auto w-[min(1180px,92vw)] py-10">
        <Reveal>
          <p className="mono" style={{ color: "var(--ink-faint)" }}>
            Dónde está funcionando lo que hacemos
          </p>
        </Reveal>

        <div className="mt-7 grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "var(--line)" }}>
          {ENTITIES.map((entity, i) => {
            const inner = (
              <>
                <Image
                  src={entity.src}
                  alt={entity.alt}
                  width={48}
                  height={48}
                  className="h-11 w-11 object-contain transition-transform duration-200 group-hover:scale-105"
                />
                <div className="mt-4 flex items-center gap-1.5">
                  <span className="font-display text-[0.98rem] font-bold tracking-[-0.02em]">
                    {entity.name}
                  </span>
                  <span className="mono transition-colors" style={{ color: "var(--blue)" }}>
                    {entity.external ? "↗" : "⟶"}
                  </span>
                </div>
                <p className="mt-1.5 text-[0.84rem] leading-[1.5]" style={{ color: "var(--ink-soft)" }}>
                  {entity.what}
                </p>
              </>
            );

            const className = "group flex h-full flex-col p-6 transition-colors";
            const style = { background: "var(--paper)" };

            return (
              <Reveal key={entity.name} delay={0.05 * i}>
                {entity.external ? (
                  <a
                    href={entity.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                    style={style}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={entity.href} className={className} style={style}>
                    {inner}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
