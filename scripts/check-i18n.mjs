#!/usr/bin/env node
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const LOCALES_DIR = join(here, '..', 'i18n', 'locales');
const LANGUAGES = ['zh-CN', 'en', 'vi'];
const REFERENCE = 'zh-CN';

function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out);
    else out[key] = true;
  }
  return out;
}

function loadNs(lng, ns) {
  const file = join(LOCALES_DIR, lng, `${ns}.json`);
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, 'utf8'));
}

const refDir = join(LOCALES_DIR, REFERENCE);
const namespaces = readdirSync(refDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''));

let errors = 0;
for (const ns of namespaces) {
  const refKeys = flatten(loadNs(REFERENCE, ns));
  for (const lng of LANGUAGES) {
    if (lng === REFERENCE) continue;
    const data = loadNs(lng, ns);
    if (!data) {
      console.error(`MISSING FILE: ${lng}/${ns}.json`);
      errors++;
      continue;
    }
    const keys = flatten(data);
    for (const k of Object.keys(refKeys)) {
      if (!(k in keys)) {
        console.error(`MISSING KEY: ${lng}/${ns}.json -> ${k}`);
        errors++;
      }
    }
    for (const k of Object.keys(keys)) {
      if (!(k in refKeys)) {
        console.error(`EXTRA KEY:   ${lng}/${ns}.json -> ${k}`);
        errors++;
      }
    }
  }
}

if (errors) {
  console.error(`\ni18n parity check FAILED: ${errors} problem(s).`);
  process.exit(1);
}
console.log(
  `i18n parity check passed: ${namespaces.length} namespace(s) x ${LANGUAGES.length} language(s).`
);
