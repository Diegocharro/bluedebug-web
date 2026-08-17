import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site-config";
import { apps } from "@/data/apps";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line-strong)" }}>
      <div className="mx-auto w-[min(1180px,92vw)] py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo-bd/logo-bd-256.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="font-display text-[20px] font-extrabold tracking-[-0.04em]">
                Bluedebug
              </span>
            </div>
            <p
              className="mt-3 max-w-[26rem] text-[13.5px] leading-relaxed"
              style={{ color: "var(--ink-soft)" }}
            >
              {site.claim}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mono mt-5 inline-block"
              style={{ color: "var(--blue)" }}
            >
              {site.email}
            </a>
          </div>

          <div>
            <div className="mono mb-4" style={{ color: "var(--ink-faint)" }}>
              Secciones
            </div>
            <ul className="flex flex-col gap-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[13.5px]"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mono mb-4" style={{ color: "var(--ink-faint)" }}>
              Trabajos
            </div>
            <ul className="flex flex-col gap-2.5">
              {apps.map((app) => (
                <li key={app.slug}>
                  <Link
                    href={`/portfolio/${app.slug}`}
                    className="text-[13.5px]"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    {app.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mono mt-12 flex flex-wrap items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid var(--line)", color: "var(--ink-faint)" }}
        >
          <span>
            © {new Date().getFullYear()} Bluedebug — Automatización de procesos
          </span>
          <span>Hecho en España</span>
        </div>
      </div>
    </footer>
  );
}
