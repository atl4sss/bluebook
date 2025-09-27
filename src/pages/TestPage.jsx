/* =======================================================================
   TestPage.jsx — SAT “Reading & Writing” mock-module (27 questions)
   • visual layout identical to your last accepted revision
   • Back / Next switch questions locally (no reload)
   • left column gets extra padding (pr-8 md:pr-12) so stem text
     never collides with the vertical divider
   • full Minion Pro / Myriad Pro pairing assumed already declared
     in Tailwind’s theme (font-serif / font-sans)
   ======================================================================= */

import { useState, useEffect } from "react";
import {
  ChevronDown,
  MoreVertical,
  BatteryFull,
  Bookmark,
  PenBox,
  X,
} from "lucide-react";

/* ---------------- COMPLETE 27-item question set ---------------- */
const QUESTIONS = [
  {
    stem: `Urban ecologists once assumed city parks merely “decorated” dense neighborhoods; more recent work argues they are infrastructural: they filter air, cool heat islands, and—by fostering informal gatherings—stabilize civic ties. Critics, however, say such claims overstate what small patches of greenery can accomplish without transit reform and affordable housing. Still, the best current evidence suggests parks function as a necessary, if not _____, component of urban health.`,
    choices: ["exclusive", "sufficient", "decorative", "incidental"],
  },
  {
    stem: `Archaeologists analyzing charred seeds from a coastal settlement reported that crop diversity spiked precisely when storm frequency rose. The team warns that the farmers were not “innovating for novelty,” but hedging against failure: more crops meant that at least one would survive. _____, diversification appears less like progress than like resilience—a strategy for absorbing shock.`,
    choices: ["In contrast,", "Consequently,", "Nevertheless,", "For example,"],
  },
  {
    stem: `Even as the lab’s sensor array produced minute-by-minute readings, the principal investigator cautioned students against mistaking precision for certainty; the instrument could be precise and still be wrong if it were ______.`,
    choices: ["routinely calibrated", "carefully logged", "systematically biased", "widely adopted"],
  },
  {
    stem: `Historians often celebrate the pamphlet as the engine of eighteenth-century political change. That story, though rousing, is incomplete. Literacy was uneven; distribution was expensive; and the most influential texts were read aloud in coffeehouses, then debated, summarized, and sometimes distorted. The pamphlet mattered, but its power was in how people used it together.`,
    choices: [
      "To refute the claim that pamphlets existed in the eighteenth century",
      "To qualify a popular explanation of pamphlets’ political impact",
      "To compare pamphlets with newspapers and broadsides",
      "To argue that distortion makes sources unusable",
    ],
  },
  {
    stem: `Many nutrition labels list single-serving sizes that are far smaller than what people typically consume. A “half cup” of cereal, for instance, may be the labeled serving, though most bowls hold twice that amount. Public-health researchers contend that such labeling can mislead well-intentioned shoppers who are trying to track sugar and sodium. The most effective reform, they argue, would be to ______.`,
    choices: [
      "abandon labeling because shoppers ignore it",
      "require serving sizes to reflect customary consumption",
      "print servings in smaller type to discourage overeating",
      "remove sugar and sodium from labels altogether",
    ],
  },
  {
    stem: `When the engineer proposed a schedule that would “maximize collaboration,” she meant more than additional meetings. Her plan reorganized work into brief, overlapping windows during which teams could exchange partial results, correct course, and then disperse. This cadence, she explained, ______ sustained focus yet made coordination routine.`,
    choices: [
      "while it harmed",
      "because it undermined",
      "although it weakened",
      "because it preserved",
    ],
  },
  {
    stem: `[1] The composer’s early string quartets sound meticulously planned, but his notebooks show pages of reckless experiments: scrawled themes, crossed-out meters, and fragments that fail spectacularly. [2] Listeners often describe the finished pieces as inevitable, as if they could not have been written any other way. [3] That feeling of inevitability, however, is the residue of selection; countless drafts are the condition for the illusion of necessity. [4] One archivist, tallying the variants, called the final versions “the calm surface of a turbulent sea.”  
A sentence from the author’s draft is below.  
“Paradoxically, meticulousness in the product requires messiness in the process.”  
Where should the sentence be added?`,
    choices: [
      "Before sentence 1",
      "After sentence 1",
      "After sentence 2",
      "After sentence 3",
    ],
  },
  {
    stem: `A biotech CEO claimed her company’s pill “reverses aging.” That phrasing won headlines but collapsed a complex claim—slowing cellular damage in mice—into a miracle. A more responsible description would replace the hype with a precise, testable statement ______ the measured effect and its limits.`,
    choices: ["boasting about", "alluding vaguely to", "quantifying", "dramatizing"],
  },
  {
    stem: `Although the museum promotes its new wing as “community-centered,” the entrance plaza funnels visitors through a boutique before reaching the galleries, and the café’s prices exceed those of nearby restaurants. ______ the wing advances access, the experience suggests it monetizes it.`,
    choices: ["While", "Because", "Unless", "If"],
  },
  {
    stem: `In the years after a wildfire, hillsides can look stable: thin grasses hold soil, and saplings take root. But roots that would anchor slopes for decades are still forming, and a single storm can undo apparent recovery. The paradox is that landscapes seem most secure when they are most ______.`,
    choices: ["consolidated", "vulnerable", "impermeable", "cultivated"],
  },
  {
    stem: `Some argue that because “most people” adapt to time-zone shifts within a day, the harms of biannual clock changes are exaggerated. But “most” hides those who work nights, care for infants, or manage chronic conditions; for them, even small circadian disruptions are costly. The argument fails because its evidence is ______.`,
    choices: [
      "unusually persuasive",
      "ethically neutral",
      "insufficiently representative",
      "statistically precise",
    ],
  },
  {
    stem: `The art historian contends that a painting’s frame is not merely decorative; it tells viewers how to look. A heavy, gilded border can make a modest canvas feel monumental, while a bare edge can announce informality. The frame, she writes, “is the first rhetoric of the picture.”`,
    choices: [
      "It provides a metaphor that synthesizes the paragraph’s claim.",
      "It refutes the idea that frames exist.",
      "It supplies quantitative evidence about framing costs.",
      "It introduces a counterexample to the thesis.",
    ],
  },
  {
    stem: `Startups often tout “disruption” as though novelty were the only path to improvement. Yet many successes come from the unglamorous work of standardization: making interfaces predictable, documentation complete, and defaults sensible. ______, stability can be more transformative than change.`,
    choices: [
      "In other words",
      "Nevertheless",
      "For instance, by contrast",
      "Meanwhile",
    ],
  },
  {
    stem: `The novelist’s draft page glitters with metaphors—so many that the images crowd each other and blur. An editor suggests cutting most of them, arguing that restraint will ______ the few that remain.`,
    choices: ["aggrandize", "enervate", "intensify", "eclipse"],
  },
  {
    stem: `During the hearing, the company spokesperson said that the river “may have experienced an incidental uptick in turbidity” after the plant’s discharge. Residents, who had filmed chocolate-colored water for three consecutive days, objected. The spokesperson’s phrase functions primarily to ______.`,
    choices: [
      "acknowledge uncertainty while minimizing apparent severity",
      "concede culpability in unambiguous terms",
      "provide a detailed chemical explanation",
      "replace technical language with colloquial speech",
    ],
  },
  {
    stem: `Because coral reefs build over centuries, conservationists emphasize that preventing small damages today yields disproportionate benefits later. If an anchor drags across a living reef, for example, the injury can enlarge as waves exploit the weakness. The logic supports policies that ______.`,
    choices: [
      "delay interventions until long-term data are complete",
      "concentrate enforcement only after major bleaching events",
      "prioritize avoidance of minor harms before they compound",
      "assume local actions cannot affect global outcomes",
    ],
  },
  {
    stem: `The researcher arranged the report so that each claim precedes its evidence, arguing that readers should first grasp the question before being asked to evaluate data. A colleague objected that the pattern felt “accusatory,” as if the text were daring readers to disprove it. The disagreement is mostly about ______.`,
    choices: [
      "formatting conventions in academic journals",
      "whether the data were collected ethically",
      "rhetoric—the perceived stance a structure projects",
      "whether readers can understand graphs",
    ],
  },
  {
    stem: `When a city bans single-use plastic bags, some shoppers switch to thicker “reusable” ones but discard them after few trips, producing more plastic than before. Policymakers who expect a ban to reduce waste must anticipate such rebounds. The most careful studies therefore pair bans with incentives to reuse—deposit systems or discounts—which ______ the intended effect.`,
    choices: ["neutralize", "accelerate", "reverse", "complicate"],
  },
  {
    stem: `A sentence from a student essay is below.  
“Social media companies should implement friction, like mandatory pauses, to slow impulsive sharing because speed amplifies misinformation.”  
Which choice best introduces this sentence to a paragraph arguing for design-level solutions?`,
    choices: [
      "Although users must learn to verify posts themselves, platforms also influence how people behave.",
      "Since traditional media were always slow, the internet is inherently risky.",
      "People enjoy scrolling through feeds, so there is little that can be done.",
      "Because misinformation occurs, shutting platforms down would be ideal.",
    ],
  },
  {
    stem: `The committee’s report states that the renovation is “on schedule,” yet contractors have requested timeline extensions twice this quarter and the auditorium remains closed to rehearsals. The phrase “on schedule” is therefore best understood as ______.`,
    choices: ["literal", "aspirational", "quantitative", "redundant"],
  },
  {
    stem: `Although the fossil looked like a familiar trilobite, its eyes lacked lenses; instead, the sockets housed a reflective layer similar to that of modern deep-sea fish. The discovery suggests that what appears similar may have evolved for different reasons—shape is not destiny but ______.`,
    choices: ["ornament", "accident", "archive", "obstacle"],
  },
  {
    stem: `At the conference, the keynote speaker traced how a single misleading chart traveled: first a blog, then a newsletter, then a television segment, and finally a policy memo. Each step laundered the claim’s uncertainty until it looked authoritative. To counter that process, the speaker urged analysts to annotate sources so that uncertainty is ______ at every retelling.`,
    choices: ["erased", "domesticated", "foregrounded", "implied"],
  },
  {
    stem: `A common defense of predictive policing is that “the algorithm is neutral.” Yet neutrality in design does not guarantee neutrality in output: biased training data can yield biased predictions, and enforcement focused where the model points can further skew the data. The defense fails chiefly because it ______.`,
    choices: [
      "recognizes that feedback loops are inevitable",
      "confuses procedural neutrality with outcome neutrality",
      "insists on auditing models for bias",
      "distinguishes inputs from outputs",
    ],
  },
  {
    stem: `The curator considered placing the minimalist sculpture in a crowded gallery, thinking that the surrounding busyness would make its restraint legible. Instead, she left it in an almost empty room; the piece’s slight curves became visible only as visitors slowed down. That choice underscores a principle: context can ______ the very features it seeks to reveal.`,
    choices: ["eclipse", "catalog", "reproduce", "mandate"],
  },
  {
    stem: `Many museum labels read like miniature essays, but the best function like lenses: they angle the eye without blocking the view. A clumsy label explains what to feel; a deft one names just enough to let the work do the persuading. Accordingly, writers should favor ______.`,
    choices: [
      "exhaustive chronology over selective detail",
      "directive language over suggestion",
      "brevity joined to specificity",
      "technical jargon to signify expertise",
    ],
  },
  {
    stem: `Scientists debating the reintroduction of wolves to a national park agree on the facts—deer overbrowse saplings; predators alter grazing patterns—but disagree about timescale. One camp predicts visible recovery in five years; another insists on decades. The dispute turns less on data than on ______.`,
    choices: [
      "assumptions about how quickly complex systems respond",
      "ignorance of herbivore behavior",
      "a failure to measure tree height",
      "whether wolves are charismatic animals",
    ],
  },
  {
    stem: `Consider the entrepreneur who claims her app “democratizes” college counseling by offering free essay prompts and deadline reminders. The tool may help, but the verb overreaches: counseling includes individualized feedback, knowledge of school cultures, and nuanced financial guidance. A more accurate revision would ______.`,
    choices: [
      "replace “democratizes” with a precise description of the limited services the app provides",
      "add more adjectives to emphasize the app’s revolutionary potential",
      "delete all mention of counseling to avoid comparisons",
      "insist that traditional counselors are obsolete",
    ],
  },
];

/* ============================================================== */
/*                              PAGE                              */
/* ============================================================== */

export default function TestPage() {
  const [sec, setSec] = useState(0);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const id = setInterval(() => setSec((s) => s + 1), 1_000);
    return () => clearInterval(id);
  }, []);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  /* ------- helpers to flip questions ------ */
  const prev = () => setIdx((p) => Math.max(0, p - 1));
  const next = () => setIdx((p) => Math.min(QUESTIONS.length - 1, p + 1));

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-gray-900 text-[17px] leading-[1.6]">
      <Header time={fmt(sec)} />

      <main className="relative flex-1 overflow-auto px-6 md:px-10 py-6 md:py-8">
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] bg-gray-400/90" />

        <div
          className="grid md:max-w-7xl mx-auto"
          style={{
            gridTemplateColumns: "minmax(0,1fr) minmax(0,560px)",
            gap: "0 28px",
          }}
        >
          {/* STIMULUS / TEXT  */}
          <section className="pr-8 md:pr-12">
            <p className="text-[15px] md:text-[16px] font-serif">
              {QUESTIONS[idx].stem}
            </p>
          </section>

          {/* CHOICES */}
          <aside className="pl-4 md:pl-6 max-h-[70vh] overflow-auto">
            <QuestionCard
              qIndex={idx}
              data={QUESTIONS[idx]}
              answers={answers}
              setAnswers={setAnswers}
            />
          </aside>
        </div>
      </main>

      <Footer
        idx={idx}
        total={QUESTIONS.length}
        prev={prev}
        next={next}
      />
    </div>
  );
}

/* ---------------------- HEADER ---------------------- */
function Header({ time }) {
  const [showDir, setShowDir] = useState(false);
  return (
    <>
      <header className="relative flex flex-wrap items-start justify-between px-6 md:px-10 pt-2 pb-1 bg-white/90 backdrop-blur-sm border-b border-gray-300 select-none">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">
            Section&nbsp;1: Reading and Writing
          </h1>
          <button
            onClick={() => setShowDir(!showDir)}
            className="mt-0.5 flex items-center gap-1 text-sm text-gray-700 hover:underline"
          >
            Directions
            <ChevronDown
              size={14}
              className={showDir ? "rotate-180 transition" : "transition"}
            />
          </button>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
          <span className="text-lg md:text-xl font-bold tabular-nums">{time}</span>
          <button className="text-[11px] font-semibold px-4 py-0.5 border border-current rounded-full hover:bg-gray-100">
            Hide
          </button>
        </div>

        <div className="ml-auto flex flex-col items-end gap-0.5">
          <span className="flex items-center gap-1 text-[11px] md:text-xs">
            86% <BatteryFull size={16} />
          </span>
          <div className="flex items-start gap-6">
            <button className="flex flex-col items-center gap-0.5 hover:opacity-80">
              <PenBox size={18} />
              <span className="text-[11px]">Annotate</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 hover:opacity-80">
              <MoreVertical size={18} />
              <span className="text-[11px]">More</span>
            </button>
          </div>
        </div>
      </header>

      <DashLine />

      {showDir && (
        <div className="px-6 md:px-10 py-2 text-sm bg-gray-50 border-b border-gray-300">
          Read each text and choose the best answer to each question.
        </div>
      )}
    </>
  );
}

/* ---------------------- FOOTER ---------------------- */
function Footer({ idx, total, prev, next }) {
  return (
    <footer className="relative border-t border-gray-300 pt-3 pb-4 md:py-4 px-6 md:px-10">
      <DashLine className="absolute inset-x-0 top-0" />
      <div className="relative flex items-center md:max-w-7xl mx-auto w-full pt-2.5">
        <div className="ml-auto flex items-center gap-3 md:gap-4">
          <NavBtn disabled={idx === 0} onClick={prev}>
            Back
          </NavBtn>
          <NavBtn disabled={idx === total - 1} onClick={next}>
            Next
          </NavBtn>
        </div>

        <span className="absolute left-1/2 -translate-x-1/2 bg-black text-white
                         text-sm font-semibold px-6 py-2 rounded-md shadow">
          Question {idx + 1} of {total}
        </span>
      </div>
    </footer>
  );
}

/* ---------------------- QUESTION CARD ---------------------- */
function QuestionCard({ qIndex, data, answers, setAnswers }) {
  const choose = (i) => setAnswers({ ...answers, [qIndex]: i });
  return (
    <div>
      <ReviewBanner num={qIndex + 1} />
      <ul>
        {data.choices.map((txt, idx) => (
          <Choice
            key={idx}
            label={String.fromCharCode(65 + idx)}
            text={txt}
            active={answers[qIndex] === idx}
            onClick={() => choose(idx)}
          />
        ))}
      </ul>
    </div>
  );
}

/* ---------------------- SMALL PIECES (unchanged visuals) ---------------------- */
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
      <span className="flex-1 text-left text-[15px] md:text-[16px] leading-snug">
        {text}
      </span>
    </button>
  </li>
);

const NavBtn = ({ children, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`h-[38px] min-w-[80px] px-6 rounded-full text-sm font-semibold shadow transition-colors
      ${disabled ? "bg-gray-300 text-white cursor-default" : "bg-[#324DC7] text-white hover:bg-[#2B43B3]"}`}
  >
    {children}
  </button>
);

const DashLine = ({ className = "" }) => (
  <div
    className={`h-[2px] w-full ${className}`}
    style={{
      backgroundImage:
        "repeating-linear-gradient(to right,#FFD54F 0 16px,transparent 16px 19px,#5CA9E6 19px 35px,transparent 35px 38px,#9CA3AF 38px 54px,transparent 54px 57px)",
    }}
  />
);
