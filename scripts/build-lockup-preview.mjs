/**
 * Genera una version autocontenida de public/logo-lockup.html con las imagenes
 * embebidas en base64, para poder verla fuera del servidor de desarrollo.
 *
 * Uso: node scripts/build-lockup-preview.mjs salida.html
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public", "logo-lockup.html");
const out = process.argv[2];
if (!out) {
  console.error("Uso: node scripts/build-lockup-preview.mjs salida.html");
  process.exit(1);
}

let html = readFileSync(SRC, "utf8");

// src="/loquesea.png" -> data URI
html = html.replace(/src="\/([^"]+\.png)"/g, (_m, rel) => {
  const b64 = readFileSync(path.join(ROOT, "public", rel)).toString("base64");
  return `src="data:image/png;base64,${b64}"`;
});

writeFileSync(out, html);
console.log(`${out} — ${(html.length / 1024 / 1024).toFixed(2)} MB`);
