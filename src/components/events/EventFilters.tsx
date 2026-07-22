import { motion } from "framer-motion";

interface EventFiltersProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const eventStatus = [
  { value: "all", label: "All Events" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Past Events" },
];

export default function EventFilters({
  selectedStatus,
  onStatusChange,
}: EventFiltersProps) {
  return (
    <div className="flex justify-center mb-12">
      {/* Track Container */}
      <div className="relative inline-flex items-center p-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        {eventStatus.map((status) => {
          const isSelected = selectedStatus === status.value;
          return (
            <button
              key={status.value}
              onClick={() => onStatusChange(status.value)}
              className={`relative px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 z-10 select-none ${
                isSelected ? "text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              <span className="relative z-10">{status.label}</span>
              {isSelected && (
                <motion.div
                  layoutId="filter-pill-slider"
                  className="absolute inset-0 bg-[#0673f9] rounded-full z-0 shadow-[0_4px_20px_rgba(6,115,249,0.45)]"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 32,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}


