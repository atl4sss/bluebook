import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartCodePage from "./pages/StartCodePage";
import TestPage from "./pages/TestPage";
import FinishPage from "./pages/FinishPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartCodePage />} />
        {/* 👉 убираем :testId */}
        <Route path="/test" element={<TestPage />} />
        <Route path="/finish" element={<FinishPage />} />
      </Routes>
    </BrowserRouter>
  );
}
