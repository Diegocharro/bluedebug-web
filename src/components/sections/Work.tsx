import Image from "next/image";
import Link from "next/link";
import { apps } from "@/data/apps";
import Reveal from "@/components/Reveal";

export default function Work() {
  return (
    <section id="trabajos" className="py-20 lg:py-28" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <span className="mono" style={{ color: "var(--signal)" }}>
                05 — trabajos
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display mt-5 max-w-[20ch] text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-[1.06] tracking-[-0.038em]">
                Cosas que hemos construido y están funcionando
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="mono max-w-[26ch] leading-[1.8]" style={{ color: "var(--ink-faint)" }}>
              Nada de maquetas: apps publicadas, con usuarios dentro
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "var(--line)" }}>
          {apps.map((app, i) => (
            <Reveal key={app.slug} delay={0.06 * i}>
              <Link
                href={`/portfolio/${app.slug}`}
                className="group flex h-full flex-col"
                style={{ background: "var(--surface)" }}
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden"
                  style={{ borderBottom: "1px solid var(--line)", background: "var(--paper)" }}
                >
                  <Image
                    src={app.coverImage}
                    alt={`Pantalla principal de ${app.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={`transition-transform duration-500 group-hover:scale-[1.03] ${
                      app.orientation === "landscape"
                        ? "object-cover object-top"
                        : "object-contain p-6"
                    }`}
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-[1.28rem] font-bold tracking-[-0.025em]">
                      {app.name}
                    </h3>
                    <span
                      className="mono transition-transform duration-200 group-hover:translate-x-0.5"
                      style={{ color: "var(--blue)" }}
                    >
                      ⟶
                    </span>
                  </div>
                  <p className="mono mt-2" style={{ color: "var(--ink-faint)" }}>
                    {app.status}
                  </p>
                  <p className="mt-4 text-[0.93rem] leading-[1.65]" style={{ color: "var(--ink-soft)" }}>
                    {app.tagline}
                  </p>
                  <ul className="mono mt-6 flex flex-wrap gap-2 pt-5" style={{ borderTop: "1px solid var(--line)" }}>
                    {app.tags.slice(0, 3).map((tag) => (
                      <li
                        key={tag}
                        className="px-2.5 py-1.5"
                        style={{ border: "1px solid var(--line)", color: "var(--ink-faint)" }}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
