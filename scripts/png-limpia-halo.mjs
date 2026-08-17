/**
 * Limpia el halo gris que deja un recorte de fondo mal hecho.
 *
 * El logo de CoKitchen venia con el fondo ya transparente, pero con 215.000
 * pixeles de alpha intermedio que no son borde real: son la sombra del recorte,
 * casi negra y con alpha bajisimo (6, 12, 20...). Sobre papel claro eso se ve
 * como una mancha gris alrededor del dibujo.
 *
 * Aqui se tira todo lo que tenga poca opacidad, y de lo que queda se separa el
 * trazo (verde, saturado) del relleno interior (claro y desaturado). El trazo se
 * unifica al verde de marca para que no queden pixeles apagados por la sombra.
 *
 * Uso: node scripts/png-limpia-halo.mjs entrada.png salida.png [#RRGGBB]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { decode, encode } from "./png-knockout.mjs";

const [, , inPath, outPath, hex = "#5A7D5A"] = process.argv;
if (!inPath || !outPath) {
  console.error("Uso: node scripts/png-limpia-halo.mjs entrada.png salida.png [#RRGGBB]");
  process.exit(1);
}

const tinte = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

const img = decode(readFileSync(inPath));
const { w, h, px } = img;

const ALPHA_MIN = 48; // por debajo de esto es sombra, no dibujo
const SAT_TRAZO = 0.07;

let fuera = 0;
let teñidos = 0;

for (let i = 0; i < w * h; i++) {
  const o = i * 4;
  const a = px[o + 3];

  if (a < ALPHA_MIN) {
    px[o + 3] = 0;
    fuera++;
    continue;
  }

  const r = px[o];
  const g = px[o + 1];
  const b = px[o + 2];
  const mx = Math.max(r, g, b);
  const sat = mx === 0 ? 0 : (mx - Math.min(r, g, b)) / mx;
  const lum = r * 0.299 + g * 0.587 + b * 0.114;

  // Lo desaturado solo vale si es el relleno interior, que va a opacidad plena.
  // Cualquier gris a media opacidad es lo que quedaba de la sombra.
  if (sat < 0.05 && (a < 250 || lum < 150)) {
    px[o + 3] = 0;
    fuera++;
    continue;
  }

  if (sat >= SAT_TRAZO) {
    px[o] = tinte[0];
    px[o + 1] = tinte[1];
    px[o + 2] = tinte[2];
    px[o + 3] = 255;
    teñidos++;
  }
}

writeFileSync(outPath, encode(img));
console.log(
  `${outPath} — ${w}x${h}, ${fuera} px de halo fuera, ${teñidos} px de trazo unificados a ${hex}`,
);
