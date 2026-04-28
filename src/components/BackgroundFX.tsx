"use client";

import { useEffect, useRef } from "react";

export default function BackgroundFX() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  /* Spotlight sigue al ratón */
  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      el.style.setProperty("--x", `${e.clientX}px`);
      el.style.setProperty("--y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* ── Blob 1 — azul, arriba derecha ── */}
      <div
        className="bd-blob-1 absolute rounded-full"
        style={{
          width: 900,
          height: 900,
          background: "radial-gradient(circle at center, rgba(8,146,208,0.38) 0%, rgba(8,146,208,0.12) 40%, transparent 65%)",
          filter: "blur(70px)",
          top: -280,
          right: -180,
        }}
      />

      {/* ── Blob 2 — cyan, izquierda media ── */}
      <div
        className="bd-blob-2 absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          background: "radial-gradient(circle at center, rgba(94,200,240,0.26) 0%, rgba(94,200,240,0.08) 40%, transparent 65%)",
          filter: "blur(80px)",
          top: "28%",
          left: -200,
        }}
      />

      {/* ── Blob 3 — índigo, abajo derecha ── */}
      <div
        className="bd-blob-3 absolute rounded-full"
        style={{
          width: 900,
          height: 900,
          background: "radial-gradient(circle at center, rgba(99,102,241,0.24) 0%, rgba(99,102,241,0.08) 40%, transparent 65%)",
          filter: "blur(100px)",
          bottom: -260,
          right: -150,
        }}
      />

      {/* ── Blob 4 — violeta, arriba izquierda ── */}
      <div
        className="bd-blob-4 absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle at center, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0.06) 40%, transparent 65%)",
          filter: "blur(80px)",
          top: "8%",
          left: "8%",
        }}
      />

      {/* ── Spotlight que sigue el cursor ── */}
      <div
        ref={spotlightRef}
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(8,146,208,0.06) 0%, transparent 65%)",
          filter: "blur(40px)",
          transform: "translate(-50%, -50%)",
          left: "var(--x, 50%)",
          top: "var(--y, 50%)",
          transition: "left 0.15s ease-out, top 0.15s ease-out",
          pointerEvents: "none",
        }}
      />

      {/* ── Grano de película ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.032,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />
    </div>
  );
}
