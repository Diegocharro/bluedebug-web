import type { Metadata } from "next";
import { Inter, Archivo, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/lib/site-config";
import "./globals.css";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-tech",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Bluedebug — Automatización de procesos para empresas",
    template: "%s · Bluedebug",
  },
  description:
    "Auditamos el trabajo manual que hace tu equipo, lo medimos en horas y construimos el sistema que lo sustituye. Primera llamada gratuita.",
  keywords: [
    "automatización de procesos",
    "integración de sistemas",
    "software a medida",
    "digitalización pymes",
    "apps a medida",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Bluedebug — Automatización de procesos para empresas",
    description:
      "El trabajo manual que sobra, fuera. Auditamos, medimos en horas y construimos el sistema que lo sustituye.",
    url: site.domain,
    siteName: site.name,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bluedebug — Automatización de procesos para empresas",
    description: "El trabajo manual que sobra, fuera.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.domain}#organization`,
      name: site.name,
      url: site.domain,
      email: site.email,
      foundingDate: site.founded,
      description: site.claim,
      areaServed: "ES",
      knowsAbout: [
        "Automatización de procesos",
        "Integración de sistemas",
        "Desarrollo de aplicaciones móviles",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.domain}#website`,
      url: site.domain,
      name: site.name,
      inLanguage: "es-ES",
      publisher: { "@id": `${site.domain}#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${body.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
