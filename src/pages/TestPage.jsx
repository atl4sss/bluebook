/* ===========================================================================
   TestPage.jsx  ―  полный mock-SAT (обе секции, все задания)
   ───────────────────────────────────────────────────────────────────────────
   Section 1  (Reading & Writing)
     • Module 1 32 мин 27 вопросов
     • Module 2 32 мин 27 вопросов
   Break 10 мин
   Section 2  (Math)
     • Module 1 35 мин 22 вопроса
     • Module 2 35 мин 22 вопроса
   ─ визуал тот же: пунктир, шрифты Myriad/Minion, «Hide/Show» таймера
   ─ «Questions»-пилюля работает во всех модулях
   ─ RW — двухколоночная верстка; Math — центр, одна колонка
   ─ кнопка Next чинная: пока не конец → «Next», на последнем — правильная
     подпись («Module 2», «Break», «Finish»)
   ─ toolbar в Math заменён на реальные иконки Calculator / Reference
   ========================================================================== */

import { useState, useEffect } from "react";
import {
  BatteryFull,
  Bookmark,
  MoreVertical,
  PenBox,
  ChevronDown,
  X,
  Calculator,
  BookOpen,
} from "lucide-react";

/* -------- 27 Reading-&-Writing вопросов (точно как раньше) -------- */
const RW_QUESTIONS = [
  {
    stem:
      "Urban ecologists once assumed city parks merely “decorated” dense neighborhoods; more recent work argues they are infrastructural: they filter air, cool heat islands, and—by fostering informal gatherings—stabilize civic ties. Critics, however, say such claims overstate what small patches of greenery can accomplish without transit reform and affordable housing. Still, the best current evidence suggests parks function as a necessary, if not _____, component of urban health.",
    choices: ["exclusive", "sufficient", "decorative", "incidental"],
  },
  {
    stem:
      "Archaeologists analyzing charred seeds from a coastal settlement reported that crop diversity spiked precisely when storm frequency rose. The team warns that the farmers were not “innovating for novelty,” but hedging against failure: more crops meant that at least one would survive. _____, diversification appears less like progress than like resilience—a strategy for absorbing shock.",
    choices: ["In contrast,", "Consequently,", "Nevertheless,", "For example,"],
  },
  {
    stem:
      "Even as the lab’s sensor array produced minute-by-minute readings, the principal investigator cautioned students against mistaking precision for certainty; the instrument could be precise and still be wrong if it were ______.",
    choices: [
      "routinely calibrated",
      "carefully logged",
      "systematically biased",
      "widely adopted",
    ],
  },
  {
    stem:
      "Historians often celebrate the pamphlet as the engine of eighteenth-century political change. That story, though rousing, is incomplete. Literacy was uneven; distribution was expensive; and the most influential texts were read aloud in coffeehouses, then debated, summarized, and sometimes distorted. The pamphlet mattered, but its power was in how people used it together.",
    choices: [
      "To refute the claim that pamphlets existed in the eighteenth century",
      "To qualify a popular explanation of pamphlets’ political impact",
      "To compare pamphlets with newspapers and broadsides",
      "To argue that distortion makes sources unusable",
    ],
  },
  {
    stem:
      'Many nutrition labels list single-serving sizes that are far smaller than what people typically consume. A “half cup” of cereal, for instance, may be the labeled serving, though most bowls hold twice that amount. Public-health researchers contend that such labeling can mislead well-intentioned shoppers who are trying to track sugar and sodium. The most effective reform, they argue, would be to ______.',
    choices: [
      "abandon labeling because shoppers ignore it",
      "require serving sizes to reflect customary consumption",
      "print servings in smaller type to discourage overeating",
      "remove sugar and sodium from labels altogether",
    ],
  },
  {
    stem:
      "When the engineer proposed a schedule that would “maximize collaboration,” she meant more than additional meetings. Her plan reorganized work into brief, overlapping windows during which teams could exchange partial results, correct course, and then disperse. This cadence, she explained, ______ sustained focus yet made coordination routine.",
    choices: [
      "while it harmed",
      "because it undermined",
      "although it weakened",
      "because it preserved",
    ],
  },
  {
    stem:
      "[1] The composer’s early string quartets sound meticulously planned, but his notebooks show pages of reckless experiments: scrawled themes, crossed-out meters, and fragments that fail spectacularly. [2] Listeners often describe the finished pieces as inevitable, as if they could not have been written any other way. [3] That feeling of inevitability, however, is the residue of selection; countless drafts are the condition for the illusion of necessity. [4] One archivist, tallying the variants, called the final versions “the calm surface of a turbulent sea.”\n\nA sentence from the author’s draft is below.\n“Paradoxically, meticulousness in the product requires messiness in the process.”\nWhere should the sentence be added?",
    choices: [
      "Before sentence 1",
      "After sentence 1",
      "After sentence 2",
      "After sentence 3",
    ],
  },
  {
    stem:
      "A biotech CEO claimed her company’s pill “reverses aging.” That phrasing won headlines but collapsed a complex claim—slowing cellular damage in mice—into a miracle. A more responsible description would replace the hype with a precise, testable statement ______ the measured effect and its limits.",
    choices: ["boasting about", "alluding vaguely to", "quantifying", "dramatizing"],
  },
  {
    stem:
      'Although the museum promotes its new wing as “community-centered,” the entrance plaza funnels visitors through a boutique before reaching the galleries, and the café’s prices exceed those of nearby restaurants. ______ the wing advances access, the experience suggests it monetizes it.',
    choices: ["While", "Because", "Unless", "If"],
  },
  {
    stem:
      "In the years after a wildfire, hillsides can look stable: thin grasses hold soil, and saplings take root. But roots that would anchor slopes for decades are still forming, and a single storm can undo apparent recovery. The paradox is that landscapes seem most secure when they are most ______.",
    choices: ["consolidated", "vulnerable", "impermeable", "cultivated"],
  },
  {
    stem:
      'Some argue that because “most people” adapt to time-zone shifts within a day, the harms of biannual clock changes are exaggerated. But “most” hides those who work nights, care for infants, or manage chronic conditions; for them, even small circadian disruptions are costly. The argument fails because its evidence is ______.',
    choices: [
      "unusually persuasive",
      "ethically neutral",
      "insufficiently representative",
      "statistically precise",
    ],
  },
  {
    stem:
      'The art historian contends that a painting’s frame is not merely decorative; it tells viewers how to look. A heavy, gilded border can make a modest canvas feel monumental, while a bare edge can announce informality. The frame, she writes, “is the first rhetoric of the picture.”',
    choices: [
      "It provides a metaphor that synthesizes the paragraph’s claim.",
      "It refutes the idea that frames exist.",
      "It supplies quantitative evidence about framing costs.",
      "It introduces a counterexample to the thesis.",
    ],
  },
  {
    stem:
      "Startups often tout “disruption” as though novelty were the only path to improvement. Yet many successes come from the unglamorous work of standardization: making interfaces predictable, documentation complete, and defaults sensible. ______, stability can be more transformative than change.",
    choices: ["In other words", "Nevertheless", "For instance, by contrast", "Meanwhile"],
  },
  {
    stem:
      "The novelist’s draft page glitters with metaphors—so many that the images crowd each other and blur. An editor suggests cutting most of them, arguing that restraint will ______ the few that remain.",
    choices: ["aggrandize", "enervate", "intensify", "eclipse"],
  },
  {
    stem:
      'During the hearing, the company spokesperson said that the river “may have experienced an incidental uptick in turbidity” after the plant’s discharge. Residents, who had filmed chocolate-colored water for three consecutive days, objected. The spokesperson’s phrase functions primarily to ______.',
    choices: [
      "acknowledge uncertainty while minimizing apparent severity",
      "concede culpability in unambiguous terms",
      "provide a detailed chemical explanation",
      "replace technical language with colloquial speech",
    ],
  },
  {
    stem:
      "Because coral reefs build over centuries, conservationists emphasize that preventing small damages today yields disproportionate benefits later. If an anchor drags across a living reef, for example, the injury can enlarge as waves exploit the weakness. The logic supports policies that ______.",
    choices: [
      "delay interventions until long-term data are complete",
      "concentrate enforcement only after major bleaching events",
      "prioritize avoidance of minor harms before they compound",
      "assume local actions cannot affect global outcomes",
    ],
  },
  {
    stem:
      "The researcher arranged the report so that each claim precedes its evidence, arguing that readers should first grasp the question before being asked to evaluate data. A colleague objected that the pattern felt “accusatory,” as if the text were daring readers to disprove it. The disagreement is mostly about ______.",
    choices: [
      "formatting conventions in academic journals",
      "whether the data were collected ethically",
      "rhetoric—the perceived stance a structure projects",
      "whether readers can understand graphs",
    ],
  },
  {
    stem:
      "When a city bans single-use plastic bags, some shoppers switch to thicker “reusable” ones but discard them after few trips, producing more plastic than before. Policymakers who expect a ban to reduce waste must anticipate such rebounds. The most careful studies therefore pair bans with incentives to reuse—deposit systems or discounts—which ______ the intended effect.",
    choices: ["neutralize", "accelerate", "reverse", "complicate"],
  },
  {
    stem:
      'A sentence from a student essay is below.\n“Social media companies should implement friction, like mandatory pauses, to slow impulsive sharing because speed amplifies misinformation.”\nWhich choice best introduces this sentence to a paragraph arguing for design-level solutions?',
    choices: [
      "Although users must learn to verify posts themselves, platforms also influence how people behave.",
      "Since traditional media were always slow, the internet is inherently risky.",
      "People enjoy scrolling through feeds, so there is little that can be done.",
      "Because misinformation occurs, shutting platforms down would be ideal.",
    ],
  },
  {
    stem:
      'The committee’s report states that the renovation is “on schedule,” yet contractors have requested timeline extensions twice this quarter and the auditorium remains closed to rehearsals. The phrase “on schedule” is therefore best understood as ______.',
    choices: ["literal", "aspirational", "quantitative", "redundant"],
  },
  {
    stem:
      "Although the fossil looked like a familiar trilobite, its eyes lacked lenses; instead, the sockets housed a reflective layer similar to that of modern deep-sea fish. The discovery suggests that what appears similar may have evolved for different reasons—shape is not destiny but ______.",
    choices: ["ornament", "accident", "archive", "obstacle"],
  },
  {
    stem:
      "At the conference, the keynote speaker traced how a single misleading chart traveled: first a blog, then a newsletter, then a television segment, and finally a policy memo. Each step laundered the claim’s uncertainty until it looked authoritative. To counter that process, the speaker urged analysts to annotate sources so that uncertainty is ______ at every retelling.",
    choices: ["erased", "domesticated", "foregrounded", "implied"],
  },
  {
    stem:
      'A common defense of predictive policing is that “the algorithm is neutral.” Yet neutrality in design does not guarantee neutrality in output: biased training data can yield biased predictions, and enforcement focused where the model points can further skew the data. The defense fails chiefly because it ______.',
    choices: [
      "recognizes that feedback loops are inevitable",
      "confuses procedural neutrality with outcome neutrality",
      "insists on auditing models for bias",
      "distinguishes inputs from outputs",
    ],
  },
  {
    stem:
      "The curator considered placing the minimalist sculpture in a crowded gallery, thinking that the surrounding busyness would make its restraint legible. Instead, she left it in an almost empty room; the piece’s slight curves became visible only as visitors slowed down. That choice underscores a principle: context can ______ the very features it seeks to reveal.",
    choices: ["eclipse", "catalog", "reproduce", "mandate"],
  },
  {
    stem:
      "Many museum labels read like miniature essays, but the best function like lenses: they angle the eye without blocking the view. A clumsy label explains what to feel; a deft one names just enough to let the work do the persuading. Accordingly, writers should favor ______.",
    choices: [
      "exhaustive chronology over selective detail",
      "directive language over suggestion",
      "brevity joined to specificity",
      "technical jargon to signify expertise",
    ],
  },
  {
    stem:
      "Scientists debating the reintroduction of wolves to a national park agree on the facts—deer overbrowse saplings; predators alter grazing patterns—but disagree about timescale. One camp predicts visible recovery in five years; another insists on decades. The dispute turns less on data than on ______.",
    choices: [
      "assumptions about how quickly complex systems respond",
      "ignorance of herbivore behavior",
      "a failure to measure tree height",
      "whether wolves are charismatic animals",
    ],
  },
  {
    stem:
      'Consider the entrepreneur who claims her app “democratizes” college counseling by offering free essay prompts and deadline reminders. The tool may help, but the verb overreaches: counseling includes individualized feedback, knowledge of school cultures, and nuanced financial guidance. A more accurate revision would ______.',
    choices: [
      "replace “democratizes” with a precise description of the limited services the app provides",
      "add more adjectives to emphasize the app’s revolutionary potential",
      "delete all mention of counseling to avoid comparisons",
      "insist that traditional counselors are obsolete",
    ],
  },
];

/* ---------------------------- Math вопросы ---------------------------- */
const MATH_QUESTIONS = [
  /* multiple choice 1-14 */
  {
    stem:
      "For f(x) = (ax + b)/(x − 2), f(0) = 1, f(4) = 5. What is a + b?",
    choices: ["−1", "0", "1", "2"],
  },
  {
    stem:
      "x² − kx + (2k − 3) = 0 has positive roots r, s with r = 2s (k > 5). Find k.",
    choices: ["4", "5", "(9 − 3√3)/2", "(9 + 3√3)/2"],
  },
  {
    stem:
      "Fence 240 m with one divider (2L + 3W = 240).  L to maximize area?",
    choices: ["40", "50", "60", "80"],
  },
  {
    stem:
      "Test: sensitivity 95 %, specificity 90 %, prevalence 2 %. Positive result → probability condition present?",
    choices: ["8 %", "16 %", "50 %", "90 %"],
  },
  {
    stem:
      "Solve (x² − 5x + 6)/(x − 2) ≥ 3.",
    choices: ["x ≥ 6", "x > 2", "2 < x ≤ 6", "x ≤ 2 or x ≥ 6"],
  },
  {
    stem: "On 0 < θ < π/2 solve 2 sinθ cosθ = ½.",
    choices: ["π/12", "π/6", "π/3", "5π/12"],
  },
  {
    stem:
      "P(x)÷(x−1) → 2,  P(x)÷(x+2) → −1.  Remainder dividing by (x−1)(x+2)?",
    choices: ["2x − 1", "x + 1", "x − 1", "3"],
  },
  {
    stem:
      "Lines ℓ₁: y = 2x + t, ℓ₂: y = (t−1)x + 4 meet on x + y = 10.  t =?",
    choices: ["2", "3", "5 − √7", "7"],
  },
  {
    stem: "f(x) = (x − 4)/(x + 1).  f⁻¹(x) =?",
    choices: [
      "(x + 4)/(1 − x)",
      "(x − 1)/(x + 4)",
      "(4 − x)/(1 + x)",
      "(x + 1)/(x − 4)",
    ],
  },
  {
    stem: "Find n ≥ 0 such that C(n + 3, 2) = 45.",
    choices: ["5", "6", "7", "9"],
  },
  {
    stem:
      "Two components 40 % + 60 %. Score 1 = 82.  Min score 2 for overall 90?",
    choices: ["93", "95", "95.33", "98"],
  },
  {
    stem:
      "Solve (x − 3)² ≤ 4x − 5.",
    choices: [
      "(−∞, 5 − √11]",
      "[5 − √11, 5 + √11]",
      "(5 − √11, ∞)",
      "(−∞,5−√11)∪(5+√11,∞)",
    ],
  },
  {
    stem:
      "Circle through (1,2) and (5,6); center on y = x, quadrant I.  y-coord?",
    choices: ["2.5", "3", "3.5", "4"],
  },
  {
    stem: "If 3^(2x − 1) = 81, find x.",
    choices: ["2", "2.5", "3", "4"],
  },
  /* grid-in 15-22 */
  { stem: "Solve larger x: 2^(2x) − 5·2^x + 6 = 0.", grid: true },
  {
    stem:
      "System: x + y = 5 and √x + √y = 3, x,y ≥ 0.  Larger x =?",
    grid: true,
  },
  {
    stem:
      "Solve (x + 1)/(x − 2) + (x − 4)/(x + 1) = 2  (x ≠ −1,2).",
    grid: true,
  },
  {
    stem: "x² + y² = 85, x − y = 1.  Positive x = ?",
    grid: true,
  },
  {
    stem:
      "a₁ = 2,  a_{n+1} = 3a_n + 4.  Find a₄.",
    grid: true,
  },
  {
    stem:
      "10 L of 30 % acid. Add 80 % acid to get 50 %.  L added =?",
    grid: true,
  },
  {
    stem:
      "Minimize x + 9/x (x > 0).",
    grid: true,
  },
  {
    stem:
      "Price ↑ p % then ↓ p % → overall −4 %.  p = ?",
    grid: true,
  },
];

/* --------------------------- экзаменационные стадии --------------------------- */
const STAGES = [
  { sec: 1, mod: 1, title: "Reading and Writing", mins: 32, qs: RW_QUESTIONS },
  { sec: 1, mod: 2, title: "Reading and Writing", mins: 32, qs: RW_QUESTIONS },
  { id: "break", mins: 10 },
  { sec: 2, mod: 1, title: "Math", mins: 35, qs: MATH_QUESTIONS },
  { sec: 2, mod: 2, title: "Math", mins: 35, qs: MATH_QUESTIONS },
];

/* ========================================================================= */
export default function TestPage() {
  /* ------------- state (всегда один порядок хуков) ------------- */
  const [stageIdx, setStageIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secLeft, setSecLeft] = useState(STAGES[0].mins * 60);
  const [showClock, setShowClock] = useState(true);
  const [showList, setShowList] = useState(false);

  const stage = STAGES[stageIdx];
  const isMath = stage.title === "Math";

  /* ------------- таймер ------------- */
  useEffect(() => {
    setSecLeft(stage.mins * 60);
    setQIdx(0);
    window.scrollTo(0, 0);
  }, [stageIdx]);

  useEffect(() => {
    const id = setInterval(() => {
      setSecLeft((s) => {
        if (s > 0) return s - 1;
        clearInterval(id);
        nextStage();
        return 0;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageIdx]);

  const fmt = (s) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  /* ------------- BREAK ------------- */
  if (stage.id === "break")
    return <BreakScreen sec={secLeft} fmt={fmt} onResume={() => nextStage()} />;

  /* ------------- текущий вопрос ------------- */
  const total = stage.qs.length;
  const curr = stage.qs[qIdx] || {};
  const { stem, choices, grid } = curr;

  /* ------------- навигация ------------- */
  const nextQ = () => {
    if (qIdx < total - 1) setQIdx(qIdx + 1);
    else nextStage();
  };
  const prevQ = () => setQIdx((p) => Math.max(0, p - 1));

  function nextStage() {
    if (stageIdx < STAGES.length - 1) setStageIdx(stageIdx + 1);
  }

  const nextLabel = (() => {
    if (qIdx < total - 1) return "Next";
    if (stageIdx === 0) return "Module 2";
    if (stageIdx === 1) return "Break";
    if (stageIdx === 3) return "Module 2";
    return "Finish";
  })();

  /* ======================== RENDER ======================== */
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-gray-900 text-[17px] leading-[1.6]">
      {/* ===== HEADER ===== */}
      <header className="relative flex flex-wrap items-start justify-between px-6 md:px-10 pt-2 pb-1 bg-white/90 backdrop-blur-sm border-b border-gray-300 select-none">
        <h1 className="text-xl md:text-2xl font-semibold">
          Section&nbsp;{stage.sec}, Module&nbsp;{stage.mod}: {stage.title}
        </h1>

        {/* clock */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
          {showClock ? (
            <>
              <span className="text-lg md:text-xl font-bold tabular-nums">
                {fmt(secLeft)}
              </span>
              <button
                onClick={() => setShowClock(false)}
                className="text-[11px] font-semibold px-4 py-0.5 border border-current rounded-full hover:bg-gray-100"
              >
                Hide
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowClock(true)}
              className="text-[11px] font-semibold px-4 py-0.5 border border-current rounded-full hover:bg-gray-100"
            >
              Show
            </button>
          )}
        </div>

        {/* toolbar */}
        <div className="ml-auto flex items-center gap-6 opacity-90 text-[11px] md:text-xs select-none">
          {isMath && (
            <>
              <button className="flex flex-col items-center gap-0.5">
                <Calculator size={18} />
                Calculator
              </button>
              <button className="flex flex-col items-center gap-0.5">
                <BookOpen size={18} />
                Reference
              </button>
            </>
          )}
          <button className="flex flex-col items-center gap-0.5 opacity-60">
            <MoreVertical size={18} />
            More
          </button>
          <span className="flex items-center gap-1 opacity-60">
            100 % <BatteryFull size={16} />
          </span>
        </div>
      </header>

      <DashLine className="mt-5" />

      {/* ===== MAIN ===== */}
      <main className="relative flex-1 overflow-auto px-6 md:px-10 py-6 md:py-8">
        {!isMath && (
          <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] bg-gray-400/90" />
        )}

        {isMath ? (
          /* -------- Math: single column -------- */
          <div className="max-w-2xl mx-auto">
            <ReviewBanner num={qIdx + 1} />
            <p className="text-[16px] mb-6">{stem}</p>

            {choices ? (
              <ul>
                {choices.map((txt, i) => (
                  <Choice
                    key={i}
                    label={String.fromCharCode(65 + i)}
                    text={txt}
                    active={answers[`${stageIdx}-${qIdx}`] === i}
                    onClick={() =>
                      setAnswers({ ...answers, [`${stageIdx}-${qIdx}`]: i })
                    }
                  />
                ))}
              </ul>
            ) : (
              <input
                type="text"
                placeholder="Enter answer"
                className="w-full border border-gray-400 rounded-lg px-4 py-2"
                value={answers[`${stageIdx}-${qIdx}`] ?? ""}
                onChange={(e) =>
                  setAnswers({ ...answers, [`${stageIdx}-${qIdx}`]: e.target.value })
                }
              />
            )}
          </div>
        ) : (
          /* -------- Reading & Writing: two columns -------- */
          <div
            className="grid md:max-w-7xl mx-auto"
            style={{
              gridTemplateColumns: "minmax(0,1fr) minmax(0,560px)",
              gap: "0 28px",
            }}
          >
            <section className="max-w-[640px] pr-8 md:pr-12">
              <p className="text-[16px]">{stem}</p>
            </section>

            <aside className="pl-4 md:pl-6 max-h-[70vh] overflow-auto">
              <ReviewBanner num={qIdx + 1} />
              <ul>
                {choices.map((txt, i) => (
                  <Choice
                    key={i}
                    label={String.fromCharCode(65 + i)}
                    text={txt}
                    active={answers[`${stageIdx}-${qIdx}`] === i}
                    onClick={() =>
                      setAnswers({ ...answers, [`${stageIdx}-${qIdx}`]: i })
                    }
                  />
                ))}
              </ul>
            </aside>
          </div>
        )}
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="relative border-t border-gray-300 pt-3 pb-4 md:py-4 px-6 md:px-10">
        <DashLine className="absolute inset-x-0 top-0" />
        <div className="relative flex items-center md:max-w-7xl mx-auto w-full pt-2.5">
          <div className="ml-auto flex items-center gap-3 md:gap-4">
            <NavBtn disabled={qIdx === 0} onClick={prevQ}>
              Back
            </NavBtn>
            <NavBtn onClick={nextQ}>{nextLabel}</NavBtn>
          </div>

          <button
            onClick={() => setShowList(!showList)}
            className="absolute left-1/2 -translate-x-1/2 bg-black text-white text-sm font-semibold px-6 py-2 rounded-md shadow flex items-center gap-1"
          >
            Question {qIdx + 1} of {total}
            <ChevronDown
              size={14}
              className={showList ? "rotate-180 transition-transform" : ""}
            />
          </button>

          {showList && (
            <Popover
              total={total}
              current={qIdx + 1}
              onSelect={(n) => {
                setQIdx(n - 1);
                setShowList(false);
              }}
              onClose={() => setShowList(false)}
            />
          )}
        </div>
      </footer>
    </div>
  );
}

/* ------------------------ Break Screen ------------------------ */
function BreakScreen({ sec, fmt, onResume }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#111] text-white font-sans">
      <header className="flex justify-end p-4">
        <span className="flex items-center gap-1 text-sm">
          100 % <BatteryFull size={18} />
        </span>
      </header>

      <div className="flex-1 grid md:grid-cols-2 place-items-center px-6 py-10 gap-12">
        <div className="flex flex-col items-center gap-8">
          <div className="border border-gray-400 rounded-md px-10 py-6 text-center">
            <p className="uppercase text-sm tracking-wide mb-2">
              Remaining Break Time
            </p>
            <p className="text-6xl font-bold tabular-nums">{fmt(sec)}</p>
          </div>
          <button
            onClick={onResume}
            className="bg-[#FFD54F] text-black font-semibold px-8 py-3 rounded-full hover:bg-[#f7c52e]"
          >
            Resume Testing Now
          </button>
        </div>

        <div className="max-w-md text-[15px] leading-6">
          <h2 className="text-3xl font-bold mb-4">Take a Break</h2>
          <ol className="space-y-3 list-decimal ml-4">
            <li>No phones, smart-watches, textbooks, notes, or internet.</li>
            <li>No eating or drinking in the test room.</li>
            <li>No talking inside; outside, don’t discuss the exam.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

/* ----------------------- helpers & UI pieces ----------------------- */
const DashLine = ({ className = "" }) => (
  <div
    className={`h-[2px] w-full ${className}`}
    style={{
      backgroundImage:
        "repeating-linear-gradient(to right,#FFD54F 0 16px,transparent 16px 19px,#5CA9E6 19px 35px,transparent 35px 38px,#9CA3AF 38px 54px,transparent 54px 57px)",
    }}
  />
);

const NavBtn = ({ children, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`h-[38px] min-w-[80px] px-6 rounded-full text-sm font-semibold shadow transition-colors ${
      disabled
        ? "bg-gray-300 text-white cursor-default"
        : "bg-[#324DC7] text-white hover:bg-[#2B43B3]"
    }`}
  >
    {children}
  </button>
);

const ReviewBanner = ({ num }) => (
  <div className="relative flex items-center gap-3 py-1.5 pr-0 mb-4 select-none">
    <span className="px-3 h-8 flex items-center bg-black text-white font-bold text-base rounded-r-md">
      {num}
    </span>
    <Bookmark size={18} className="text-gray-800" />
    <span className="font-medium text-gray-800 text-sm md:text-base">
      Mark for Review
    </span>
    <div className="absolute left-0 right-0 -bottom-[2px] h-[2px] bg-gray-500 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right,#FFD54F 0 12px,transparent 12px 24px,#5CA9E6 24px 36px,transparent 36px 48px)",
        }}
      />
    </div>
  </div>
);

const Choice = ({ label, text, active, onClick }) => (
  <li className="mt-4 first:mt-0">
    <button
      onClick={onClick}
      className={`w-full flex gap-4 px-6 py-3 rounded-lg border transition ${
        active
          ? "border-[#374151] ring-2 ring-[#374151] bg-gray-50"
          : "border-[#374151] hover:border-gray-600"
      }`}
    >
      <span
        className={`w-6 h-6 flex items-center justify-center rounded-full border-2 text-[12px] font-semibold ${
          active ? "border-[#374151] text-[#374151]" : "border-[#374151]"
        }`}
      >
        {label}
      </span>
      <span className="flex-1 text-left text-[16px] leading-snug">{text}</span>
    </button>
  </li>
);

function Popover({ total, current, onSelect, onClose }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-[90px] bg-white border border-gray-300 rounded-lg shadow-lg w-[360px] z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 text-sm font-semibold">
        Questions
        <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
          <X size={16} />
        </button>
      </div>
      <div className="p-4 grid grid-cols-8 gap-2 text-xs">
        {Array.from({ length: total }).map((_, i) => {
          const n = i + 1;
          const active = n === current;
          return (
            <button
              key={n}
              onClick={() => onSelect(n)}
              className={`relative w-8 h-8 flex items-center justify-center rounded-sm font-bold ${
                active ? "border border-gray-900" : "bg-[#324DC7] text-white"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}
