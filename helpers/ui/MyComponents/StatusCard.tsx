import { cn } from "@/lib/utils";

type StatusType = "loading" | "success" | "error";

type StatusCardProps = {
  type: StatusType;
  title?: string;
  message: string;
  className?: string;
};

export default function StatusCard({
  type,
  title,
  message,
  className,
}: StatusCardProps) {
  const config = {
    loading: {
      container: "border-white/50 bg-white/10 text-white",
      iconContainer: "border-white/50 bg-white/10 text-white",
      icon: (
        <div className="w-7 h-7 border-2 border-current/50 rounded-full animate-spin border-t-transparent" />
      ),
    },
    success: {
      container: "border-green-400/30 bg-green-500/10",
      iconContainer: "border-green-400/50 bg-green-500/20 text-green-400",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    error: {
      container: "border-red-400/30 bg-red-500/10",
      iconContainer: "border-red-400/50 bg-red-500/20 text-red-400",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  };

  const currentConfig = config[type];

  return (
    <div
      className={cn(
        "backdrop-blur-xl rounded-2xl p-6 border shadow-2xl max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500 text-white",
        currentConfig.container,
        className,
      )}
    >
      <div className="flex flex-col items-center space-y-3 text-center">
        <div
          className={cn(
            "w-14 h-14 border-2 rounded-xl flex items-center justify-center",
            currentConfig.iconContainer,
          )}
        >
          {currentConfig.icon}
        </div>
        <div>
          {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
          <p
            className={cn(
              "text-sm font-medium leading-relaxed text-white",
              title && "mt-1 text-green-400 text-xs",
            )}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
