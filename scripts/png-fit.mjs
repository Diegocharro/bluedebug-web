/**
 * Recorta el margen transparente de un PNG y lo recentra en un lienzo cuadrado
 * donde el contenido ocupa un porcentaje dado. Sirve para que un logo nuevo
 * tenga el mismo peso optico que el que sustituye.
 *
 * Uso: node scripts/png-fit.mjs entrada.png salida.png [porcentaje]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { decode, encode } from "./png-knockout.mjs";

const [, , inPath, outPath, pctArg] = process.argv;
if (!inPath || !outPath) {
  console.error("Uso: node scripts/png-fit.mjs entrada.png salida.png [porcentaje]");
  process.exit(1);
}
const pct = Number(pctArg ?? 80) / 100;

const { w, h, px } = decode(readFileSync(inPath));

// bounding box de lo que no es transparente
let x0 = w, y0 = h, x1 = -1, y1 = -1;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    if (px[(y * w + x) * 4 + 3] > 24) {
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
}
if (x1 < 0) throw new Error("La imagen esta completamente transparente");

const cw = x1 - x0 + 1;
const chh = y1 - y0 + 1;
const side = Math.round(Math.max(cw, chh) / pct);
const out = Buffer.alloc(side * side * 4); // transparente
const dx = Math.round((side - cw) / 2);
const dy = Math.round((side - chh) / 2);

for (let y = 0; y < chh; y++) {
  for (let x = 0; x < cw; x++) {
    const s = ((y0 + y) * w + (x0 + x)) * 4;
    const d = ((dy + y) * side + (dx + x)) * 4;
    px.copy(out, d, s, s + 4);
  }
}

writeFileSync(outPath, encode({ w: side, h: side, px: out }));
console.log(
  `${outPath} — ${side}x${side}, contenido ${cw}x${chh} centrado al ${(pct * 100).toFixed(0)}%`
);
