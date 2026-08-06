import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckIcon,
  ArrowRightIcon,
  PersonIcon,
  RocketIcon,
  LightningBoltIcon,
  ChevronDownIcon,
  InfoCircledIcon,
  ResetIcon,
  GlobeIcon,
} from "@radix-ui/react-icons";
import {
  AnimatedPage,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";
import Grainient from "@/components/Grainient";

interface Criterion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof PersonIcon;
}

const CRITERIA_ITEMS: Criterion[] = [
  {
    id: "student_status",
    title: "Current Student or Recent Graduate",
    subtitle: "Enrolled in university/college or graduated within 2 years",
    description:
      "All degree levels and majors (Engineering, Business, Design, Biotech, etc.) are welcome.",
    icon: PersonIcon,
  },
  {
    id: "builder_mindset",
    title: "Aspiring or Active Founder",
    subtitle: "Have an idea, prototype, or building a tech project",
    description:
      "From napkin sketches and Figma mocks to live launched apps, all stages fit right in.",
    icon: RocketIcon,
  },
  {
    id: "time_commitment",
    title: "Commitment to Build & Ship",
    subtitle: "Ready to dedicate 5+ hours weekly to iteration & growth",
    description:
      "Prioritizing builders who code, design, test with users, and join community sprints.",
    icon: LightningBoltIcon,
  },
  {
    id: "community_spirit",
    title: "Collaborative Team Player",
    subtitle: "Willing to help fellow builders and trade feedback",
    description:
      "Thriving on mutual support, co-founder matching, peer reviews, and shared networks.",
    icon: GlobeIcon,
  },
];

const FAQS = [
  {
    q: "What if I don't have a co-founder or team yet?",
    a: "No problem! Many of our strongest teams met through StartX. Our co-founder matching events, showcase channels, and hackathons are designed to help solo builders find technical or business partners.",
  },
  {
    q: "Do I need a fully working prototype to be accepted?",
    a: "Not at all. We accept builders across the entire spectrum — from early ideation and research phase to active MVP testing and revenue-generating startups.",
  },
  {
    q: "Is there any cost, fee, or equity taken by StartX?",
    a: "StartX is 100% free and completely equity-free. We are a student-first incubator ecosystem dedicated purely to supporting student founders.",
  },
  {
    q: "How long does the application review take?",
    a: "Our membership team reviews applications on a rolling basis. You will typically receive an update via email within 48 to 72 hours after submitting.",
  },
];

export default function CheckEligibility() {
  const [checkedIds, setCheckedIds] = useState<string[]>([
    "student_status",
    "builder_mindset",
    "time_commitment",
    "community_spirit",
  ]);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const selectAll = () => {
    setCheckedIds(CRITERIA_ITEMS.map((item) => item.id));
  };

  const resetAll = () => {
    setCheckedIds([]);
  };

  const matchPercentage = Math.round(
    (checkedIds.length / CRITERIA_ITEMS.length) * 100,
  );

  return (
    <AnimatedPage>
      <div className="relative min-h-screen bg-transparent text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Continuous fixed Grainient Shader Background */}
        <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 opacity-40">
          <Grainient
            color1="#0673f9"
            color2="#1e3a8a"
            color3="#000000"
            timeSpeed={0.6}
            colorBalance={0.15}
            warpStrength={2.0}
            warpFrequency={3.5}
            warpSpeed={1.5}
            warpAmplitude={40}
            blendAngle={90}
            blendSoftness={0.2}
            rotationAmount={300}
            noiseScale={2.5}
            grainAmount={0.2}
            grainScale={1.5}
            grainAnimated={true}
            contrast={1.3}
            gamma={1.0}
            saturation={1.2}
            centerX={0}
            centerY={0}
            zoom={0.95}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-16">
          {/* Hero Section Header */}
          <FadeIn>
            <div className="text-center space-y-4 max-w-2xl pt-10 mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
                Am I Eligible for StartX?
              </h1>

              <p className="text-base sm:text-lg text-zinc-400 font-medium leading-relaxed">
                Verify your fit for our student-founder ecosystem in seconds. We
                welcome ambitious builders, developers, and aspiring founders at
                every stage.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-xl shadow-2xl space-y-8">
              {/* Evaluator Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Select the criteria that apply to you
                  </h2>
                </div>

                {/* Quick Controls */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    onClick={selectAll}
                    className="text-xs font-medium text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    onClick={resetAll}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 transition-colors"
                  >
                    <ResetIcon className="w-3 h-3" />
                    Reset
                  </button>
                </div>
              </div>

              {/* Criteria Cards Checklist */}
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CRITERIA_ITEMS.map((item) => {
                  const isChecked = checkedIds.includes(item.id);

                  return (
                    <StaggerItem key={item.id} className="h-full">
                      <div
                        onClick={() => toggleCheck(item.id)}
                        className={`h-full group relative cursor-pointer p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                          isChecked
                            ? "bg-zinc-900/80 border-zinc-700 shadow-md"
                            : "bg-zinc-900/20 border-zinc-800/60 hover:border-zinc-700/80 hover:bg-zinc-900/40"
                        }`}
                      >
                        {/* Custom Radix Checkbox Indicator */}
                        <div
                          className={`mt-1 flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${
                            isChecked
                              ? "bg-[#0673f9] border-[#0673f9] text-white"
                              : "border-zinc-700 bg-zinc-950 group-hover:border-zinc-500"
                          }`}
                        >
                          {isChecked && (
                            <CheckIcon className="w-3.5 h-3.5 stroke-[3]" />
                          )}
                        </div>

                        {/* Card Info */}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-white">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-xs font-medium text-zinc-300">
                            {item.subtitle}
                          </p>
                          <p className="text-[11px] text-zinc-500 leading-relaxed pt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>

              {/* Dynamic Live Status Result Bar */}
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {matchPercentage === 100
                          ? "100% Fit — Ready to Apply!"
                          : matchPercentage >= 50
                            ? `${checkedIds.length} of ${CRITERIA_ITEMS.length} Criteria Met — High Fit`
                            : "Partial Match — Everyone is Welcome to Apply"}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        {matchPercentage === 100
                          ? "You fulfill all core requirements for our incubator community."
                          : "Even if you only meet 1 or 2 criteria, you can still apply and grow with us."}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/apply-membership"
                    className="inline-flex items-center justify-center gap-2 bg-[#0673f9] hover:bg-[#0562d6] text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 shrink-0"
                  >
                    Apply for Membership
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>

                {/* Solid Progress Bar */}
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[#0673f9]"
                    initial={{ width: 0 }}
                    animate={{ width: `${matchPercentage}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Interactive FAQ Accordion */}
          <FadeIn delay={0.2}>
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <InfoCircledIcon className="w-5 h-5 text-[#0673f9]" />
                <h2 className="text-xl font-bold text-white">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="divide-y divide-zinc-900">
                {FAQS.map((faq, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <div key={index} className="py-4 first:pt-0 last:pb-0">
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between gap-4 text-left py-2 text-sm font-semibold text-white hover:text-zinc-300 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="shrink-0 text-zinc-400"
                        >
                          <ChevronDownIcon className="w-4 h-4" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="pt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* Final CTA Bar */}
          <FadeIn delay={0.3}>
            <div className="text-center space-y-6 pt-2">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Ready to Start Building?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Join hundreds of student builders turning bold ideas into real
                  ventures.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/apply-membership"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0673f9] hover:bg-[#0562d6] text-white font-semibold text-xs sm:text-sm px-8 py-3.5 rounded-xl transition-all duration-200"
                >
                  Apply for Membership
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  to="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-zinc-300 hover:text-white font-medium text-xs sm:text-sm px-8 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </AnimatedPage>
  );
}
