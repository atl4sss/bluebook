import { useEffect, useState } from "react";

export default function FullscreenButton() {
  const [fs, setFs] = useState(false);
  useEffect(() => {
    const h = () => setFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);
  const toggle = async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  };
  return (
    <button onClick={toggle} className="px-2 py-1 border rounded text-xs hover:bg-gray-100">
      {fs ? "Exit Fullscreen" : "Enter Fullscreen"}
    </button>
  );
}
