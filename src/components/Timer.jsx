import { useEffect, useState } from "react";

export default function Timer({ minutes, onComplete }) {
  const [t, setT] = useState(minutes * 60);
  useEffect(() => {
    const id = setInterval(() => {
      setT((p) => {
        if (p <= 1) {
          clearInterval(id);
          onComplete?.();
          return 0;
        }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [minutes, onComplete]);
  const m = String(Math.floor(t / 60)).padStart(2, "0");
  const s = String(t % 60).padStart(2, "0");
  return <span className="font-bold">{m}:{s}</span>;
}
