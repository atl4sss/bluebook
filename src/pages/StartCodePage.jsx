/* StartCodePage.jsx
   – ввод 6-значного кода + модальное “Help → введите имя”
   – имя хранится в localStorage ("testTakerName")
   – Firestore: коллекция enteredCodes, id документа = "<Имя>__<Код>__<ts>"
*/

import { useEffect, useRef, useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { HelpCircle, Home, X } from "lucide-react";

export default function StartCodePage() {
  const [code, setCode] = useState(Array(6).fill(""));
  const [err, setErr] = useState("");
  const [name, setName] = useState(localStorage.getItem("testTakerName") || "");
  const [showHelp, setShowHelp] = useState(false);

  const nav = useNavigate();
  const cells = useRef([]);

  useEffect(() => {
    cells.current[0]?.focus();
  }, []);

  const handleChange = (idx, e) => {
    const v = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[idx] = v;
    setCode(next);
    setErr("");
    if (v && idx < 5) cells.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) cells.current[idx - 1]?.focus();
    if (e.key === "ArrowLeft" && idx > 0) cells.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < 5) cells.current[idx + 1]?.focus();
  };

  const handlePaste = (e) => {
    const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!t) return;
    const arr = Array(6).fill("").map((_, i) => t[i] || "");
    setCode(arr);
    const last = Math.min(t.length, 6) - 1;
    if (last >= 0) cells.current[last]?.focus();
    e.preventDefault();
  };

  const joined = code.join("");
  const canSubmit = joined.length === 6 && name.trim().length > 0;

  // делаем "человеческий" и безопасный префикс для doc-id
  const makeSafeName = (raw) =>
    raw
      .trim()
      .replace(/\s+/g, " ")       // схлопнуть пробелы
      .replace(/[\/#?[\]]/g, "_")  // запретные символы Firestore
      .replace(/\s/g, "_");        // пробелы → подчёрки

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) {
      setErr(joined.length !== 6 ? "Enter the 6-digit code" : "Open Help and enter your name");
      return;
    }
    try {
      const nameSafe = makeSafeName(name);
      const docId = `${nameSafe}__${joined}__${Date.now()}`; // видно имя, id уникальный

      await setDoc(
        doc(db, "enteredCodes", docId),
        {
          name: name.trim(),
          code: joined,
          createdAt: serverTimestamp(),
        },
        { merge: false }
      );

      nav("/test");
    } catch (e) {
      console.error(e);
      setErr("Network error");
    }
  };

  const square =
    "w-[76px] h-[82px] text-4xl text-center bg-white " +
    "border-[2px] border-gray-300 rounded-[14px] " +
    "shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] " +
    "focus:outline-none focus:border-gray-800";

  return (
    <div className="min-h-screen flex flex-col bg-[#C6DECF] text-gray-900">
      {/* top bar */}
      <header className="flex justify-between items-center px-4 py-2 text-[15px] bg-white/70 backdrop-blur">
        <button onClick={() => setShowHelp(true)} className="flex items-center gap-1 hover:underline">
          <HelpCircle size={18} /> Help
        </button>
        <button className="flex items-center gap-1 hover:underline">
          Return to Home <Home size={18} />
        </button>
      </header>

      {/* main */}
      <main className="flex-1 flex flex-col items-center justify-start pt-20 pb-10 px-4 text-center">
        <h1 className="text-[42px] leading-none font-semibold tracking-tight">Start Code</h1>

        <p className="mt-6 text-[18px]">Enter your start code now to begin testing. Good luck!</p>
        <p className="mt-1 mb-10 text-[18px]">
          The start code contains <span className="font-semibold">numbers only.</span>
        </p>

        <form onSubmit={submit} className="flex flex-col items-center gap-8">
          <div className="flex gap-4" onPaste={handlePaste} aria-label="Start code inputs">
            {code.map((d, i) => (
              <input
                key={i}
                value={d}
                onChange={(e) => handleChange(i, e)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                ref={(el) => (cells.current[i] = el)}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                className={square}
              />
            ))}
          </div>

          <button
            disabled={!canSubmit}
            className={
              "rounded-full px-12 py-3 text-lg font-semibold border border-black shadow " +
              (canSubmit ? "bg-[#ffd925] hover:bg-[#fbd318]" : "bg-[#ffe88a] cursor-not-allowed opacity-60")
            }
          >
            Start Test
          </button>

          {err && <p className="text-red-600 -mt-4">{err}</p>}
          {!name.trim() && (
            <p className="text-sm -mt-4 text-gray-600">
              Tip: open <span className="font-medium">Help</span> and enter your name to enable the button.
            </p>
          )}
        </form>

        <p className="text-[15px] mt-24">
          You can <span className="underline cursor-pointer">review the instructions</span> that the proctor reads aloud.
        </p>
      </main>

      {/* Help modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[360px] p-6 rounded-2xl shadow-lg relative">
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              aria-label="Close help"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Your Name</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 focus:outline-none focus:border-black"
              placeholder="Enter full name"
            />

            <button
              onClick={() => {
                if (name.trim()) localStorage.setItem("testTakerName", name.trim());
                setShowHelp(false);
              }}
              className="w-full bg-[#ffd925] hover:bg-[#fbd318] border border-black rounded-full py-2 font-semibold"
            >
              Save & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
