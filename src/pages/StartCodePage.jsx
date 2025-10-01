/* StartCodePage.jsx
   – ввод старт-кода + модальное “Help → введите имя”
   – имя сохраняется в localStorage под ключом "testTakerName"
*/

import { useState, useRef } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { HelpCircle, Home, X } from "lucide-react";

export default function StartCodePage() {
  /* ────────── state ────────── */
  const [code, setCode]     = useState(Array(6).fill(""));
  const [err,  setErr]      = useState("");
  const [name, setName]     = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const nav    = useNavigate();
  const cells  = useRef([]);

  /* ────────── ввод кода ────────── */
  const handleChange = (idx, e) => {
    const v = e.target.value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...code];
    next[idx] = v;
    setCode(next);
    if (v && idx < 5) cells.current[idx + 1]?.focus();
  };

  /* ────────── submit ────────── */
  const submit = async (e) => {
    e.preventDefault();
    const joined = code.join("");

    if (joined.length !== 6) return setErr("Enter the 6-digit code");
    if (!name.trim())        return setErr("Enter your name via Help");

    try {
      await setDoc(
        doc(db, "enteredCodes", joined),
        { name: name.trim(), createdAt: serverTimestamp() },
        { merge: true }
      );
      nav("/test");                           // переход к TestPage
    } catch {
      setErr("Network error");
    }
  };

  /* ────────── view ────────── */
  const square =
    "w-20 h-20 text-4xl text-center bg-white border-[1.5px] border-gray-300 " +
    "rounded-md shadow-inner focus:outline-none focus:border-black";

  return (
    <div className="min-h-screen flex flex-col bg-[#aec7b5] text-gray-900 font-sans">
      {/* top bar */}
      <header className="flex justify-between items-center px-4 py-1.5 text-sm bg-white/70 backdrop-blur">
        <button
          onClick={() => setShowHelp(true)}
          className="flex items-center gap-1 hover:underline"
        >
          <HelpCircle size={18} /> Help
        </button>

        <button className="flex items-center gap-1 hover:underline">
          Return to Home <Home size={18} />
        </button>
      </header>

      {/* main */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center select-none">
        <h1 className="text-4xl font-semibold mb-8">Start Code</h1>

        <p>Enter your start code now to begin testing. Good luck!</p>
        <p className="mt-2 mb-10">
          The start code contains{" "}
          <span className="font-semibold">numbers only.</span>
        </p>

        <form onSubmit={submit} className="flex flex-col items-center gap-10">
          <div className="flex gap-4">
            {code.map((d, i) => (
              <input
                key={i}
                value={d}
                onChange={(e) => handleChange(i, e)}
                ref={(el) => (cells.current[i] = el)}
                inputMode="numeric"
                className={square}
              />
            ))}
          </div>

          <button className="bg-[#ffd925] hover:bg-[#fbd318] border border-black rounded-full px-12 py-3 text-lg font-semibold shadow">
            Start Test
          </button>

          {err && <p className="text-red-600 -mt-6">{err}</p>}
        </form>

        <p className="text-sm mt-20">
          You can{" "}
          <span className="underline cursor-pointer">
            review the instructions
          </span>{" "}
          that the proctor reads aloud.
        </p>
      </div>

      {/* Help modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[340px] p-6 rounded-lg shadow-lg relative">
            {/* крестик — только закрывает */}
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
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

            {/* кнопка сохраняет в localStorage и закрывает */}
            <button
              onClick={() => {
                if (name.trim()) {
                  localStorage.setItem("testTakerName", name.trim());
                }
                setShowHelp(false);
              }}
              className="w-full bg-[#ffd925] hover:bg-[#fbd318] border border-black rounded-full py-2 font-semibold"
            >
              Save&nbsp;&amp;&nbsp;Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
