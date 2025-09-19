import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import Timer from "../components/Timer";
import FullscreenButton from "../components/FullscreenButton";

export default function TestPage() {
  const { testId } = useParams();
  const [data, setData] = useState(null);
  const [cur, setCur] = useState(0);

  // auto-fullscreen
  useEffect(() => {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    return () => {
      if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, "practiceTests", testId));
      if (snap.exists()) setData(snap.data());
    })();
  }, [testId]);

  if (!data) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  const q = data.questions[cur];

  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      {/* Header */}
      <header className="w-full bg-blue-50 border-b px-6 py-3 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">{data.sectionTitle}</div>
          <button
            className="mt-1 text-sm text-gray-700 hover:underline flex items-center gap-1"
            onClick={() => document.getElementById("dir").classList.toggle("hidden")}
          >
            Directions <span>▼</span>
          </button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
          <Timer minutes={data.timeMinutes} onComplete={() => alert("Time!")} />
          <FullscreenButton />
        </div>
      </header>

      {/* Directions */}
      <section id="dir" className="hidden px-6 py-3 border-b">
        {data.directions}
      </section>

      {/* Body */}
      <main className="flex-1 grid grid-cols-2 divide-x overflow-auto">
        {/* Passage */}
        <article className="p-6">
          {q.title && <h2 className="font-semibold mb-2">{q.title}</h2>}
          {q.stimulus && <p>{q.stimulus}</p>}
          {q.table && (
            <table className="mt-4 border text-sm">
              <tbody>
                {q.table.map((r, i) => (
                  <tr key={i}>{r.map((c, j) => <td key={j} className="border px-2 py-1">{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          )}
        </article>

        {/* Options */}
        <aside className="p-6">
          <p className="mb-4 font-medium">{q.text}</p>
          <ul className="space-y-2">
            {q.options.map((o, i) => (
              <li
                key={i}
                onClick={() => setCur((p) => p + 1)}
                className="border p-3 rounded hover:bg-gray-50 cursor-pointer"
              >
                <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                {o}
              </li>
            ))}
          </ul>
        </aside>
      </main>

      {/* Footer */}
      <footer className="border-t p-4 text-sm flex justify-between">
        <button
          onClick={() => setCur((p) => p - 1)}
          disabled={cur === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Back
        </button>
        <span>Question {cur + 1} of {data.questions.length}</span>
        <button
          onClick={() => setCur((p) => p + 1)}
          disabled={cur === data.questions.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </footer>
    </div>
  );
}
