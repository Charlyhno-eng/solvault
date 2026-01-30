import { LucideIcon } from "lucide-react";

type ButtonActionProps = {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
};

function ButtonAction({
  children,
  onClick,
  icon: Icon,
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonActionProps) {
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base font-semibold",
  };

  const baseClasses = `
    ${sizes[size]}
    rounded-xl shadow-xl hover:shadow-2xl
    transition-all duration-300 inline-flex items-center gap-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 hover:-translate-y-0.5 active:scale-95 shadow-purple-500/25 shadow-xl hover:shadow-xl",
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
      {Icon && <Icon className={`w-3 h-3 ${size === "lg" ? "w-4 h-4" : ""}`} />}
      {children}
    </button>
  );
}

export default ButtonAction;
