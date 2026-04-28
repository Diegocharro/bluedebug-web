"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { apps as appsData } from "@/data/apps";

const apps = appsData.map((a) => ({
  name: a.name,
  tagline: a.tagline,
  description: a.description,
  tags: a.tags,
  status: a.status,
  color: a.color,
  mockup: a.coverImage,
  slug: a.slug,
}));

export default function Portfolio() {
  return (
    <section
      className="py-28 relative"
      id="portfolio"
      style={{ borderTop: "1px solid var(--bd-border)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 52 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="max-w-[560px] mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-5"
            style={{
              background: "var(--bd-blue-dim)",
              border: "1px solid var(--bd-blue-border)",
              color: "var(--bd-blue)",
            }}
          >
            Portfolio
          </div>
          <h2 className="text-4xl font-black tracking-[-0.025em] leading-[1.1] mb-4">
            Soluciones construidas{" "}
            <span className="text-gradient-blue">y en uso real</span>
          </h2>
          <p className="text-[16px] leading-relaxed" style={{ color: "var(--bd-muted)" }}>
            Aplicaciones desarrolladas de cero que están siendo usadas por
            equipos, entrenadores y federaciones autonómicas.
          </p>
        </motion.div>

        <div className="space-y-8">
          {apps.map((app, i) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 52 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={`/portfolio/${app.slug}`}
                className="block rounded-2xl overflow-hidden transition-all duration-300 group"
                style={{
                  background: "var(--bd-card)",
                  border: "1px solid var(--bd-border-strong)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = `1px solid ${app.color}40`;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${app.color}12`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = "1px solid var(--bd-border-strong)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
              <div className="grid lg:grid-cols-2">
                {/* Info — en odd va a la derecha */}
                <div className={`p-10 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                      style={{
                        background: `${app.color}18`,
                        color: app.color,
                        border: `1px solid ${app.color}30`,
                      }}
                    >
                      {app.status}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black tracking-[-0.02em] mb-2">
                    {app.name}
                  </h3>
                  <p className="text-[15px] font-medium mb-4" style={{ color: app.color }}>
                    {app.tagline}
                  </p>
                  <p className="text-[14px] leading-relaxed mb-6" style={{ color: "var(--bd-muted)" }}>
                    {app.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
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

                  {/* CTA clickable hint */}
                  <div
                    className="inline-flex items-center gap-2 text-[13px] font-semibold group/cta"
                    style={{ color: app.color }}
                  >
                    Ver proyecto
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover/cta:translate-x-1"
                    />
                  </div>
                </div>

                {/* Mockup — en odd va a la izquierda */}
                <div
                  className={`flex items-center justify-center p-8 ${i % 2 === 1 ? "lg:order-1" : ""}`}
                  style={{
                    background: `linear-gradient(135deg, ${app.color}08 0%, transparent 100%)`,
                    borderLeft: i % 2 === 1 ? "none" : "1px solid var(--bd-border)",
                    borderRight: i % 2 === 1 ? "1px solid var(--bd-border)" : "none",
                  }}
                >
                  {/* Phone frame */}
                  <div
                    className="relative shadow-2xl"
                    style={{
                      width: 210,
                      height: 420,
                      borderRadius: 36,
                      background: "#0a0a0a",
                      border: "6px solid #1a1a1a",
                      boxShadow: `0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06), 0 0 40px ${app.color}18`,
                      padding: 2,
                      overflow: "hidden",
                    }}
                  >
                    {/* Status bar */}
                    <div
                      className="relative flex items-center justify-between px-5 pt-2 pb-1 flex-shrink-0"
                      style={{ zIndex: 2 }}
                    >
                      <span className="text-[9px] font-bold text-white/70">9:41</span>
                      {/* Notch pill */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-1"
                        style={{ width: 64, height: 18, borderRadius: 12, background: "#0a0a0a" }}
                      />
                      <div className="flex items-center gap-1">
                        <div className="flex gap-0.5">
                          {[3,4,5].map(h => (
                            <div key={h} className="w-0.5 rounded-sm bg-white/60" style={{ height: h }} />
                          ))}
                        </div>
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                          <path d="M1 7C2.5 2 9.5 2 11 7" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <div className="w-4 h-2 rounded-sm border border-white/40 flex items-center pl-0.5">
                          <div className="w-2.5 h-1 rounded-sm bg-green-400" />
                        </div>
                      </div>
                    </div>

                    {/* Screenshot */}
                    <div className="relative overflow-hidden" style={{ borderRadius: 28, height: "calc(100% - 28px)", marginTop: 0 }}>
                      <Image
                        src={app.mockup}
                        alt={app.name}
                        fill
                        sizes="210px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
