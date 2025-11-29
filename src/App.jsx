import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartCodePage from "./pages/StartCodePage";
import TestPage from "./pages/TestPage";
import FinishPage from "./pages/FinishPage";
import 'katex/dist/katex.min.css';
import {InlineMath, BlockMath} from 'react-katex';
export { Demo };
function Demo() {
  return (
    <div className="space-y-6">
      <BlockMath math={`\\frac{a+b}{c}`} />
      <InlineMath math={`x^{2} + y^{2} = r^{2}`} /> 
      <BlockMath math={`\\sqrt{2x+1}`}/>
      <BlockMath math={`\\int_0^1 x^2\\,dx = \\frac{1}{3}`} />
    </div>
  );
}

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
