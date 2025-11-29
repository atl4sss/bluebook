// src/pages/PrecheckPage.jsx
import { useMemo, useState } from "react";
import clsx from "clsx";
import { HelpCircle } from "lucide-react";

const STEPS = [
  { id: 1, title: "Confirm Your Personal Information" },
  { id: 2, title: "Confirm Device Information" },
  { id: 3, title: "Network Readiness" },
  { id: 4, title: "Exam Rules Acknowledgment" },
  { id: 5, title: "Test Day Info" },
  { id: 6, title: "ID Verification" },
  { id: 7, title: "Accessibility / Accommodations" },
  { id: 8, title: "Final Review" },
];

export default function PrecheckPage({ onFinish }) {
  const [step, setStep] = useState(1);
  const isLast = step === STEPS.length;

  const percent = useMemo(
    () => Math.max(0, Math.min(100, ((step - 1) / (STEPS.length - 1)) * 100)),
    [step]
  );

  function next() {
    if (isLast) {
      // переход к старт-коду/тесту — решай сам, по умолчанию назад в корень
      if (onFinish) onFinish();
      else window.location.href = "/test";
      return;
    }
    setStep((s) => Math.min(STEPS.length, s + 1));
  }
  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 md:px-10 h-[54px]">
        <button className="inline-flex items-center gap-2 text-sm text-gray-700">
          <HelpCircle size={18} />
          Help
        </button>
        <button
          className="text-sm text-gray-700 hover:underline"
          onClick={() => (window.location.href = "/")}
        >
          Return to Home <span className="ml-1">🏠</span>
        </button>
      </header>

      {/* Page title */}
      <div className="text-center mt-2 mb-4">
        <h1 className="text-[34px] leading-tight font-semibold tracking-tight">
          {STEPS.find((s) => s.id === step)?.title}
        </h1>
      </div>

      {/* Main Card (единственная центральная карточка как в Bluebook) */}
      <main className="px-4 md:px-8">
        <div className="relative max-w-5xl mx-auto">
          <div className="rounded-2xl bg-white border border-gray-200 shadow-[0_10px_60px_-10px_rgba(0,0,0,0.15)]">
            {/* Содержимое шага */}
            {step === 1 ? <Step1 /> : null}
            {step === 2 ? <Step2 /> : null}
            {step > 2 ? <Placeholder title={STEPS[step - 1].title} /> : null}

            {/* Кнопки Back/Next внизу карточки */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={back}
                disabled={step === 1}
                className={clsx(
                  "h-10 px-5 rounded-full text-[15px] font-medium",
                  step === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                )}
              >
                Back
              </button>
              <button
                onClick={next}
                className="h-10 px-6 rounded-full text-[15px] font-semibold bg-[#3354ff] text-white hover:bg-[#2c49d9]"
              >
                {isLast ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom progress — тонкая серая полоса с небольшим синим прогрессом */}
      <footer className="px-6 md:px-10 mt-6 mb-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-sm text-gray-700 mb-2">Step {step} of 8</div>
          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-[#3354ff] rounded-full transition-[width] duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Шаг 1: Confirm Your Personal Information (копия оригинала) ---------- */
function Step1() {
  return (
    <div className="px-6 md:px-8 py-6">
      {/* двухколоночная зона как на скрине */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: First and Last Name */}
        <section>
          <h3 className="text-[16px] font-semibold mb-3">First and Last Name</h3>
          <div className="space-y-3 select-none">
            <div className="h-10 w-full rounded-md bg-gray-100" />
            <div className="h-3 w-2/3 rounded-md bg-gray-100" />
          </div>
        </section>

        {/* Right: Accommodations */}
        <aside className="md:pl-4">
          <div className="border border-gray-200 rounded-xl px-4 py-4">
            <h4 className="text-[16px] font-semibold mb-2">Accommodations</h4>
            <ul className="list-disc pl-5 leading-6 text-[15px] text-gray-800">
              <li>
                You don’t have any approved digital testing accommodations.
              </li>
              <li>
                You may have approved accommodations that don’t apply to digital
                testing.
              </li>
              <li>
                Learn more about <span className="underline">accommodations</span>.
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* divider */}
      <div className="my-6 h-px bg-gray-200" />

      {/* Is this information correct? */}
      <section className="mb-1">
        <h3 className="text-[16px] font-semibold mb-3">
          Is this information correct?
        </h3>
        <RadioRow
          name="step1-correct"
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
          defaultValue="yes"
        />
      </section>
    </div>
  );
}

/* ---------- Шаг 2: Confirm Device Information (по первому фото из этой серии) ---------- */
function Step2() {
  return (
    <div className="px-6 md:px-8 py-6">
      <div className="max-w-2xl">
        <h3 className="text-[16px] font-semibold mb-4">Who owns this device?</h3>
        <RadioCol
          name="owner"
          options={[
            {
              value: "own",
              label: "I own this device (or I borrowed it from someone I know).",
            },
            {
              value: "cb",
              label: "I borrowed this device from College Board.",
            },
            {
              value: "school",
              label: "My school or test center owns this device.",
            },
          ]}
        />
        <p className="mt-5 text-[14px] text-gray-600">
          This information helps us resolve issues faster if you have a problem
          with your device.
        </p>
      </div>
    </div>
  );
}

/* ---------- Заглушка для шагов 3–8, пока ты не пришлёшь детали ---------- */
function Placeholder({ title }) {
  return (
    <div className="px-6 md:px-8 py-10">
      <p className="text-gray-600">
        Content for <span className="font-semibold">{title}</span> will appear
        here. Send me the screenshot/текст — добавлю точную разметку.
      </p>
    </div>
  );
}

/* ---------- UI helpers ---------- */
function RadioRow({ name, options, defaultValue }) {
  const [val, setVal] = useState(defaultValue ?? null);
  return (
    <div className="flex items-center gap-8">
      {options.map((o) => (
        <label
          key={o.value}
          className="inline-flex items-center gap-2 cursor-pointer text-[15px]"
        >
          <span
            className={clsx(
              "w-4 h-4 rounded-full border-2 inline-flex items-center justify-center",
              val === o.value ? "border-[#3354ff]" : "border-gray-400"
            )}
            onClick={() => setVal(o.value)}
          >
            <span
              className={clsx(
                "w-2 h-2 rounded-full",
                val === o.value ? "bg-[#3354ff]" : "bg-transparent"
              )}
            />
          </span>
          <input
            type="radio"
            className="hidden"
            name={name}
            value={o.value}
            checked={val === o.value}
            onChange={() => setVal(o.value)}
          />
          {o.label}
        </label>
      ))}
    </div>
  );
}

function RadioCol({ name, options, defaultValue }) {
  const [val, setVal] = useState(defaultValue ?? null);
  return (
    <div className="flex flex-col gap-3">
      {options.map((o) => (
        <label
          key={o.value}
          className="inline-flex items-center gap-2 cursor-pointer text-[15px]"
        >
          <span
            className={clsx(
              "w-4 h-4 rounded-full border-2 inline-flex items-center justify-center",
              val === o.value ? "border-[#3354ff]" : "border-gray-400"
            )}
            onClick={() => setVal(o.value)}
          >
            <span
              className={clsx(
                "w-2 h-2 rounded-full",
                val === o.value ? "bg-[#3354ff]" : "bg-transparent"
              )}
            />
          </span>
          <input
            type="radio"
            className="hidden"
            name={name}
            value={o.value}
            checked={val === o.value}
            onChange={() => setVal(o.value)}
          />
          {o.label}
        </label>
      ))}
    </div>
  );
}
