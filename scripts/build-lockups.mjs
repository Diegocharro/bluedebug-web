/**
 * Genera los dos lockups de marca en SVG: nombre debajo y nombre a la derecha.
 *
 * El logo va embebido en base64 y la Inter tambien (la subset latina que ya
 * descarga next/font), asi que los SVG se ven igual en cualquier sitio sin
 * depender de que la fuente este instalada.
 *
 * Uso: node scripts/build-lockups.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { globSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
// 256px basta: los lockups usan el logo a 56-120px, y a 256 aguanta el 2x sin pesar.
const LOGO = path.join(ROOT, "public", "logo-bd", "logo-bd-256.png");
const OUT_DIR = path.join(ROOT, "public", "logo-bd");

const AZUL = "#0892D0";
const BLANCO = "#FFFFFF";

// Anchos medidos en el navegador con la Inter real, en Inter 800 sin tracking.
const W = {
  34: { full: 184.24, blue: 74.24 },
  26: { full: 140.89, blue: 56.77 },
};
// Proporciones de la caja de texto respecto al tamano de fuente.
const ASC = 0.73;
const DESC = 0.22;

const logoB64 = readFileSync(LOGO).toString("base64");

// La subset latina precargada de Inter que deja next/font en .next
const fontFile = globSync(".next/static/media/*-s.p.*.woff2", { cwd: ROOT })[0];
if (!fontFile) {
  throw new Error(
    "No encuentro la Inter en .next/static/media. Levanta el dev server una vez (npm run dev) y reintenta."
  );
}
const fontB64 = readFileSync(path.join(ROOT, fontFile)).toString("base64");

const defs = `  <defs>
    <style>
      @font-face {
        font-family: "InterEmbebida";
        font-weight: 100 900;
        src: url(data:font/woff2;base64,${fontB64}) format("woff2");
      }
      .wm { font-family: "InterEmbebida", Inter, system-ui, sans-serif; font-weight: 800; }
    </style>
  </defs>`;

function svg({ width, height, body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="BlueDebug">
${defs}
${body}
</svg>
`;
}

// --- Vertical: logo arriba, nombre debajo ---
{
  const logo = 120;
  const gap = 18;
  const size = 34;
  const width = Math.round(Math.max(logo, W[size].full)) + 2;
  const height = Math.round(logo + gap + size * (ASC + DESC));
  const baseline = logo + gap + size * ASC;
  const cx = width / 2;

  const body = `  <image href="data:image/png;base64,${logoB64}" x="${(width - logo) / 2}" y="0" width="${logo}" height="${logo}"/>
  <text class="wm" x="${cx}" y="${baseline.toFixed(1)}" font-size="${size}" text-anchor="middle">
    <tspan fill="${AZUL}">Blue</tspan><tspan fill="${BLANCO}">Debug</tspan>
  </text>`;

  writeFileSync(path.join(OUT_DIR, "lockup-vertical.svg"), svg({ width, height, body }));
  console.log(`lockup-vertical.svg — ${width}x${height}`);
}

// --- Horizontal: logo a la izquierda, nombre a la derecha ---
{
  const logo = 56;
  const gap = 14;
  const size = 26;
  const width = Math.round(logo + gap + W[size].full);
  const height = logo;
  // centrado optico sobre la altura de ascendentes, la 'g' cuelga por debajo
  const baseline = (height + size * ASC) / 2;

  const body = `  <image href="data:image/png;base64,${logoB64}" x="0" y="0" width="${logo}" height="${logo}"/>
  <text class="wm" x="${logo + gap}" y="${baseline.toFixed(1)}" font-size="${size}">
    <tspan fill="${AZUL}">Blue</tspan><tspan fill="${BLANCO}">Debug</tspan>
  </text>`;

  writeFileSync(path.join(OUT_DIR, "lockup-horizontal.svg"), svg({ width, height, body }));
  console.log(`lockup-horizontal.svg — ${width}x${height}`);
}
