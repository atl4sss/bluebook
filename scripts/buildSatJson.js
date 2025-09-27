import fs from "fs";
const raw = fs.readFileSync("./src/satQuestionsRaw.txt", "utf8");

// ====== ПРИМЕРНЫЙ парсер блока Module 1, RW ======
const section = {
  sectionTitle: "SAT Practice Test #5 – Reading & Writing",
  timeMinutes: 39,
  directions:
    "Answer each question… (сократили, можно скопировать полный текст).",
  questions: [],
};

const lines = raw.split(/\r?\n/);
let i = 0;
while (i < lines.length) {
  // ищем строку вида “1 ”, “2 ” … (номер + пробел)
  if (/^\d+\s/.test(lines[i])) {
    const number = +lines[i].match(/^(\d+)/)[1];
    const statement = lines[i].replace(/^\d+\s*/, "").trim();

    // собираем варианты A) … D)
    const opts = [];
    i++;
    while (i < lines.length && /^[A-D]\)/.test(lines[i])) {
      opts.push(lines[i].replace(/^[A-D]\)\s*/, "").trim());
      i++;
    }

    section.questions.push({
      text: statement,
      options: opts,
      answer: 0,           // TODO: занести ключ позже
    });
  } else i++;
}

fs.writeFileSync(
  "./src/mockQuestions.js",
  "export const mockTest = " + JSON.stringify(section, null, 2) + ";\n"
);
console.log("✅  mockQuestions.js обновлён");
