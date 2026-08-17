"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CLEAN_PATH = "M14 206 H150 V178 H320 V206 H520 V178 H666";

const CLOCK_STEPS = ["2h 05m", "38m", "4m 12s", "19s", "6s"];

type Phase = "idle" | "knot" | "notes" | "untangle" | "clean" | "done";

/**
 * El hero no explica el antes/después: lo dibuja.
 * Primero el lío real (naranja, trazo suelto, con sus post-its),
 * luego se apaga y encima se traza el circuito limpio.
 */
export default function KnotDiagram() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [clock, setClock] = useState("4h 20m");
  const hostRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<SVGElement & { beginElement?: () => void }>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const at = (ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const run = useCallback(function loop(): void {
    clear();

    // Con movimiento reducido no hay ciclo: se enseña el resultado y ya está.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      setClock(CLOCK_STEPS[CLOCK_STEPS.length - 1]);
      return;
    }

    setPhase("idle");
    setClock("4h 20m");

    at(60, () => setPhase("knot"));
    at(900, () => setPhase("notes"));
    at(2100, () => setPhase("untangle"));
    at(2600, () => setPhase("clean"));
    at(3700, () => {
      setPhase("done");
      motionRef.current?.beginElement?.();
    });
    CLOCK_STEPS.forEach((value, i) => at(3820 + i * 170, () => setClock(value)));

    // El ciclo se repite solo: el antes/después se cuenta una y otra vez.
    at(7200, () => loop());
  }, []);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    // El bucle solo corre cuando el diagrama está a la vista.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) run();
          else clear();
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clear();
    };
  }, [run]);

  const knotOn = phase !== "idle";
  const knotDim = phase === "untangle" || phase === "clean" || phase === "done";
  const notesOn = phase === "notes";
  const notesOut = knotDim;
  const cleanOn = phase === "clean" || phase === "done";

  return (
    <div ref={hostRef} className="cornered p-6 sm:p-7" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <span className="mono" style={{ color: "var(--blue)" }}>
          fig. 01 — mismo trabajo, dos caminos
        </span>
        <span className="mono" style={{ color: "var(--ink-faint)" }}>
          en bucle
        </span>
      </div>

      <svg viewBox="0 0 680 260" className="w-full" role="img" aria-label="Comparación entre el proceso manual, enredado y lento, y el proceso automatizado, un circuito limpio de 6 segundos">
        <text x="0" y="12" className="mono" fontSize="10.5" fill="var(--signal)" letterSpacing="2">
          HOY · A MANO · 4h 20m · 3 PERSONAS
        </text>
        <text x="0" y="156" className="mono" fontSize="10.5" fill="var(--blue)" letterSpacing="2">
          CON BLUEDEBUG · 6s · 0 PERSONAS
        </text>

        {/* el lío */}
        <path
          d="M14 74 C66 24 118 118 176 76 C232 34 196 128 148 104 C108 84 232 42 292 82 C352 122 250 132 262 68 C272 16 372 26 416 88 C458 148 526 124 504 66 C486 18 596 22 618 72 C632 104 650 66 666 60"
          fill="none"
          stroke="var(--signal)"
          strokeWidth={2}
          strokeLinecap="round"
          style={{
            strokeDasharray: 1500,
            strokeDashoffset: knotOn ? 0 : 1500,
            transition: knotOn
              ? "stroke-dashoffset 1.4s cubic-bezier(.5,0,.5,1), opacity .6s"
              : "none",
            opacity: knotDim ? 0.15 : 1,
          }}
        />

        {/* post-its */}
        <g
          style={{
            opacity: notesOn ? 1 : notesOut ? 0 : 0,
            transform: notesOut ? "translateY(-10px)" : "none",
            transition: "opacity .45s, transform .45s",
          }}
        >
          {[
            { x: 96, y: 102, r: -7, w: 52, label: "¿QUIÉN?" },
            { x: 288, y: 108, r: 5, w: 62, label: "FALTA IVA" },
            { x: 494, y: 104, r: -4, w: 66, label: "RE-ENVIAR" },
          ].map((note) => (
            <g key={note.label} transform={`translate(${note.x},${note.y}) rotate(${note.r})`}>
              <rect
                x={-note.w / 2}
                y={-13}
                width={note.w}
                height={26}
                fill="#F6D9A8"
                stroke="rgba(20,18,15,.25)"
              />
              <text className="mono" x={0} y={3} fontSize="8" fill="#5A4A34" textAnchor="middle" letterSpacing="1">
                {note.label}
              </text>
            </g>
          ))}
        </g>

        {/* circuito limpio */}
        <path
          d={CLEAN_PATH}
          fill="none"
          stroke="var(--blue-deep)"
          strokeWidth={2.2}
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: cleanOn ? 0 : 1000,
            transition: cleanOn ? "stroke-dashoffset 1.1s cubic-bezier(.65,0,.35,1)" : "none",
          }}
        />
        <g
          fill="none"
          stroke="var(--blue-deep)"
          strokeWidth={2}
          style={{ opacity: cleanOn ? 1 : 0, transition: "opacity .5s .6s" }}
        >
          <rect x={140} y={168} width={20} height={20} />
          <rect x={310} y={196} width={20} height={20} />
          <rect x={510} y={168} width={20} height={20} />
        </g>

        <circle r={4.5} fill="var(--signal)" opacity={phase === "done" ? 1 : 0}>
          <animateMotion
            ref={motionRef as never}
            dur="1.7s"
            begin="indefinite"
            fill="freeze"
            path={CLEAN_PATH}
          />
        </circle>

        <g transform="translate(0,244)">
          <text className="mono" x={0} y={0} fontSize="10.5" fill="var(--ink-faint)" letterSpacing="2">
            TIEMPO POR EXPEDIENTE
          </text>
          <text
            x={198}
            y={2}
            className="font-display"
            fontSize="18"
            fontWeight={800}
            fill="var(--ink)"
            style={{ letterSpacing: "-0.03em" }}
          >
            {clock}
          </text>
        </g>
      </svg>
    </div>
  );
}
