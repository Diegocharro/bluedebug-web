"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { value: "+4", label: "Apps en producción" },
  { value: "2", label: "Federaciones autonómicas" },
  { value: "100%", label: "Entornos reales" },
  { value: "ROI", label: "desde el primer mes" },
];

export default function TrustBar() {
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ borderBottom: "1px solid var(--bd-border)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Adopted by */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span
            className="text-[12px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--bd-subtle)" }}
          >
            Soluciones adoptadas por
          </span>
        </motion.div>

        {/* Federation logos */}
        <div className="flex flex-wrap items-center justify-center gap-10 mb-14">
          {/* FVBA - Federación Asturiana */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center gap-3"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center p-1.5"
              style={{
                background: "var(--bd-card)",
                border: "1px solid var(--bd-border-strong)",
              }}
            >
              <Image
                src="/fvpa.png"
                alt="Federación de Voleibol del Principado de Asturias"
                width={52}
                height={52}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="text-center">
              <div className="text-[12px] font-semibold text-white">FVPA</div>
              <div
                className="text-[10px]"
                style={{ color: "var(--bd-muted)" }}
              >
                Fed. Voleibol Asturias
              </div>
            </div>
          </motion.div>

          <div
            className="w-px h-12 hidden sm:block"
            style={{ background: "var(--bd-border)" }}
          />

          {/* FVBIB - Federación Balear */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-3"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center p-1.5"
              style={{
                background: "var(--bd-card)",
                border: "1px solid var(--bd-border-strong)",
              }}
            >
              <Image
                src="/fvbib.png"
                alt="Federació de Voleibol de les Illes Balears"
                width={52}
                height={52}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="text-center">
              <div className="text-[12px] font-semibold text-white">FVBIB</div>
              <div
                className="text-[10px]"
                style={{ color: "var(--bd-muted)" }}
              >
                Fed. Voleibol Balears
              </div>
            </div>
          </motion.div>

          <div
            className="w-px h-12 hidden sm:block"
            style={{ background: "var(--bd-border)" }}
          />

          {/* Generic "apps en producción" badge */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-3"
          >
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{
                background: "var(--bd-blue-dim)",
                border: "1px solid var(--bd-blue-border)",
              }}
            >
              <span className="text-2xl font-black text-gradient-blue">+4</span>
            </div>
            <div className="text-center">
              <div className="text-[12px] font-semibold text-white">Apps</div>
              <div className="text-[10px]" style={{ color: "var(--bd-muted)" }}>
                En producción real
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center py-6 rounded-xl"
              style={{
                background: "var(--bd-card)",
                border: "1px solid var(--bd-border)",
              }}
            >
              <div className="text-3xl font-black tracking-tight mb-1 text-gradient-blue">
                {stat.value}
              </div>
              <div className="text-[12px]" style={{ color: "var(--bd-muted)" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
