"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Servicios", href: "#solution" },
  { label: "Cómo funciona", href: "#how-it-works" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,8,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <nav className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.png"
            alt="Bluedebug"
            width={30}
            height={30}
            className="object-contain"
            priority
          />
          <span className="text-[15px] font-bold tracking-tight text-white">
            Bluedebug
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium transition-colors duration-200"
              style={{ color: "var(--bd-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--bd-muted)")}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="text-[13px] font-semibold text-white px-4 py-2 rounded-lg transition-all duration-200"
            style={{ background: "var(--bd-blue)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0780bc")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bd-blue)")}
          >
            Agendar llamada
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t"
            style={{
              background: "rgba(10,10,10,0.97)",
              backdropFilter: "blur(20px)",
              borderColor: "var(--bd-border)",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[14px] font-medium"
                  style={{ color: "var(--bd-muted)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="text-[13px] font-semibold text-white px-4 py-2.5 rounded-lg text-center mt-2"
                style={{ background: "var(--bd-blue)" }}
                onClick={() => setMenuOpen(false)}
              >
                Agendar llamada
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
