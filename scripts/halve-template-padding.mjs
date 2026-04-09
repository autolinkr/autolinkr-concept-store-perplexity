#!/usr/bin/env node
/**
 * Halves section (and block) padding_top/padding_bottom in Shopify JSON templates.
 * Skips templates already halved. Snaps to step 4; clamps AL sections with min 20px padding.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const TEMPLATES = path.join(ROOT, "templates");

const SKIP = new Set(["index.json", "product.autolinkr-pro.json"]);

const MIN_PADDING_BY_SECTION_TYPE = {
  "al-video-section": 20,
  "al-compatibility": 20,
  "al-how-it-works": 20,
  "al-multicolumn-icons": 20,
};

function snapStep4(x) {
  if (x <= 0) return 0;
  return Math.round(x / 4) * 4;
}

function halfPad(v) {
  if (typeof v !== "number" || !Number.isFinite(v)) return v;
  return snapStep4(v / 2);
}

function processSettingsPadding(settings, minClamp) {
  if (!settings || typeof settings !== "object") return;
  for (const key of ["padding_top", "padding_bottom"]) {
    if (typeof settings[key] !== "number") continue;
    let nv = halfPad(settings[key]);
    if (minClamp > 0 && nv > 0 && nv < minClamp) nv = minClamp;
    settings[key] = nv;
  }
}

function processSection(section) {
  if (!section || typeof section !== "object") return;
  const st = section.type || "";
  const min = MIN_PADDING_BY_SECTION_TYPE[st] ?? 0;
  processSettingsPadding(section.settings, min);
  if (section.blocks && typeof section.blocks === "object") {
    for (const b of Object.values(section.blocks)) {
      if (b?.settings) processSettingsPadding(b.settings, 0);
    }
  }
}

function parseShopifyJson(raw) {
  return JSON.parse(raw.replace(/^\/\*[\s\S]*?\*\/\s*/, ""));
}

function readTemplate(raw) {
  const m = raw.match(/^(\/\*[\s\S]*?\*\/\s*)/);
  const comment = m ? m[1] : "";
  const json = parseShopifyJson(raw);
  return { comment, json };
}

function writeTemplate(filePath, comment, json) {
  const body = JSON.stringify(json, null, 2) + "\n";
  fs.writeFileSync(filePath, comment + body, "utf8");
}

function walkJsonFiles(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walkJsonFiles(p));
    else if (ent.name.endsWith(".json")) out.push(p);
  }
  return out;
}

let changed = 0;
for (const filePath of walkJsonFiles(TEMPLATES)) {
  const base = path.basename(filePath);
  if (SKIP.has(base)) continue;

  const raw = fs.readFileSync(filePath, "utf8");
  if (!raw.includes('"padding_top"') && !raw.includes('"padding_bottom"')) continue;

  const { comment, json } = readTemplate(raw);
  if (!json.sections || typeof json.sections !== "object") continue;

  for (const section of Object.values(json.sections)) {
    processSection(section);
  }

  writeTemplate(filePath, comment, json);
  changed++;
  console.log("updated:", path.relative(ROOT, filePath));
}

console.log(`Done. ${changed} template file(s) updated.`);
