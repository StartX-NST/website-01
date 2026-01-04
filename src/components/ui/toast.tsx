import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-500/30 rounded-lg px-6 py-4 shadow-[0_8px_32px_rgba(19,40,85,0.4)] flex items-center gap-3 min-w-[300px]">
        <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
        <span className="text-white font-medium flex-1">{message}</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
