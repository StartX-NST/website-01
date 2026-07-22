import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Grainient from "@/components/Grainient";

interface ComingSoonProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  errorCode?: string;
  section?: string;
}

export function ComingSoon({
  title = "Coming Soon",
  message = "We're building something exceptional. This section will be available soon.",
  showHomeButton = true,
  errorCode = "503",
  section = "StartX",
}: ComingSoonProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden bg-black -mt-[1px]">
      {/* Left Panel — Error Code + Grainient Visual */}
      <div className="relative md:w-[42%] min-h-[280px] md:min-h-full flex items-center justify-center overflow-hidden">
        {/* Grainient Background */}
        <div className="absolute inset-0 w-full h-full">
          <Grainient
            color1="#0673f9"
            color2="#3612c8"
            color3="#0f46a1"
            timeSpeed={0.6}
            colorBalance={0.08}
            warpStrength={2.5}
            warpFrequency={4.0}
            warpSpeed={1.5}
            warpAmplitude={55}
            blendAngle={110}
            blendSoftness={0.2}
            rotationAmount={450}
            noiseScale={2.5}
            grainAmount={0.22}
            grainScale={2}
            grainAnimated={false}
            contrast={1.4}
            gamma={1}
            saturation={1.1}
            centerX={0}
            centerY={0}
            zoom={0.95}
          />
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/50" />

        {/* Error code content */}
        <div className="relative z-10 text-center px-8 select-none">
          <div
            className="text-[120px] md:text-[160px] font-black leading-none text-white/90 tracking-tighter"
            style={{
              textShadow:
                "0 0 80px rgba(6,115,249,0.6), 0 0 30px rgba(6,115,249,0.3)",
            }}
          >
            {errorCode}
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px flex-1 max-w-[60px] bg-white/30" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/60">
              Service Unavailable
            </span>
            <div className="h-px flex-1 max-w-[60px] bg-white/30" />
          </div>
        </div>

        {/* Bottom fade on mobile */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent md:hidden" />

        {/* Right fade for desktop */}
        <div className="hidden md:block absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent" />
      </div>

      {/* Right Panel — Info */}
      <div className="flex-1 flex items-center justify-start px-8 md:px-16 lg:px-24 py-16 md:py-0">
        <div className="max-w-lg w-full">
          {/* Label */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400">
              {section}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight tracking-tight mb-5">
            {title}
          </h1>

          {/* Message */}
          <p className="text-base md:text-md text-white/50 leading-relaxed mb-10 max-w-sm">
            {message}
          </p>

          {/* Divider */}
          <div className="h-px w-full bg-white/[0.08] mb-10" />

          {/* Contact Block */}
          <div className="mb-10">
            <p className="text-xs text-white/40 font-medium mb-2 tracking-wide uppercase">
              For inquiries, reach us at
            </p>
            <a
              href="mailto:startx.ru@newtonschool.co"
              className="group inline-flex items-center gap-3 text-white hover:text-blue-400 transition-colors duration-300"
            >
              <span className="text-xl md:text-2xl font-semibold underline underline-offset-4 decoration-white/30 group-hover:decoration-blue-400/60 transition-all duration-300">
                startx.ru@newtonschool.co
              </span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Back to Home */}
          {showHomeButton && (
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Home
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
