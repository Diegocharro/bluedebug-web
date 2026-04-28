"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="py-12 mt-auto"
      style={{ borderTop: "1px solid var(--bd-border)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src="/logo.png"
                alt="Bluedebug"
                width={26}
                height={26}
                className="object-contain"
              />
              <span className="text-[15px] font-bold tracking-tight text-white">
                Bluedebug
              </span>
            </div>
            <p className="text-[13px] leading-relaxed max-w-[220px]" style={{ color: "var(--bd-muted)" }}>
              Automatización y transformación digital para pymes y startups.
            </p>
          </div>

          {/* Links */}
          <div>
            <div
              className="text-[11px] font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--bd-subtle)" }}
            >
              Navegación
            </div>
            <div className="space-y-2.5">
              {[
                { label: "Servicios", href: "#solution" },
                { label: "Cómo funciona", href: "#how-it-works" },
                { label: "Portfolio", href: "#portfolio" },
                { label: "FAQ", href: "#faq" },
                { label: "Agendar llamada", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-[13px] transition-colors duration-150"
                  style={{ color: "var(--bd-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--bd-muted)")
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div
              className="text-[11px] font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--bd-subtle)" }}
            >
              Contacto
            </div>
            <div className="space-y-2.5">
              <a
                href="mailto:bluedebug.contact@gmail.com"
                className="block text-[13px] transition-colors duration-150"
                style={{ color: "var(--bd-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--bd-blue)")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--bd-muted)")
                }
              >
                bluedebug.contact@gmail.com
              </a>
              <a
                href="https://bluedebug.com"
                className="block text-[13px] transition-colors duration-150"
                style={{ color: "var(--bd-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--bd-blue)")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--bd-muted)")
                }
              >
                bluedebug.com
              </a>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid var(--bd-border)" }}
        >
          <span className="text-[12px]" style={{ color: "var(--bd-subtle)" }}>
            © {new Date().getFullYear()} Bluedebug. Todos los derechos reservados.
          </span>
          <div className="flex gap-6">
            {["Política de privacidad", "Aviso legal", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[12px] transition-colors duration-150"
                style={{ color: "var(--bd-subtle)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--bd-muted)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--bd-subtle)")
                }
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

