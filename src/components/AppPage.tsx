"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { AppData } from "@/data/apps";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AutoCarousel from "@/components/AutoCarousel";

export default function AppPage({ app }: { app: AppData }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ paddingTop: "80px" }}>
        <div className="max-w-[1100px] mx-auto px-6 py-16">

          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 text-[13px] font-medium transition-colors duration-150"
              style={{ color: "var(--bd-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--bd-muted)")}
            >
              <ArrowLeft size={14} />
              Volver al portfolio
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span
              className="inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full mb-4"
              style={{
                background: `${app.color}18`,
                color: app.color,
                border: `1px solid ${app.color}30`,
              }}
            >
              {app.status}
            </span>
            <h1 className="text-5xl font-black tracking-[-0.03em] mb-3">{app.name}</h1>
            <p className="text-[18px] font-medium mb-6" style={{ color: app.color }}>
              {app.tagline}
            </p>
            <p className="text-[15px] leading-relaxed max-w-[680px]" style={{ color: "var(--bd-muted)" }}>
              {app.longDescription}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {app.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold px-3 py-1 rounded-lg"
                  style={{
                    background: "var(--bd-elevated)",
                    border: "1px solid var(--bd-border)",
                    color: "var(--bd-muted)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>


          {/* Carousel */}
          {app.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2
                className="text-[11px] font-semibold uppercase tracking-widest mb-6"
                style={{ color: "var(--bd-subtle)" }}
              >
                Capturas de pantalla
              </h2>
              <AutoCarousel images={app.images} color={app.color} appName={app.name} />
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 p-8 rounded-2xl text-center"
            style={{
              background: "var(--bd-card)",
              border: "1px solid var(--bd-border-strong)",
            }}
          >
            <p className="text-[15px] mb-5" style={{ color: "var(--bd-muted)" }}>
              ¿Quieres algo similar para tu negocio?
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[14px] font-semibold text-white transition-all duration-200"
              style={{ background: "var(--bd-blue)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0780bc";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--bd-blue)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Agendar llamada gratuita
            </Link>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}
