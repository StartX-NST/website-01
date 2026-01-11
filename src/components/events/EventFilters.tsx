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
      {/* Status filters */}
      <div className="flex gap-2">
        {eventStatus.map((status) => (
          <button
            key={status.value}
            onClick={() => onStatusChange(status.value)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedStatus === status.value
                ? "bg-blue-500 text-black shadow-[0_0_20px_rgba(19,40,85,0.3)]"
                : "bg-black/40 text-gray-400 border border-gray-800 hover:border-blue-500/50 hover:text-white"
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
}
