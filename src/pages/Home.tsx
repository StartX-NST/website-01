import {
  ArrowRight,
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  TrendingUp,
  Sparkles,
  Maximize2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import { AnimatedPage, FadeIn } from "@/components/animations";
import { useAuth } from "@/contexts/AuthContext";
import { BGPattern } from "@/components/ui/bg-pattern";
import Grainient from "@/components/Grainient";

// CUSTOMIZABLE HERO BACKGROUND IMAGE URL
// Replace this link with your own 3D asset render or graphic URL!
const HERO_BG_IMAGE_URL = "https://ik.imagekit.io/yatharth/STAR-BG.png";

// CUSTOMIZABLE MOUNTAIN BACKGROUND IMAGE FOR STEPS TO REGISTER
// Replace this link with your own mountain rendering or image URL!
const REGISTRATION_STEPS_BG_IMAGE_URL =
  "https://ik.imagekit.io/yatharth/STEPS.png";

// CUSTOMIZABLE FINAL CTA BACKGROUND IMAGE
const FINAL_CTA_BG_IMAGE_URL = "https://ik.imagekit.io/yatharth/STAR-BG.png";

// Premium Scroll-linked Word-by-word Reveal Text
function ScrollRevealText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = (index + 1) / words.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

        return (
          <motion.span
            key={index}
            style={{ opacity }}
            className="inline-block mr-[0.25em] transition-opacity duration-75"
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}

// Premium Scroll-linked word-by-word Split Heading (White / Muted Gray or Custom Accent transition)
function ScrollRevealHeading({
  text1,
  text2,
  className = "",
  text2ColorClass = "text-neutral-500",
}: {
  text1: string;
  text2: string;
  className?: string;
  text2ColorClass?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.55"],
  });

  const words1 = text1.split(" ");
  const words2 = text2.split(" ");
  const totalLength = words1.length + words2.length;

  return (
    <div ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words1.map((word, index) => {
        const start = index / totalLength;
        const end = (index + 1) / totalLength;
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

        return (
          <motion.span
            key={`h1-${index}`}
            style={{ opacity }}
            className="inline-block mr-[0.25em] text-white transition-opacity duration-75"
          >
            {word}
          </motion.span>
        );
      })}
      {words2.map((word, index) => {
        const overallIndex = words1.length + index;
        const start = overallIndex / totalLength;
        const end = (overallIndex + 1) / totalLength;
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

        return (
          <motion.span
            key={`h2-${index}`}
            style={{ opacity }}
            className={`inline-block mr-[0.25em] ${text2ColorClass} transition-opacity duration-75`}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}

const features = [
  {
    tag: "COLLABORATION",
    title: "Post Your Startup Idea",
    description:
      "Share your idea with the StartX community and find co-founders, developers, designers, or marketers.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    href: "/showcase",
  },
  {
    tag: "COMMUNITY",
    title: "Join Startup Teams",
    description:
      "Browse ongoing projects, apply for open positions, and help student-led startups grow faster.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
    href: "/showcase",
  },
  {
    tag: "INFRASTRUCTURE",
    title: "Roadmap & Progress",
    description:
      "Follow a step-by-step pathway from validation to launch with custom milestones and tasks.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    href: "/learn",
  },
  {
    tag: "GUIDANCE",
    title: "On-Demand Mentorship",
    description:
      "Schedule direct sessions with experienced founders, technical leaders, and GTM specialists.",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80",
    href: "/events",
  },
  {
    tag: "EDUCATION",
    title: "Workshops & Hackathons",
    description:
      "Participate in hands-on building sprints, dev workshops, and competitive team hackathons.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    href: "/events",
  },
  {
    tag: "RESOURCES",
    title: "Pathway to Funding",
    description:
      "Apply for micro-grants, practice investor pitches, and unlock direct paths to startup funding.",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80",
    href: "/opportunities",
  },
];

const BUILDER_VALUES = [
  {
    num: "01",
    phase: "Action Over Theory",
    sub: "Build, don't just learn",
    status: "Core Value",
    body: "Turn ideas into real startups — prototypes, users, traction. We believe shipping code and talking to users beats any lecture hall syllabus.",
    tags: ["Real MVPs", "Active Users", "Prototype Sprints"],
  },
  {
    num: "02",
    phase: "Co-Founder Matching",
    sub: "Find your tribe",
    status: "Community",
    body: "Meet founders, developers, designers, and marketers. Build alongside other ambitious builders who challenge and inspire you every day.",
    tags: ["Co-Founders", "Designers & Devs", "Hackathons"],
  },
  {
    num: "03",
    phase: "Real Experience",
    sub: "Learn from builders",
    status: "Mentorship",
    body: "Workshops, mentor sessions, and hands-on guidance from experienced startup operators who have been in your shoes and shipped real products.",
    tags: ["Experienced Mentors", "Direct Q&A", "Founder Talks"],
  },
  {
    num: "04",
    phase: "High Visibility",
    sub: "Get opportunities",
    status: "Growth",
    body: "Showcase your startup to the community, join demo days, secure startup internships, and unlock direct access to top technology networks.",
    tags: ["Demo Days", "Startup Roles", "Industry Exposure"],
  },
  {
    num: "05",
    phase: "Capital Pathway",
    sub: "Funding & support",
    status: "Funding",
    body: "Prepare your pitch, practice with experienced founders, and unlock pathways to micro-grants, startup competitions, and venture capitalists.",
    tags: ["Micro-grants", "Investor Pitching", "VC Connects"],
  },
  {
    num: "06",
    phase: "Rapid Iteration",
    sub: "Safe space to fail",
    status: "Mindset",
    body: "Fail fast, iterate quickly, and learn without pressure or judgment. StartX is a builder sandbox designed to help you experiment and refine.",
    tags: ["Zero Pressure", "Rapid Pivoting", "Experimental Labs"],
  },
];

const STATUS_COLORS: Record<string, string> = {
  "Core Value": "#10b981", // Emerald
  Community: "#3b82f6", // Blue
  Mentorship: "#8b5cf6", // Purple
  Growth: "#facc15", // Amber
  Funding: "#ec4899", // Pink
  Mindset: "#64748b", // Slate
};

/* ── SVG Radial Dial ── */
function RadialDial({ activeIndex }: { activeIndex: number }) {
  const cx = 300,
    cy = 300;
  const R = 255; // larger tick outer radius
  const TOTAL = 150; // ticks for denser ring
  const PER = TOTAL / BUILDER_VALUES.length;
  const CENTER_R = 72;

  return (
    <svg viewBox="0 0 600 600" className="w-full h-full">
      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth={1}
      />

      {/* Tick marks — cumulative & uneven lengths */}
      {Array.from({ length: TOTAL }, (_, i) => {
        const seg = Math.floor(i / PER);
        const isCumulative = seg <= activeIndex;
        const isCurrentSeg = seg === activeIndex;

        // Define uneven rhythm: every 10th is major, every 5th is minor, others are small
        const isMajor = i % 10 === 0;
        const isMinor = i % 5 === 0;

        let baseLen = isMajor ? 34 : isMinor ? 24 : 14;
        if (!isCumulative) baseLen *= 0.6; // Shorter for future segments;
        if (isCurrentSeg) baseLen *= 1.1; // Slightly longer for active segment;

        const deg = -90 + (i / TOTAL) * 360;
        const rad = (deg * Math.PI) / 180;

        const x1 = cx + (R - baseLen) * Math.cos(rad);
        const y1 = cy + (R - baseLen) * Math.sin(rad);
        const x2 = cx + R * Math.cos(rad);
        const y2 = cy + R * Math.sin(rad);

        const strokeColor = isCumulative
          ? isCurrentSeg
            ? "rgba(255,255,255,0.95)"
            : "rgba(255,255,255,0.55)"
          : "rgba(255,255,255,0.10)";

        const sw = isMajor ? 2.5 : isMinor ? 2.5 : 2.5;

        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            style={{
              stroke: strokeColor,
              strokeWidth: isCumulative ? sw : sw * 0.5,
              transition:
                "stroke 0.5s ease, stroke-width 0.5s ease, x1 0.5s ease, y1 0.5s ease",
            }}
          />
        );
      })}

      {/* Year labels around ring */}
      {BUILDER_VALUES.map((m, i) => {
        const deg = -90 + (i + 0.5) * (360 / BUILDER_VALUES.length);
        const rad = (deg * Math.PI) / 180;
        const lr = R + 38;
        const x = cx + lr * Math.cos(rad);
        const y = cy + lr * Math.sin(rad);
        const isActive = i === activeIndex;
        return (
          <text
            key={m.num}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={isActive ? "13" : "11"}
            fontWeight={isActive ? "900" : "400"}
            style={{
              fill: isActive
                ? "rgba(255,255,255,0.95)"
                : "rgba(255,255,255,0.22)",
              transition: "fill 0.5s ease, font-size 0.5s ease",
              fontFamily: "inherit",
              letterSpacing: "1.5px",
            }}
          >
            {m.num}
          </text>
        );
      })}

      <circle
        cx={cx}
        cy={cy}
        r={CENTER_R}
        fill="#0d0d0d"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={1}
      />
      <text
        x={cx}
        y={cy - 9}
        textAnchor="middle"
        fontSize="10"
        letterSpacing="2"
        style={{ fill: "rgba(255,255,255,0.4)", fontFamily: "inherit" }}
      >
        {BUILDER_VALUES[activeIndex].num}
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        style={{ fill: "rgba(255,255,255,0.85)", fontFamily: "inherit" }}
      >
        {BUILDER_VALUES[activeIndex].phase}
      </text>
    </svg>
  );
}

/* ── Left accordion row ── */
function BuilderValueRow({
  m,
  isActive,
  onClick,
}: {
  m: (typeof BUILDER_VALUES)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const dot = STATUS_COLORS[m.status] ?? "#3f3f46";
  const words = m.body.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.015,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 4 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut" as const,
      },
    },
  };

  const tagContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
  };

  const tagItemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border-b border-zinc-900 transition-colors duration-300 ${isActive ? "bg-zinc-900/70" : "hover:bg-zinc-900/30"}`}
    >
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: dot }}
            />
            <span
              className={`text-[15px] font-semibold tracking-tight transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-500"}`}
            >
              {m.phase}
            </span>
          </div>
          <span
            className={`text-[12px] pl-4 font-medium transition-colors duration-300 ${isActive ? "text-zinc-400" : "text-zinc-700"}`}
          >
            {m.sub}
          </span>
        </div>
        <div className="flex items-center gap-3 ml-4">
          <span className="text-[11px] tracking-[0.3em] text-zinc-700 font-bold">
            {m.num}
          </span>
          <motion.div
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isActive ? "#ffffff" : "#52525b"}
              strokeWidth="2.5"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 flex flex-col gap-4 ml-5">
              <motion.p
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-[13px] leading-[1.75] text-zinc-400 font-medium flex flex-wrap"
              >
                {words.map((word, idx) => (
                  <motion.span
                    key={idx}
                    variants={wordVariants}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
              <motion.div
                variants={tagContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-1.5"
              >
                {m.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    variants={tagItemVariants}
                    className="text-[9px] tracking-widest uppercase font-bold px-2.5 py-1 border border-zinc-800 text-zinc-500 rounded-full inline-block"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EverythingYouBuildSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.25", "end 0.35", "end 0.05"],
  });

  // Smoothly transform background color from dark (#000000) to electric blue (#0673f9) and back to dark
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["#000000", "#0673f9", "#0673f9", "#000000"],
  );

  // Subtext color transition for optimal contrast and readability
  const subtextColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [
      "rgba(163, 163, 163, 1)",
      "rgba(255, 255, 255, 0.95)",
      "rgba(255, 255, 255, 0.95)",
      "rgba(163, 163, 163, 1)",
    ],
  );

  // Ambient Radial Glow opacity mapping
  const ambientGlowOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.6, 0.6, 0],
  );

  return (
    <motion.section
      ref={sectionRef}
      style={{ backgroundColor }}
      className="relative py-28 md:py-36 px-6 md:px-12 z-10 transition-colors duration-500 ease-out"
    >
      {/* Ambient Glow Overlay */}
      <motion.div
        style={{ opacity: ambientGlowOpacity }}
        className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.18),transparent_70%)] overflow-hidden"
      />

      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start relative z-10">
        {/* Left Side: Sticky Header with Scroll Reveal */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit flex flex-col gap-6">
          <ScrollRevealText
            className="text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight"
            text="Everything you need to build"
          />
          <motion.p
            style={{ color: subtextColor }}
            className="text-lg leading-relaxed font-medium mt-2 transition-colors duration-300"
          >
            From ideation to launch, we provide the tools, community, and
            guidance to turn your startup dreams into reality.
          </motion.p>
        </div>

        {/* Right Side: Features Cards Stack */}
        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: index * 0.05,
              }}
              className="group relative w-full rounded-[2rem] md:rounded-[2.5rem] bg-[#f2f4f7] border border-white/30 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[0_16px_45px_rgba(0,0,0,0.25)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Left Side Content */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase block mb-1">
                    {feature.tag}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-600 font-medium leading-relaxed mb-6 max-w-md">
                    {feature.description}
                  </p>
                </div>

                {/* CTA Link */}
                <div>
                  <Link
                    to={feature.href}
                    className="inline-flex items-center gap-2 group/btn"
                  >
                    <span className="bg-black text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-colors group-hover/btn:bg-neutral-800">
                      Explore
                    </span>
                    <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover/btn:translate-x-1 shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right Side Image */}
              <div className="w-full md:w-[180px] h-[130px] rounded-2xl overflow-hidden shrink-0 shadow-md border border-neutral-200">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default function Home() {
  const { isAuthenticated } = useAuth();

  const [activeBuilderIndex, setActiveBuilderIndex] = useState(0);

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-black relative">
        {/* Full-Screen Landing Hero Section without Card Layout */}
        <section className="relative w-full min-h-[92vh] md:min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 sm:px-12 md:px-20 z-10 bg-black overflow-hidden border-b border-zinc-900">
          {/* Background Grainient Canvas Covering Entire Screen Width including Far Left */}
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
            {/* Grainient Canvas stretching 100% full width and height */}
            <div className="absolute inset-0 w-full h-full opacity-100">
              <Grainient
                color1="#0673f9"
                color2="#3612c8"
                color3="#0f46a1"
                timeSpeed={0.85}
                colorBalance={0.11}
                warpStrength={2.75}
                warpFrequency={4.5}
                warpSpeed={2}
                warpAmplitude={50}
                blendAngle={92}
                blendSoftness={0.18}
                rotationAmount={500}
                noiseScale={2.75}
                grainAmount={0.26}
                grainScale={2}
                grainAnimated={false}
                contrast={1.5}
                gamma={1}
                saturation={1}
                centerX={0}
                centerY={0}
                zoom={0.9}
              />
            </div>

            {/* Smooth Top & Bottom Fade Out into black background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
          </div>

          {/* Hero Main Content */}
          <div className="max-w-7xl mx-auto w-full flex flex-col justify-between relative z-10 py-6 md:py-12">
            <FadeIn>
              <div className="flex flex-col gap-6 md:gap-8 max-w-4xl">
                {/* Main Hero Headline */}
                <div className="flex flex-col gap-2 md:gap-3">
                  <h1 className="text-[4.2rem] sm:text-[6.5rem] md:text-[8.5rem] lg:text-[10.5rem] font-normal text-white leading-[0.85] tracking-tighter">
                    Build
                  </h1>
                  <h1 className="text-[4.2rem] sm:text-[6.5rem] md:text-[8.5rem] lg:text-[10.5rem] font-normal text-white leading-[0.85] tracking-tighter">
                    to launch
                  </h1>
                </div>

                {/* Expanded Copy detailing Build to Launch */}
                <p className="text-md sm:text-lg md:text-xl text-neutral-300 font-normal max-w-2xl leading-relaxed mt-2">
                  Turn your boldest ideas into venture-backed startups. StartX
                  equips student builders with hands-on development sprints,
                  team matching, expert mentorship, and direct capital access.
                </p>
              </div>
            </FadeIn>

            {/* Bottom Row: CTA Button (Preserved structure & button action) */}
            <FadeIn delay={0.15}>
              <div className="mt-12 md:mt-16">
                <Link
                  to="/check-eligibility"
                  className="inline-flex items-center gap-2 group"
                >
                  <span className="bg-white text-black px-7 py-3.5 md:py-4 rounded-full text-sm md:text-base font-semibold transition-colors group-hover:bg-neutral-200 shadow-[0_4px_25px_rgba(255,255,255,0.2)]">
                    Check eligibility
                  </span>
                  <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0 shadow-[0_4px_25px_rgba(255,255,255,0.2)]">
                    <ArrowRight className="w-5 h-5 md:w-6 h-6" />
                  </span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Dark Sub-Hero Section */}
        <section className="relative w-full py-16 md:py-24 px-6 md:px-12 z-10 bg-black">
          <div className="max-w-7xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="max-w-4xl">
                <ScrollRevealText
                  className="text-3xl md:text-5xl lg:text-6xl font-normal text-neutral-200 tracking-tight leading-snug"
                  text="Building something that is bigger than ourselves and creating tools and products that will have a global impact, for good."
                />
                <div className="mt-10 md:mt-14">
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group"
                  >
                    <span className="text-xs md:text-sm font-semibold tracking-wider uppercase">
                      Learn More
                    </span>
                    <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0">
                      <ArrowRight className="w-4 h-4 text-black" />
                    </span>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* How It Works / Steps to Register Infographic Section */}
        <section className="relative w-full py-16 px-6 md:px-12 z-10 bg-black">
          <div className="max-w-8xl mx-auto">
            <FadeIn>
              {/* Large Rounded Container Card - styled exactly like hero section card */}
              <div className="relative w-full rounded-[2.5rem] md:rounded-[3.5rem] bg-[#f2f4f7] border border-white/20 p-8 md:p-12 lg:p-16 overflow-hidden min-h-[580px] lg:h-[700px] flex flex-col justify-between shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
                {/* Background Graphic Image - covers whole card */}
                <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
                  <motion.img
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    src={REGISTRATION_STEPS_BG_IMAGE_URL}
                    alt="Mountain background"
                    className="w-full h-full object-cover opacity-95 transition-all duration-300"
                  />
                  {/* Subtle white fade overlay from sides to preserve text contrast, leaving center clear */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f2f4f7] via-[#f2f4f7]/60 to-[#f2f4f7] w-full" />
                </div>

                {/* SVG Interactive Bending Connecting Lines (visible on desktop) */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0"
                  viewBox="0 0 1000 700"
                  fill="none"
                >
                  {/* Line Step 01 */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                    d="M 280 280 L 380 280 L 420 330"
                    stroke="#1f2937"
                    strokeWidth="1.5"
                  />
                  <circle cx="280" cy="280" r="3.5" fill="#000" />
                  <rect
                    x="415"
                    y="325"
                    width="10"
                    height="10"
                    rx="2.5"
                    fill="#000"
                  />

                  {/* Line Step 02 */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                    d="M 720 300 L 620 300 L 580 340"
                    stroke="#1f2937"
                    strokeWidth="1.5"
                  />
                  <circle cx="720" cy="300" r="3.5" fill="#000" />
                  <rect
                    x="575"
                    y="335"
                    width="10"
                    height="10"
                    rx="2.5"
                    fill="#000"
                  />

                  {/* Line Step 03 */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                      delay: 0.4,
                    }}
                    d="M 280 500 L 380 500 L 420 440"
                    stroke="#1f2937"
                    strokeWidth="1.5"
                  />
                  <circle cx="280" cy="500" r="3.5" fill="#000" />
                  <rect
                    x="415"
                    y="435"
                    width="10"
                    height="10"
                    rx="2.5"
                    fill="#000"
                  />

                  {/* Line Step 04 */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    d="M 720 520 L 620 520 L 580 450"
                    stroke="#1f2937"
                    strokeWidth="1.5"
                  />
                  <circle cx="720" cy="520" r="3.5" fill="#000" />
                  <rect
                    x="575"
                    y="445"
                    width="10"
                    height="10"
                    rx="2.5"
                    fill="#000"
                  />
                </svg>

                {/* Steps Information Cards - 3 Column Layout (Left, Empty Center for Mountain Peak, Right) */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 w-full h-full mt-8 lg:mt-0 flex-grow">
                  {/* Left Column: Steps 1 & 3 */}
                  <div className="flex flex-col justify-between h-full py-4 lg:py-8 gap-8 lg:gap-0">
                    {/* Step 1 */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.1,
                      }}
                      className="lg:max-w-[280px] flex flex-col gap-2"
                    >
                      <div className="w-full border-t border-black/10 pt-4 lg:border-none lg:pt-0">
                        <span className="text-3xl font-bold font-mono text-black leading-none block mb-1">
                          01
                        </span>
                        <h4 className="text-lg font-bold text-black mb-1">
                          Register & Profile
                        </h4>
                        <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                          Create your builder account and tell us about your
                          background, skills, and interest areas.
                        </p>
                      </div>
                    </motion.div>

                    {/* Step 3 */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.4,
                      }}
                      className="lg:max-w-[280px] flex flex-col gap-2"
                    >
                      <div className="w-full border-t border-black/10 pt-4 lg:border-none lg:pt-0">
                        <span className="text-3xl font-bold font-mono text-black leading-none block mb-1">
                          03
                        </span>
                        <h4 className="text-lg font-bold text-black mb-1">
                          Match & Build Teams
                        </h4>
                        <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                          Connect with co-founders, developers, and designers
                          inside the community to assemble your team.
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Column: Empty space so mountain peak is fully visible and not overlapped by text */}
                  <div className="hidden lg:block" />

                  {/* Right Column: Steps 2 & 4 */}
                  <div className="flex flex-col justify-between h-full py-4 lg:py-8 gap-8 lg:gap-0">
                    {/* Step 2 */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.25,
                      }}
                      className="lg:max-w-[280px] flex flex-col gap-2"
                    >
                      <div className="w-full border-t border-black/10 pt-4 lg:border-none lg:pt-0">
                        <span className="text-3xl font-bold font-mono text-black leading-none block mb-1">
                          02
                        </span>
                        <h4 className="text-lg font-bold text-black mb-1">
                          Submit Startup Idea
                        </h4>
                        <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                          Share your concept, specify what team roles you need,
                          and outline your development goals.
                        </p>
                      </div>
                    </motion.div>

                    {/* Step 4 */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.55,
                      }}
                      className="lg:max-w-[280px] flex flex-col gap-2"
                    >
                      <div className="w-full border-t border-black/10 pt-4 lg:border-none lg:pt-0">
                        <span className="text-3xl font-bold font-mono text-black leading-none block mb-1">
                          04
                        </span>
                        <h4 className="text-lg font-bold text-black mb-1">
                          Apply & Accelerate
                        </h4>
                        <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                          Apply for active opportunities, unlock equity-free
                          grants, and accelerate your startup launch.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Continuous Grid Background Pattern for all sections below hero */}
        <div className="absolute inset-0 top-[100vh] z-0">
          <BGPattern
            variant="grid"
            mask="fade-edges"
            size={60}
            fill="rgba(255, 255, 255, 0.08)"
          />
        </div>

        {/* ================= KEY FEATURES ================= */}
        <EverythingYouBuildSection />

        {/* ================= WHY JOIN STARTX ================= */}
        <section className="relative pt-44 pb-32 px-6 md:px-12 z-10 bg-black border-t border-zinc-900/50">
          <div className="max-w-8xl mx-auto">
            <ScrollRevealHeading
              className="text-[5.5vw] md:text-[4.5vw] font-normal leading-[1.1] tracking-[-0.04em] mb-28 max-w-[95%]"
              text1="Designed for builders. A launchpad of opportunities, founder network, and operational velocity"
              text2="at StartX, from validating your first raw idea to raising institutional venture capital."
            />

            {/* Split layout (Accordion Left, Radial Dial Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 min-h-[600px] items-start border-t border-zinc-900 pt-16">
              {/* LEFT Column: Content & Accordion */}
              <div className="flex flex-col md:border-r border-zinc-900 pr-0 lg:pr-10">
                <div className="pb-10 max-w-xl">
                  <h3 className="text-[32px] font-semibold tracking-tight text-white leading-tight mb-4">
                    Why StartX?
                  </h3>
                  <p className="text-[14px] text-zinc-500 font-medium max-w-sm">
                    An ecosystem designed to support student founders at every
                    point in their journey.
                  </p>
                </div>

                <div className="flex flex-col border-t border-zinc-900">
                  {BUILDER_VALUES.map((m, i) => (
                    <BuilderValueRow
                      key={m.num}
                      m={m}
                      isActive={activeBuilderIndex === i}
                      onClick={() => setActiveBuilderIndex(i)}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT Column: Radial Dial */}
              <div className="relative flex flex-col items-center justify-center p-4 md:p-8 lg:sticky lg:top-32 h-auto z-10">
                <div className="absolute top-0 left-0">
                  <p className="text-[14px] font-semibold text-white uppercase tracking-tight">
                    {BUILDER_VALUES[activeBuilderIndex].phase}
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-1 tracking-widest uppercase font-bold">
                    {BUILDER_VALUES[activeBuilderIndex].status}
                  </p>
                </div>

                <div className="w-full max-w-[480px] md:max-w-[500px] aspect-square mt-12">
                  <RadialDial activeIndex={activeBuilderIndex} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MENTOR-GUIDED GROWTH STAGES (ASYMMETRIC 3-COLOR BENTO GRID ROADMAP) ================= */}
        <section className="relative pt-36 pb-32 px-6 md:px-12 z-10 bg-black border-t border-white/10">
          <div className="max-w-8xl mx-auto">
            {/* Section Header */}
            <div className="max-w-4xl mb-16">
              <ScrollRevealHeading
                className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-tight mb-4"
                text1="Your roadmap from"
                text2="idea to launch."
                text2ColorClass="text-[#0673f9]"
              />
              <p className="text-base md:text-lg text-white/70 font-normal max-w-2xl leading-relaxed">
                Follow an interactive, proven pathway powered by founder
                analytics, 1-on-1 mentorship, and venture scaling systems.
              </p>
            </div>

            {/* Asymmetric 3-Column Bento Grid - Strict 3 Colors (Black, White, #0673f9), No Icons, No Gradients, font-normal Headings */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {/* CARD 1: Ideation & Validation (Electric Blue Theme #0673f9) */}
              <div className="group relative rounded-[2.5rem] bg-[#0673f9] text-white p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-2xl min-h-[560px] border border-[#0673f9]">
                {/* Top Content */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-normal text-white tracking-tight leading-tight">
                    Ideation & Validation
                  </h3>
                  <p className="text-sm text-white/80 font-normal leading-relaxed mt-3 max-w-sm">
                    Refine your concept, test market demand, and prove
                    problem-solution fit with active student feedback.
                  </p>
                </div>

                {/* Interactive Inner Widget (Solid White Card) */}
                <div className="mt-10">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="rounded-2xl bg-white text-black p-6 shadow-2xl transition-transform duration-300"
                  >
                    {/* Header Row */}
                    <div className="pb-4 mb-4 border-b border-black/10">
                      <h4 className="text-xs font-normal text-[#0673f9] tracking-wider uppercase">
                        StartX Accelerator
                      </h4>
                      <p className="text-xs text-black/70 font-normal mt-1">
                        Cohort Traction Metrics:
                      </p>
                    </div>

                    {/* Metrics Stack */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xl md:text-2xl font-normal text-[#0673f9] font-mono">
                          82%
                        </span>
                        <span className="text-xs text-black/80 font-normal">
                          Prototype Velocity
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xl md:text-2xl font-normal text-[#0673f9] font-mono">
                          62%
                        </span>
                        <span className="text-xs text-black/80 font-normal">
                          Problem Validation Score
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xl md:text-2xl font-normal text-[#0673f9] font-mono">
                          +2%
                        </span>
                        <span className="text-xs text-black/80 font-normal">
                          Value Proposition Index
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* CARD 2: Co-Founder & Team Match (Solid White Theme with Visible Orbit Curves, No Hover) */}
              <div className="relative rounded-[2.5rem] bg-white text-black p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-2xl min-h-[560px] border border-white">
                {/* Top Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-normal text-black tracking-tight leading-tight">
                    Co-Founder & Team Match
                  </h3>
                  <p className="text-sm text-black/70 font-normal leading-relaxed mt-3 max-w-sm">
                    Connect with ambitious developers, UI/UX designers, and
                    marketers to build your dream founding team.
                  </p>
                </div>

                {/* Inner Widget with Clearly Visible Concentric Orbit Curves & Static Badges (No Hover) */}
                <div className="relative z-10 mt-6 flex flex-col gap-4">
                  {/* Floating Tags Grid over Visible Concentric Orbit Curves */}
                  <div className="relative h-44 w-full flex items-center justify-center">
                    {/* SVG Concentric Orbit Rings - Clearly Visible */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 350 180"
                      fill="none"
                    >
                      <ellipse
                        cx="175"
                        cy="90"
                        rx="150"
                        ry="75"
                        stroke="rgba(0, 0, 0, 0.22)"
                        strokeWidth="1.5"
                        strokeDasharray="6 6"
                      />
                      <ellipse
                        cx="175"
                        cy="90"
                        rx="95"
                        ry="45"
                        stroke="rgba(6, 115, 249, 0.35)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                    </svg>

                    <span className="absolute top-1 right-2 bg-black text-white px-3.5 py-1.5 rounded-full text-xs font-normal">
                      Co-Founder Matching
                    </span>

                    <span className="absolute top-10 left-1 bg-[#0673f9] text-white px-3.5 py-1.5 rounded-full text-xs font-normal">
                      Lead Developer
                    </span>

                    <span className="absolute top-16 right-8 bg-black text-white px-3.5 py-1.5 rounded-full text-xs font-normal">
                      UI/UX Designer
                    </span>

                    <span className="absolute bottom-2 left-2 bg-black text-white px-3.5 py-1.5 rounded-full text-xs font-normal">
                      Growth Marketer
                    </span>

                    <span className="absolute bottom-4 right-1 bg-[#0673f9] text-white px-3.5 py-1.5 rounded-full text-xs font-normal">
                      Domain Expert
                    </span>
                  </div>

                  {/* AI Prompt Box Below (Static - No Hover Effect) */}
                  <div className="bg-black text-white p-5 rounded-2xl shadow-xl">
                    <h4 className="text-xs font-normal text-[#0673f9] uppercase tracking-wider mb-1">
                      StartX Incubator
                    </h4>
                    <p className="text-xs text-white/90 font-normal leading-relaxed">
                      What specific skills and values are you looking for in
                      your ideal co-founder?
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 3: Venture Launch & Capital (Solid Black Theme) */}
              <div className="group relative rounded-[2.5rem] bg-black text-white p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-2xl min-h-[560px] border border-white/20">
                {/* Top Content */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-normal text-white tracking-tight leading-tight">
                    Venture Launch & Capital
                  </h3>
                  <p className="text-sm text-white/70 font-normal leading-relaxed mt-3 max-w-sm">
                    Prepare your pitch, unlock equity-free micro-grants, and
                    gain direct access to angel investors and VCs.
                  </p>
                </div>

                {/* Interactive Inner Widget (Mention & Feedback Card) */}
                <div className="mt-8 flex flex-col gap-4">
                  {/* Floating Mention Tag */}
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white text-black p-4 rounded-2xl text-xs font-normal shadow-md transition-transform duration-300 border border-white"
                  >
                    <span className="text-[#0673f9] font-normal">
                      @StartXVentures
                    </span>{" "}
                    Remind me of our upcoming Demo Day pitch schedule?
                  </motion.div>

                  {/* Bottom Interactive Feedback Card */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white text-black p-6 rounded-2xl shadow-xl transition-transform duration-300 border border-white"
                  >
                    <h4 className="text-xs font-normal text-[#0673f9] uppercase tracking-wider mb-1">
                      StartX Ventures
                    </h4>
                    <h4 className="text-sm font-normal text-black mb-3">
                      How to build a venture-ready pitch deck
                    </h4>

                    {/* Progress Bar */}
                    <div className="h-1.5 bg-black/10 rounded-full w-full overflow-hidden mb-3">
                      <motion.div
                        className="h-full bg-[#0673f9] rounded-full"
                        animate={{ width: ["15%", "85%", "15%"] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>

                    <p className="text-[11px] font-normal text-black/60">
                      Investor Readiness & Traction Metrics
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA & CONNECTED FOOTER ================= */}
        {!isAuthenticated && (
          <section className="relative pt-32 pb-0 px-6 md:px-12 z-10 bg-black min-h-[90vh] flex flex-col justify-between overflow-hidden border-t border-zinc-900/50">
            {/* Background Graphic Image - covers the whole CTA + Footer section */}
            <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
              <img
                src={FINAL_CTA_BG_IMAGE_URL}
                alt="CTA and Footer background"
                className="w-full h-full object-cover opacity-60 filter blur-[2px] scale-105"
              />
              {/* Dark overlay to ensure white text is highly legible */}
              <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* CTA Content (Top Part) */}
            <div className="relative text-center z-10 max-w-4xl mx-auto py-12 md:py-16">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal text-white mb-6 leading-none tracking-tighter">
                Ready to build <br className="hidden md:block" />
                something great?
              </h2>
              <p className="text-base md:text-lg text-neutral-300 font-normal mb-8 leading-relaxed max-w-xl mx-auto">
                Join hundreds of student founders building the next generation
                of startups. No equity. No fees. Just builders helping builders.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/check-eligibility"
                  className="inline-flex items-center gap-2 group"
                >
                  <span className="bg-white text-black px-7 py-3.5 rounded-full text-sm font-semibold transition-colors hover:bg-neutral-100">
                    Check eligibility
                  </span>
                  <span className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0">
                    <ArrowRight className="w-4 h-4 md:w-5 h-5" />
                  </span>
                </Link>

                <Link
                  to="/showcase"
                  className="inline-flex items-center justify-center text-white font-semibold text-sm px-6 py-3.5 rounded-full border border-white/20 hover:bg-white/5 transition-all duration-300"
                >
                  See projects
                </Link>
              </div>
            </div>

            {/* Connected White Footer Card (Bottom Part) */}
            <div className="relative z-10 max-w-7xl mx-auto w-full bg-white text-black p-8 md:p-12 lg:p-16 rounded-t-[2.5rem] md:rounded-t-[3.5rem] rounded-b-none border-t border-x border-neutral-200/50 shadow-[0_-12px_40px_rgba(0,0,0,0.05)] mt-16 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
                {/* Brand section */}
                <div className="flex flex-col space-y-4">
                  <Link to="/" className="flex items-center space-x-2">
                    <img
                      src="/image.png"
                      alt="StartX Logo"
                      className="h-8 w-auto brightness-0"
                    />
                  </Link>
                  <p className="text-sm leading-relaxed text-neutral-500 font-medium">
                    A student-founder ecosystem for learning, building, and
                    shipping. Join 1000+ builders creating the future.
                  </p>
                </div>

                {/* Footer link sections */}
                {[
                  {
                    title: "About Us",
                    links: [
                      { label: "Our Mission", href: "#about" },
                      { label: "Success Stories", href: "/showcase" },
                      { label: "Partner With Us", href: "#partner" },
                      { label: "Careers", href: "#careers" },
                    ],
                  },
                  {
                    title: "Platform",
                    links: [
                      { label: "Events", href: "/events" },
                      { label: "Learn", href: "/learn" },
                      { label: "Showcase", href: "/showcase" },
                      { label: "Opportunities", href: "/opportunities" },
                    ],
                  },
                ].map((section) => (
                  <div key={section.title}>
                    <h4 className="text-black text-sm font-bold uppercase tracking-wider mb-6">
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            to={link.href}
                            className="text-neutral-500 hover:text-black font-medium text-sm transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Contact section */}
                <div>
                  <h4 className="text-black text-sm font-bold uppercase tracking-wider mb-6">
                    Contact Us
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-3 text-neutral-500 font-medium text-sm">
                      <Mail size={16} className="text-neutral-400 shrink-0" />
                      <a
                        href="mailto:startx.ru@newtonschool.co"
                        className="hover:text-black transition-colors"
                      >
                        startx.ru@newtonschool.co
                      </a>
                    </li>
                    <li className="flex items-center space-x-3 text-neutral-500 font-medium text-sm">
                      <MapPin size={16} className="text-neutral-400 shrink-0" />
                      <span>NST, Rishihood University</span>
                    </li>
                  </ul>
                </div>
              </div>

              <hr className="border-t border-neutral-200 my-8" />

              {/* Footer bottom */}
              <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
                {/* Social icons */}
                <div className="flex space-x-6 text-neutral-400">
                  <a
                    href="https://www.instagram.com/startx.nst?igsh=MWlxNWZieHQ1d3ltcg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="hover:text-black transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/startx-nst/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="hover:text-black transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>

                {/* Copyright */}
                <p className="text-neutral-500 font-medium text-center md:text-left">
                  &copy; {new Date().getFullYear()} StartX. All rights reserved.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </AnimatedPage>
  );
}
