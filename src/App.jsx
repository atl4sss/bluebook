import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartCodePage from "./pages/StartCodePage";
import TestPage from "./pages/TestPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartCodePage />} />
        <Route path="/test/:testId" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
