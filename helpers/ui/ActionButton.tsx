import { LucideIcon } from "lucide-react";

type ActionButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "destructive";
};

function ActionButton({
  children,
  onClick,
  icon: Icon,
  disabled = false,
  variant = "primary",
  className = "",
}: ActionButtonProps) {
  const baseClasses =
    "px-6 py-3 font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-linear-to-r from-[#21ecab] to-[#9548fc] text-white hover:-translate-y-0.5 active:scale-95 shadow-purple-500/25",
    secondary:
      "bg-white/10 border border-white/20 text-white/90 hover:bg-white/20 hover:border-white/40",
    destructive:
      "bg-red-500/90 hover:bg-red-500 text-white hover:-translate-y-0.5 active:scale-95 shadow-red-500/25",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}

export default ActionButton;
