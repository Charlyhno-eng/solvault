"use client";
import { SolanaColors } from "@/helpers/ui/ColorTheme";
import GradientText from "@/helpers/ui/GradientText";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between backdrop-blur-sm z-50 border-b border-white/10 sticky top-0">
      <div className="flex items-start space-x-4">
        <GradientText
          colors={[
            SolanaColors.TURQUOISE,
            SolanaColors.BLUE,
            SolanaColors.VIOLET,
          ]}
          animationSpeed={2.5}
          className="text-2xl md:text-3xl font-black tracking-tight drop-shadow-sm leading-none"
        >
          SolVault
        </GradientText>
        <GradientText
          colors={[
            SolanaColors.TURQUOISE,
            SolanaColors.BLUE,
            SolanaColors.VIOLET,
          ]}
          animationSpeed={1.5}
          className="text-xs md:text-sm font-mono opacity-80 tracking-widest uppercase self-end mt-1 pl-4"
        >
          Solana Wallet Manager
        </GradientText>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <button className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-200 border border-white/20 rounded-lg backdrop-blur-sm hover:bg-white/5">
          Connect Wallet
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-200 border border-white/20 rounded-lg backdrop-blur-sm hover:bg-white/5">
          Get Started
        </button>
      </div>
    </nav>
  );
}
