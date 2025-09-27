import { useState, useEffect } from "react";
import {
  ChevronDown,
  MoreVertical,
  BatteryFull,
  Bookmark,
  PenBox,
  X,
} from "lucide-react";

/* SAT Reading & Writing practice – TestPage.jsx */
export default function TestPage() {
  const [sec, setSec] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showDir, setShowDir] = useState(false);
  const [showList, setShowList] = useState(false);

  /* ——— ТУТ только две строки изменены ——— */
  const totalQ = 27;      // ← было 8
  const flagged = [];     // ← прежние  [7] удалил, чтобы не выходило за диапазон
  /* ---------------------------------------------------------- */

  const curQ = 2;         // оставил как было: «текущий» вопрос №2-й

  useEffect(() => {
    const id = setInterval(() => setSec((s) => s + 1), 1_000);
    return () => clearInterval(id);
  }, []);
  const fmt = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  /* ---------- дальнейший код НЕ ТРОГАЛ ---------- */

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-gray-900 text-[17px] leading-[1.6]">
      {/* ===== HEADER ===== */}
      <header className="relative flex flex-wrap items-start justify-between px-6 md:px-10 pt-2 pb-1 bg-white/90 backdrop-blur-sm border-b border-gray-300 select-none">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">
            Section&nbsp;1: Reading and Writing
          </h1>
          <button
            onClick={() => setShowDir(!showDir)}
            className="mt-0.5 flex items-center gap-1 text-sm text-gray-700 hover:underline"
          >
            Directions
            <ChevronDown
              size={14}
              className={showDir ? "rotate-180 transition" : "transition"}
            />
          </button>
        </div>

        {/* timer */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
          <span className="text-lg md:text-xl font-bold tabular-nums">
            {fmt(sec)}
          </span>
          <button className="text-[11px] font-semibold px-4 py-0.5 border border-current rounded-full hover:bg-gray-100">
            Hide
          </button>
        </div>

        {/* right tools */}
        <div className="ml-auto flex flex-col items-end gap-0.5">
          <span className="flex items-center gap-1 text-[11px] md:text-xs">
            86% <BatteryFull size={16} />
          </span>
          <div className="flex items-start gap-6">
            <button className="flex flex-col items-center gap-0.5 hover:opacity-80">
              <PenBox size={18} />
              <span className="text-[11px]">Annotate</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 hover:opacity-80">
              <MoreVertical size={18} />
              <span className="text-[11px]">More</span>
            </button>
          </div>
        </div>
      </header>

      {/* верхний пунктир */}
      <DashLine />

      {showDir && (
        <div className="px-6 md:px-10 py-2 text-sm bg-gray-50 border-b border-gray-300">
          Read the passage and answer the questions that follow.
        </div>
      )}

      {/* ===== MAIN ===== */}
      <main className="relative flex-1 overflow-auto px-6 md:px-10 py-6 md:py-8">
        {/* вертикальная линия */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] bg-gray-400/90" />

        <div
          className="grid md:max-w-7xl mx-auto"
          style={{
            gridTemplateColumns: "minmax(0,1fr) minmax(0,560px)",
            gap: "0 28px",
          }}
        >
          {/* passage */}
          <section className="space-y-6 pr-2 md:pr-4">
            <p className="italic text-base font-serif">
              The following text is from Herman Melville’s 1854 novel{" "}
              <em>The Lightning-rod Man</em>.
            </p>
            <p className="text-[15px] md:text-[16px] font-serif">
              The stranger still stood in the exact middle of the cottage …
            </p>
          </section>

          {/* questions */}
          <aside className="pl-4 md:pl-6 max-h-[70vh] overflow-auto">
            <QuestionCard answers={answers} setAnswers={setAnswers} />
          </aside>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="relative border-t border-gray-300 pt-3 pb-4 md:py-4 px-6 md:px-10">
        <DashLine className="absolute inset-x-0 top-0" />
        <div className="relative flex items-center md:max-w-7xl mx-auto w-full pt-2.5">
          {/* навигация */}
          <div className="ml-auto flex items-center gap-3 md:gap-4">
            <NavBtn>Back</NavBtn>
            <NavBtn>Next</NavBtn>
          </div>

          {/* question-pill */}
          <button
            onClick={() => setShowList(!showList)}
            className="absolute left-1/2 -translate-x-1/2 bg-black text-white
                       text-sm font-semibold px-6 py-2 rounded-md shadow
                       flex items-center gap-1"
          >
            Question {curQ} of {totalQ}
            <ChevronDown
              size={14}
              className={showList ? "rotate-180 transition-transform" : ""}
            />
          </button>

          {showList && (
            <Popover
              total={totalQ}
              current={curQ}
              flagged={flagged}
              onClose={() => setShowList(false)}
            />
          )}
        </div>
      </footer>
    </div>
  );
}

/* ========= helpers (без изменений) ========= */

const DashLine = ({ className = "" }) => (
  <div
    className={`h-[2px] w-full ${className}`}
    style={{
      backgroundImage:
        "repeating-linear-gradient(to right,#FFD54F 0 16px,transparent 16px 19px,#5CA9E6 19px 35px,transparent 35px 38px,#9CA3AF 38px 54px,transparent 54px 57px)",
    }}
  />
);

const NavBtn = ({ children }) => (
  <button
    className="h-[38px] min-w-[80px] px-6 rounded-full
               bg-[#324DC7] text-white text-sm font-semibold
               shadow hover:bg-[#2B43B3] transition-colors"
  >
    {children}
  </button>
);

/* ===== Question area (не трогал) ===== */

function QuestionCard({ answers, setAnswers }) {
  const opts = [
    "It elaborates on the previous sentence’s description of the character.",
    "It introduces the setting that is described in the sentences that follow.",
    "It establishes a contrast with the description in the previous sentence.",
    "It sets up the character description presented in the sentences that follow.",
  ];
  const choose = (i) => setAnswers({ ...answers, q2: i });

  return (
    <div>
      <ReviewBanner />
      <p className="mb-5 text-[15px] md:text-[16px] leading-snug">
        Which choice best states the function of the underlined sentence in the
        overall structure of the text?
      </p>
      <ul>
        {opts.map((txt, idx) => (
          <Choice
            key={idx}
            label={String.fromCharCode(65 + idx)}
            text={txt}
            active={answers.q2 === idx}
            onClick={() => choose(idx)}
          />
        ))}
      </ul>
    </div>
  );
}

const ReviewBanner = () => (
  <div className="relative flex items-center gap-3 py-1.5 pr-0 mb-4 select-none">
    <span className="px-3 h-8 flex items-center bg-black text-white font-bold text-base rounded-r-md">
      2
    </span>
    <Bookmark size={18} className="text-gray-800" />
    <span className="font-medium text-gray-800 text-sm md:text-base">
      Mark for Review
    </span>
    <div className="absolute left-0 right-0 -bottom-[2px] h-[2px] bg-gray-500 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right,#FFD54F 0 12px,transparent 12px 24px,#5CA9E6 24px 36px,transparent 36px 48px)",
        }}
      />
    </div>
  </div>
);

const Choice = ({ label, text, active, onClick }) => (
  <li className="mt-4 first:mt-0">
    <button
      onClick={onClick}
      className={`w-full flex gap-4 px-6 py-3 rounded-lg border transition ${
        active
          ? "border-[#374151] ring-2 ring-[#374151] bg-gray-50"
          : "border-[#374151] hover:border-gray-600"
      }`}
    >
      <span
        className={`w-6 h-6 flex items-center justify-center rounded-full border-2 text-[12px] font-semibold ${
          active ? "border-[#374151] text-[#374151]" : "border-[#374151]"
        }`}
      >
        {label}
      </span>
      <span className="flex-1 text-left text-[15px] md:text-[16px] leading-snug">
        {text}
      </span>
    </button>
  </li>
);

function Popover({ total, current, flagged, onClose }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-[90px] bg-white border border-gray-300 rounded-lg shadow-lg w-[360px] z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b text-sm font-semibold">
        Questions
        <button onClick={onClose} className="p-1 hover:text-red-600">
          <X size={16} />
        </button>
      </div>
      <div className="p-4 grid grid-cols-8 gap-2 text-xs">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`relative w-8 h-8 flex items-center justify-center rounded-sm font-bold
              ${
                i + 1 === current
                  ? "border border-gray-900"
                  : "bg-[#324DC7] text-white"
              }`}
          >
            {i + 1}
            {flagged.includes(i + 1) && (
              <span className="absolute -top-[2px] right-[2px] w-2 h-2 bg-red-500 rounded" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== end of file ===== */
