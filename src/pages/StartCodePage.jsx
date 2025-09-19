//  src/pages/StartCodePage.jsx
import { useState, useRef } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { HelpCircle, Home } from "lucide-react";

export default function StartCodePage() {
  /* state */
  const [code, setCode] = useState(Array(6).fill(""));
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const cells = useRef([]);

  /* change handler (по-символьно) */
  const onChange = (i, e) => {
    const v = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = v;
    setCode(next);
    if (v && i < 5) cells.current[i + 1]?.focus();
  };

  /* submit */
  const submit = async (e) => {
    e.preventDefault();
    const joined = code.join("");
    if (joined.length !== 6) return setErr("Enter the 6-digit code");

    try {
      // log attempt
      await setDoc(
        doc(db, "enteredCodes", joined),
        { createdAt: serverTimestamp() },
        { merge: true }
      );

      const snap = await getDoc(doc(db, "startCodes", joined));
      if (snap.exists()) nav(`/test/${snap.data().testId}`);
      else setErr("Invalid code");
    } catch {
      setErr("Network error");
    }
  };

  /* стиль квадрата */
  const square =
    "w-20 h-20 text-4xl text-center bg-white border-[1.5px] border-gray-300 " +
    "rounded-md shadow-inner focus:outline-none focus:border-black";

  /* jsx */
  return (
    <div className="min-h-screen flex flex-col bg-[#aec7b5] text-gray-900 font-sans">
      {/* ─── top bar ───────────────────────────────────────────── */}
      <header className="flex justify-between items-center px-4 py-1.5 text-sm bg-white/70 backdrop-blur border-b border-gray-300">
        <button className="flex items-center gap-1 hover:underline">
          <HelpCircle size={16} /> Help
        </button>
        <button className="flex items-center gap-1 hover:underline">
          Return to Home <Home size={16} />
        </button>
      </header>

      {/* ─── main block ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-semibold mb-8">Start Code</h1>

        <p>Enter your start code now to begin testing. Good luck!</p>
        <p className="mt-2 mb-10">
          The start code contains <span className="font-semibold">numbers only.</span>
        </p>

        <form onSubmit={submit} className="flex flex-col items-center gap-10">
          {/* six squares */}
          <div className="flex gap-4">
            {code.map((v, i) => (
              <input
                key={i}
                value={v}
                onChange={(e) => onChange(i, e)}
                ref={(el) => (cells.current[i] = el)}
                maxLength={1}
                inputMode="numeric"
                className={square}
              />
            ))}
          </div>

          <button className="bg-[#ffd925] hover:bg-[#fbd318] border border-black rounded-full px-12 py-3 text-lg font-semibold shadow">
            Start Test
          </button>

          {err && <p className="text-red-600 -mt-8">{err}</p>}
        </form>

        <p className="text-sm mt-20">
          You can <span className="underline cursor-pointer">review the instructions</span> that the proctor reads aloud.
        </p>
      </div>
    </div>
  );
}
