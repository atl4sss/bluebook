import fs from "fs";
import path from "path";
import pdf from "pdf-parse/lib/pdf-parse.js";
import { fileURLToPath } from "url";

// ── корректный __dirname в ESM ───────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. Путь к PDF (лежит в корне проекта)
const pdfPath = path.join(__dirname, "..", "sat5.pdf");

// 2. Куда сохранить txt
const outPath = path.join(__dirname, "..", "src", "satQuestionsRaw.txt");

// 3. Читаем и сохраняем
const data = fs.readFileSync(pdfPath);
pdf(data)
  .then(res => {
    fs.writeFileSync(outPath, res.text);
    console.log("✅ raw text saved →", outPath);
  })
  .catch(e => console.error("❌ pdf-parse error:", e));
