import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { apps, getApp } from "@/data/apps";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};
  return {
    title: `${app.name} — ${app.tagline}`,
    description: app.description,
    alternates: { canonical: `/portfolio/${app.slug}` },
    openGraph: {
      title: `${app.name} — ${app.tagline}`,
      description: app.description,
      images: [{ url: app.coverImage }],
    },
  };
}

export default async function AppDetail({ params }: Params) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  const others = apps.filter((item) => item.slug !== app.slug);

  return (
    <>
      <Navbar />
      <main>
        <section className="blueprint pt-[132px] pb-16">
          <div className="mx-auto w-[min(1180px,92vw)]">
            <Link href="/#trabajos" className="mono" style={{ color: "var(--blue)" }}>
              ⟵ volver a trabajos
            </Link>

            <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <span className="mono" style={{ color: "var(--signal)" }}>
                  {app.status}
                </span>
                <h1 className="font-display mt-5 text-[clamp(2.3rem,5vw,3.8rem)] font-extrabold leading-[1.03] tracking-[-0.042em]">
                  {app.name}
                </h1>
                <p className="mt-4 text-[1.1rem] leading-[1.6]" style={{ color: "var(--blue)" }}>
                  {app.tagline}
                </p>
                <p className="mt-6 max-w-[44ch] text-[1rem] leading-[1.7]" style={{ color: "var(--ink-soft)" }}>
                  {app.description}
                </p>
                <ul className="mono mt-8 flex flex-wrap gap-2">
                  {app.tags.map((tag) => (
                    <li
                      key={tag}
                      className="px-3 py-2"
                      style={{ border: "1px solid var(--line-strong)", color: "var(--ink-faint)" }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                {app.link && (
                  <a
                    href={app.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2.5 text-[0.9rem] font-semibold text-white"
                    style={{
                      background: "var(--blue)",
                      padding: "15px 26px",
                      boxShadow: "var(--shadow-hard)",
                    }}
                  >
                    Verla en {app.link.label} ↗
                  </a>
                )}
              </div>

              <div
                className="cornered relative aspect-[4/3] overflow-hidden"
                style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
              >
                <Image
                  src={app.coverImage}
                  alt={`Pantalla principal de ${app.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={app.coverFit === "contain" ? "object-contain p-10" : "object-cover object-top"}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 lg:grid-cols-[0.4fr_1fr]">
            <span className="mono" style={{ color: "var(--ink-faint)" }}>
              el proyecto
            </span>
            <p className="max-w-[68ch] text-[1.02rem] leading-[1.8]" style={{ color: "var(--ink-soft)" }}>
              {app.longDescription}
            </p>
          </div>
        </section>

        {app.images.length > 0 && (
          <section className="py-16" style={{ borderTop: "1px solid var(--line)" }}>
            <div className="mx-auto w-[min(1180px,92vw)]">
              <span className="mono" style={{ color: "var(--ink-faint)" }}>
                pantallas — {app.images.length}
              </span>
              <div
                className={`mt-8 grid gap-px ${
                  app.orientation === "landscape"
                    ? "sm:grid-cols-2"
                    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                }`}
                style={{ background: "var(--line)" }}
              >
                {app.images.map((image, i) => (
                  <Reveal key={image} delay={0.03 * i}>
                    <div
                      className={`relative ${
                        app.orientation === "landscape" ? "aspect-[16/10]" : "aspect-[9/16]"
                      }`}
                      style={{ background: "var(--surface)" }}
                    >
                      <Image
                        src={image}
                        alt={`${app.name} — pantalla ${i + 1}`}
                        fill
                        sizes={
                          app.orientation === "landscape"
                            ? "(max-width: 640px) 100vw, 50vw"
                            : "(max-width: 640px) 50vw, 20vw"
                        }
                        className={
                          app.orientation === "landscape"
                            ? "object-cover object-top"
                            : "object-contain"
                        }
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="mx-auto flex w-[min(1180px,92vw)] flex-wrap items-center justify-between gap-8">
            <div>
              <span className="mono" style={{ color: "var(--ink-faint)" }}>
                otros trabajos
              </span>
              <div className="mt-4 flex flex-wrap gap-6">
                {others.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/portfolio/${other.slug}`}
                    className="font-display text-[1.4rem] font-bold tracking-[-0.03em] underline-offset-4 hover:underline"
                  >
                    {other.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/#contacto"
              className="text-[0.9rem] font-semibold text-white"
              style={{ background: "var(--ink)", padding: "16px 28px", boxShadow: "var(--shadow-hard)" }}
            >
              Quiero algo parecido ⟶
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
