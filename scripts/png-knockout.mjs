/**
 * Quita el fondo blanco de un PNG dejandolo transparente, sin tocar los blancos
 * interiores (las letras talladas en el caparazon). Hace flood fill desde los
 * bordes, asi que solo desaparece el blanco conectado con el exterior.
 *
 * Uso: node scripts/png-knockout.mjs entrada.png salida.png
 *
 * Sin dependencias: decodifica y reencodifica el PNG a mano con node:zlib.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { inflateSync, deflateSync } from "node:zlib";
import path from "node:path";

const PNG_SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function readChunks(buf) {
  if (!buf.subarray(0, 8).equals(PNG_SIG)) throw new Error("No es un PNG");
  const chunks = [];
  let off = 8;
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString("ascii", off + 4, off + 8);
    const data = buf.subarray(off + 8, off + 8 + len);
    chunks.push({ type, data });
    off += 12 + len;
  }
  return chunks;
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

/** Devuelve {w, h, px} con px como RGBA plano. */
function decode(buf) {
  const chunks = readChunks(buf);
  const ihdr = chunks.find((c) => c.type === "IHDR");
  if (!ihdr) throw new Error("Falta IHDR");
  const w = ihdr.data.readUInt32BE(0);
  const h = ihdr.data.readUInt32BE(4);
  const depth = ihdr.data[8];
  const colorType = ihdr.data[9];
  const interlace = ihdr.data[12];
  if (depth !== 8) throw new Error(`Solo soporta bitdepth 8 (es ${depth})`);
  if (interlace !== 0) throw new Error("No soporta PNG entrelazado");
  if (colorType !== 2 && colorType !== 3 && colorType !== 6)
    throw new Error(`Solo soporta colortype 2, 3 o 6 (es ${colorType})`);

  // Colortype 3 es indexado: cada byte es una entrada de la paleta (PLTE), y
  // tRNS —si existe— trae el alpha de cada entrada. Se expande a RGBA aqui
  // para que el resto del pipeline no tenga que saber de paletas.
  let plte = null;
  let trns = null;
  if (colorType === 3) {
    const p = chunks.find((c) => c.type === "PLTE");
    if (!p) throw new Error("PNG indexado sin PLTE");
    plte = p.data;
    trns = chunks.find((c) => c.type === "tRNS")?.data ?? null;
  }

  const ch = colorType === 6 ? 4 : colorType === 3 ? 1 : 3;
  const idat = Buffer.concat(
    chunks.filter((c) => c.type === "IDAT").map((c) => c.data)
  );
  const raw = inflateSync(idat);

  const stride = w * ch;
  const out = Buffer.alloc(w * h * 4);
  let prev = Buffer.alloc(stride);
  let pos = 0;

  for (let y = 0; y < h; y++) {
    const filter = raw[pos++];
    const line = Buffer.from(raw.subarray(pos, pos + stride));
    pos += stride;

    for (let i = 0; i < stride; i++) {
      const a = i >= ch ? line[i - ch] : 0;
      const b = prev[i];
      const c = i >= ch ? prev[i - ch] : 0;
      switch (filter) {
        case 0: break;
        case 1: line[i] = (line[i] + a) & 0xff; break;
        case 2: line[i] = (line[i] + b) & 0xff; break;
        case 3: line[i] = (line[i] + ((a + b) >> 1)) & 0xff; break;
        case 4: line[i] = (line[i] + paeth(a, b, c)) & 0xff; break;
        default: throw new Error(`Filtro desconocido: ${filter}`);
      }
    }

    for (let x = 0; x < w; x++) {
      const s = x * ch;
      const d = (y * w + x) * 4;
      if (plte) {
        const idx = line[s];
        out[d] = plte[idx * 3];
        out[d + 1] = plte[idx * 3 + 1];
        out[d + 2] = plte[idx * 3 + 2];
        out[d + 3] = trns && idx < trns.length ? trns[idx] : 255;
      } else {
        out[d] = line[s];
        out[d + 1] = line[s + 1];
        out[d + 2] = line[s + 2];
        out[d + 3] = ch === 4 ? line[s + 3] : 255;
      }
    }
    prev = line;
  }
  return { w, h, px: out };
}

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encode({ w, h, px }) {
  const stride = w * 4;
  const raw = Buffer.alloc((stride + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (stride + 1)] = 0; // filtro None
    px.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;  // bitdepth
  ihdr[9] = 6;  // RGBA
  return Buffer.concat([
    PNG_SIG,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/**
 * Quita el fondo blanco haciendo un desmatado real, no un simple recorte.
 *
 * El borde de una imagen generada por difusion no es un antialias de un pixel:
 * es una rampa borrosa de varios pixeles donde cada uno es una mezcla del color
 * del objeto con el blanco del fondo. Si a esos pixeles solo se les baja el alpha
 * siguen siendo blanquecinos, y sobre fondo oscuro se ven como un cerco claro.
 *
 * Aqui, para cada pixel de la rampa:
 *   C_visto = a * C_objeto + (1 - a) * blanco
 * se estima C_objeto con el pixel mas oscuro del nucleo cercano, se despeja el
 * alpha de la luminancia, y se le devuelve su color real.
 *
 * El flood fill entra desde los bordes, asi que los blancos encerrados (las
 * letras talladas en el caparazon) no se tocan.
 *
 * El fondo es blanco y por tanto gris puro, asi que un pixel cuenta como fondo
 * solo si ademas de claro esta desaturado. Sin esa condicion el azul del
 * caparazon (luminancia ~123) pasaria por fondo y el relleno atravesaria la
 * concha hasta comerse las letras.
 *
 * @param core   luminancia por debajo de la cual un pixel ya es objeto solido
 * @param satMax saturacion por encima de la cual un pixel es objeto, sea claro o no
 * @param radio  radio de busqueda del color de referencia, en pixeles
 */
function knockout({ w, h, px }, { core = 105, satMax = 0.22, radio = 7 } = {}) {
  const lum = (i) => (px[i * 4] * 0.299 + px[i * 4 + 1] * 0.587 + px[i * 4 + 2] * 0.114);
  const sat = (i) => {
    const r = px[i * 4], g = px[i * 4 + 1], b = px[i * 4 + 2];
    const mx = Math.max(r, g, b);
    return mx === 0 ? 0 : (mx - Math.min(r, g, b)) / mx;
  };
  const isFondo = (i) => lum(i) >= core && sat(i) <= satMax;
  const inRamp = new Uint8Array(w * h);
  const seen = new Uint8Array(w * h);
  const stack = [];

  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);

  // 1. marcar toda la zona clara conectada con el exterior, rampa incluida
  let cleared = 0;
  while (stack.length) {
    const i = stack.pop();
    if (seen[i]) continue;
    seen[i] = 1;
    if (!isFondo(i)) continue; // nucleo del objeto, paramos

    inRamp[i] = 1;
    cleared++;

    const x = i % w;
    const y = (i / w) | 0;
    if (x > 0) stack.push(i - 1);
    if (x < w - 1) stack.push(i + 1);
    if (y > 0) stack.push(i - w);
    if (y < h - 1) stack.push(i + w);
  }

  // 2. desmatar: alpha por luminancia, color del nucleo mas cercano
  let unmatted = 0;
  for (let i = 0; i < w * h; i++) {
    if (!inRamp[i]) continue;
    const l = lum(i);

    if (l >= 250) { // blanco plano, fuera sin mas
      px[i * 4 + 3] = 0;
      continue;
    }

    const cx = i % w;
    const cy = (i / w) | 0;
    let ref = -1;
    let refLum = 255;
    for (let dy = -radio; dy <= radio; dy++) {
      const y = cy + dy;
      if (y < 0 || y >= h) continue;
      for (let dx = -radio; dx <= radio; dx++) {
        const x = cx + dx;
        if (x < 0 || x >= w) continue;
        const j = y * w + x;
        if (inRamp[j]) continue; // solo nucleo
        const lj = lum(j);
        if (lj < refLum) { refLum = lj; ref = j; }
      }
    }

    if (ref === -1) { // rampa sin nucleo cerca: es fondo
      px[i * 4 + 3] = 0;
      continue;
    }

    const a = Math.max(0, Math.min(1, (255 - l) / Math.max(1, 255 - refLum)));
    px[i * 4] = px[ref * 4];
    px[i * 4 + 1] = px[ref * 4 + 1];
    px[i * 4 + 2] = px[ref * 4 + 2];
    px[i * 4 + 3] = Math.round(a * 255);
    unmatted++;
  }

  return { cleared, unmatted };
}

export { decode, encode, knockout };

// Solo actua como CLI cuando se ejecuta directamente, no al importarlo.
if (process.argv[1] && import.meta.filename === path.resolve(process.argv[1])) {
  const [, , inPath, outPath] = process.argv;
  if (!inPath || !outPath) {
    console.error("Uso: node scripts/png-knockout.mjs entrada.png salida.png");
    process.exit(1);
  }

  const img = decode(readFileSync(inPath));
  const { cleared, unmatted } = knockout(img);
  writeFileSync(outPath, encode(img));
  console.log(
    `${outPath} — ${img.w}x${img.h}, ${cleared} px de fondo fuera ` +
    `(${((cleared / (img.w * img.h)) * 100).toFixed(1)}%), ${unmatted} px de rampa desmatados`
  );
}
