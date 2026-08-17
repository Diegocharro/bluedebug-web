"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site-config";

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-colors duration-200"
      style={{
        background: solid ? "rgba(245,247,249,0.94)" : "transparent",
        borderBottom: `1px solid ${solid ? "var(--line)" : "transparent"}`,
      }}
    >
      <div className="mx-auto flex h-[68px] w-[min(1180px,92vw)] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Bluedebug — inicio">
          <Image
            src="/logo-bd/logo-bd-256.png"
            alt=""
            width={34}
            height={34}
            priority
            className="h-[30px] w-[30px] object-contain"
          />
          <span
            className="font-display text-[19px] font-extrabold tracking-[-0.04em]"
            style={{ color: "var(--ink)" }}
          >
            Blue<span style={{ color: "var(--blue)" }}>Debug</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13.5px] font-medium transition-colors"
              style={{ color: "var(--ink-soft)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--blue)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-soft)")}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contacto"
            className="hidden text-[13px] font-semibold text-white transition-transform duration-150 sm:inline-flex"
            style={{ background: "var(--blue)", padding: "11px 20px" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--ink)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--blue)")}
          >
            Agendar llamada
          </a>
          <button
            type="button"
            aria-label="Menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
            style={{ border: "1px solid var(--line-strong)" }}
          >
            <span className="block h-px w-4" style={{ background: "var(--ink)" }} />
            <span className="block h-px w-4" style={{ background: "var(--ink)" }} />
          </button>
        </div>
      </div>

      {open && (
        <div
          className="md:hidden"
          style={{ background: "var(--paper)", borderTop: "1px solid var(--line)" }}
        >
          <nav className="mx-auto flex w-[min(1180px,92vw)] flex-col py-3">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[14px] font-medium"
                style={{ color: "var(--ink-soft)", borderBottom: "1px solid var(--line)" }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-4 mb-2 py-3 text-center text-[13px] font-semibold text-white"
              style={{ background: "var(--blue)" }}
            >
              Agendar llamada
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
