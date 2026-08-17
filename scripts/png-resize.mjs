/**
 * Reescala un PNG RGBA por filtro de caja (media de area). Solo sirve para
 * reducir, que es lo unico que necesitamos: bajar el logo de 869px al tamano
 * al que se va a incrustar, para que los SVG no pesen un mega.
 *
 * Trabaja en alpha premultiplicado, si no los pixeles transparentes (que
 * conservan color basura) contaminarian el borde.
 *
 * Uso: node scripts/png-resize.mjs entrada.png salida.png 256
 */
import { readFileSync, writeFileSync } from "node:fs";
import { decode, encode } from "./png-knockout.mjs";

export function resize({ w, h, px }, side) {
  const out = Buffer.alloc(side * side * 4);
  const sx = w / side;
  const sy = h / side;

  for (let y = 0; y < side; y++) {
    const y0 = Math.floor(y * sy);
    const y1 = Math.max(y0 + 1, Math.floor((y + 1) * sy));
    for (let x = 0; x < side; x++) {
      const x0 = Math.floor(x * sx);
      const x1 = Math.max(x0 + 1, Math.floor((x + 1) * sx));

      let r = 0, g = 0, b = 0, a = 0, n = 0;
      for (let yy = y0; yy < y1; yy++) {
        for (let xx = x0; xx < x1; xx++) {
          const i = (yy * w + xx) * 4;
          const al = px[i + 3] / 255;
          r += px[i] * al;
          g += px[i + 1] * al;
          b += px[i + 2] * al;
          a += al;
          n++;
        }
      }

      const d = (y * side + x) * 4;
      if (a <= 0) continue; // queda transparente
      out[d] = Math.round(r / a);       // desmultiplicar
      out[d + 1] = Math.round(g / a);
      out[d + 2] = Math.round(b / a);
      out[d + 3] = Math.round((a / n) * 255);
    }
  }
  return { w: side, h: side, px: out };
}

if (process.argv[1] && import.meta.filename === (await import("node:path")).resolve(process.argv[1])) {
  const [, , inPath, outPath, sideArg] = process.argv;
  if (!inPath || !outPath || !sideArg) {
    console.error("Uso: node scripts/png-resize.mjs entrada.png salida.png 256");
    process.exit(1);
  }
  const img = decode(readFileSync(inPath));
  const small = resize(img, Number(sideArg));
  writeFileSync(outPath, encode(small));
  console.log(`${outPath} — ${img.w}x${img.h} -> ${small.w}x${small.h}`);
}
