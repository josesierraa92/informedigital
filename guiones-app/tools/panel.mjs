#!/usr/bin/env node
// Construye el panel con todas las tandas de guiones/.
// Uso: node tools/panel.mjs [ruta-extra-sin-cabecera.html]
//  - Siempre escribe panel/index.html (documento completo, se abre en el navegador).
//  - Si se da una ruta extra, escribe ahí la versión sin <html>/<head> para publicar como artifact.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "guiones");

function parseTanda(text, file) {
  const title = (text.match(/^# (.+)$/m)?.[1] || file).replace(/\s+—\s+tanda.*$/i, "").trim();
  // tabla resumen: | # | Fórmula | Gancho | Estructura | Duración | Para qué |
  const rows = {};
  for (const l of text.split("\n")) {
    const m = l.match(/^\|\s*(\d+)\s*\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|/);
    if (m) rows[m[1]] = { gancho: m[3].trim(), estructura: m[4].trim(), para: m[6].trim() };
  }
  const options = [];
  for (const part of text.split(/^## Opción /m).slice(1)) {
    const head = part.match(/^(\d+)\s*[·.-]?\s*(.+?)\s*\((\d+)\s*s\)/);
    if (!head) continue;
    const [, n, name, dur] = head;
    const beats = [];
    for (const l of part.split("\n")) {
      const b = l.match(/^\s*[-*]\s*\[(\d+:\d{2})\s*-\s*(\d+:\d{2})\]\s*(VOZ|CTA):\s*"?(.+?)"?\s*(?:\|\s*(.*))?$/);
      if (!b) continue;
      const extra = (b[5] || "").split("|").map((s) => s.trim()).filter(Boolean)
        .map((s) => s.replace(/^PANTALLA:\s*/i, "En pantalla: ").replace(/^VISUAL:\s*/i, "Imagen: ")).join(" · ");
      beats.push({ t: `${b[1]}–${b[2]}`, voz: b[4].replace(/"$/, ""), cta: b[3] === "CTA", extra });
    }
    const why = part.match(/\*\*Por qué puede funcionar:\*\*\s*(.+)/)?.[1]?.trim() || "";
    const alts = part.match(/\*\*Ganchos alternativos:\*\*\s*(.+)/)?.[1]?.trim() || "";
    options.push({ n: +n, name: name.trim(), dur: `${dur} s`, hook: beats[0]?.voz || "", beats, why, alts, ...(rows[n] || {}) });
  }
  const pend = text.split(/^## Por confirmar.*$/m)[1] || "";
  const pending = pend.split("\n").map((l) => l.match(/^\s*[-*]\s+(.+)$/)?.[1]).filter(Boolean);
  return { file, title, options, pending };
}

const files = readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "favoritos.md").sort().reverse();
const data = files.map((f) => parseTanda(readFileSync(join(dir, f), "utf8"), f)).filter((t) => t.options.length);

const tpl = readFileSync(join(root, "panel", "template.html"), "utf8");
const json = JSON.stringify(data).replace(/</g, "\\u003c");
const body = tpl.replace("/*DATA*/null", () => json);
writeFileSync(
  join(root, "panel", "index.html"),
  `<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n</head>\n<body>\n${body}\n</body>\n</html>\n`
);
if (process.argv[2]) writeFileSync(process.argv[2], body);
console.log(`Panel: ${data.length} tanda(s), ${data.reduce((n, t) => n + t.options.length, 0)} opciones.`);
for (const t of data) console.log(`  ${t.file}: ${t.options.length} opciones, ${t.pending.length} pendientes`);
