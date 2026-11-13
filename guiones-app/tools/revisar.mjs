#!/usr/bin/env node
// Verifica un guion: duración estimada, frases prohibidas, formato y datos sin confirmar.
// Uso: node tools/revisar.mjs guiones/archivo.md --seg 30 [--wps 2.7] [--marca slug]
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--") && !/^\d+(\.\d+)?$/.test(a));
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};

if (!file) {
  console.error("Uso: node tools/revisar.mjs <guion.md> --seg <segundos> [--wps 2.7] [--marca slug]");
  process.exit(2);
}
if (!existsSync(file)) {
  console.error(`No existe: ${file}`);
  process.exit(2);
}

const targetSec = Number(opt("seg", 0));
const wps = Number(opt("wps", 2.7));
const marca = opt("marca", "");
const text = readFileSync(file, "utf8");

const errors = [];
const warns = [];
const norm = (s) => s.toLowerCase().normalize("NFC");

// --- Beats ---
const beatRe = /^\s*[-*]?\s*\[(\d+):(\d{2})\s*-\s*(\d+):(\d{2})\]\s*(.*)$/;
const beats = [];
for (const line of text.split(/\r?\n/)) {
  const m = line.match(beatRe);
  if (!m) continue;
  const start = +m[1] * 60 + +m[2];
  const end = +m[3] * 60 + +m[4];
  const body = m[5];
  const v = body.match(/(?:VOZ|CTA):\s*(.+?)(?=\s*\|\s*(?:PANTALLA|VISUAL|VOZ|CTA):|$)/);
  const spoken = v ? v[1].replace(/^["“]|["”]\s*$/g, "").trim() : "";
  beats.push({ start, end, spoken, isCta: /(^|\s)CTA:/.test(body), line });
}

if (beats.length === 0) {
  errors.push("No se encontraron beats con formato `[m:ss-m:ss] VOZ: \"...\"`. Revisa el formato en SKILL.md.");
}

const countWords = (s) => (s.match(/[\p{L}\p{N}]+(?:[’'.-][\p{L}\p{N}]+)*/gu) || []).length;
const totalWords = beats.reduce((n, b) => n + countWords(b.spoken), 0);
const estSec = totalWords / wps;
const lastEnd = beats.length ? Math.max(...beats.map((b) => b.end)) : 0;

// Continuidad de los tiempos
for (let i = 1; i < beats.length; i++) {
  if (beats[i].start < beats[i - 1].end) warns.push(`Beats solapados: "${beats[i - 1].line.trim().slice(0, 40)}…" y el siguiente.`);
  if (beats[i].start - beats[i - 1].end > 1) warns.push(`Hueco de ${beats[i].start - beats[i - 1].end} s antes del beat ${i + 1}.`);
}
for (const b of beats) {
  if (b.end <= b.start) errors.push(`Beat con tiempo inválido: ${b.line.trim().slice(0, 50)}`);
}

// Duración
if (targetSec) {
  const dev = (estSec - targetSec) / targetSec;
  if (Math.abs(dev) > 0.15) {
    errors.push(
      `Duración estimada ${estSec.toFixed(1)} s (${totalWords} palabras a ${wps} palabras/s) vs objetivo ${targetSec} s: ` +
        `${dev > 0 ? "sobra" : "falta"} ${Math.abs(Math.round(dev * 100))} %. ` +
        `Rango sano: ${Math.round(targetSec * 0.85 * wps)}–${Math.round(targetSec * 1.15 * wps)} palabras.`
    );
  }
  if (lastEnd && Math.abs(lastEnd - targetSec) > Math.max(3, targetSec * 0.1)) {
    warns.push(`El último beat termina en ${lastEnd} s pero el objetivo es ${targetSec} s.`);
  }
}

// Gancho
const first = beats[0];
if (first) {
  const hw = countWords(first.spoken);
  if (hw === 0) errors.push("El primer beat no tiene VOZ (el gancho debe estar en los primeros 3 s).");
  if (hw > 14) warns.push(`El gancho tiene ${hw} palabras (ideal ≤ 12).`);
  if (first.end - first.start > 5) warns.push(`El gancho dura ${first.end - first.start} s (ideal ≤ 3–4 s).`);
  if (/^\s*(hola|buenas|bienvenid)/i.test(first.spoken)) warns.push("El gancho empieza con saludo: frena la retención.");
}

// CTA
const ctaBeats = beats.filter((b) => b.isCta);
if (ctaBeats.length === 0) warns.push("No hay beat con `CTA:`.");
if (ctaBeats.length > 1) warns.push("Hay más de un CTA; deja uno solo.");

// Frases prohibidas (globales + de la marca)
const cfg = JSON.parse(readFileSync(join(root, "config", "frases-prohibidas.json"), "utf8"));
let marcaErr = [];
if (marca) {
  const mf = join(root, "marcas", `${marca}.md`);
  if (existsSync(mf)) {
    const sec = readFileSync(mf, "utf8").split(/^## /m).find((s) => /^prohibido/i.test(s)) || "";
    marcaErr = sec
      .split(/\r?\n/)
      .map((l) => l.match(/^\s*[-*]\s+(.+)$/))
      .filter(Boolean)
      .map((m) => m[1].trim())
      .filter((p) => p && !p.startsWith("("));
  } else {
    warns.push(`No existe marcas/${marca}.md (no se aplicaron prohibiciones de la marca).`);
  }
}
const lower = norm(text);
// Solo se revisa el contenido del guion (no la sección de notas ni los ganchos alternativos de referencia)
const scan = (list, bucket, label) => {
  for (const p of list) {
    if (lower.includes(norm(p))) bucket.push(`${label}: aparece "${p}".`);
  }
};
scan(cfg.error, errors, "Frase prohibida");
scan(marcaErr, errors, "Prohibido por la marca");
scan(cfg.aviso, warns, "Revisar frase");

// Datos sin confirmar
const pend = [...text.matchAll(/\[CONFIRMAR[^\]]*\]/g)].map((m) => m[0]);
if (pend.length) warns.push(`${pend.length} dato(s) por confirmar con la universidad: ${[...new Set(pend)].join(", ")}`);

// Cifras sospechosas: porcentajes o montos sin [CONFIRMAR] en la misma línea
for (const l of text.split(/\r?\n/)) {
  if (/(\d+\s?%|\$\s?\d|\d+\s?(egresados|estudiantes|años de))/i.test(l) && !/CONFIRMAR/.test(l) && /(VOZ|CTA|PANTALLA):/.test(l)) {
    warns.push(`Cifra sin [CONFIRMAR] en: ${l.trim().slice(0, 70)}… (verifica que viene del perfil de marca)`);
  }
}

// --- Reporte ---
console.log(`Archivo: ${file}`);
console.log(`Beats: ${beats.length} · Palabras habladas: ${totalWords} · Duración estimada: ${estSec.toFixed(1)} s` + (targetSec ? ` (objetivo ${targetSec} s)` : ""));
if (errors.length) {
  console.log("\nERRORES (corrige antes de entregar):");
  errors.forEach((e) => console.log("  ✗ " + e));
}
if (warns.length) {
  console.log("\nAVISOS:");
  warns.forEach((w) => console.log("  ! " + w));
}
if (!errors.length) console.log("\n✓ Sin errores" + (warns.length ? " (hay avisos)" : ""));
process.exit(errors.length ? 1 : 0);
