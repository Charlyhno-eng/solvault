"use client";
import { SolanaColors } from "@/helpers/ui/ColorTheme";
import GradientText from "@/helpers/ui/GradientText";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        <GradientText
          colors={[
            SolanaColors.TURQUOISE,
            SolanaColors.BLUE,
            SolanaColors.VIOLET,
          ]}
          animationSpeed={2.5}
          className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
        >
          SolVault
        </GradientText>

        <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-2xl mx-auto leading-relaxed font-light">
          Manage, view, and transact with your Solana wallets in one click
        </p>
      </div>
    </main>
  );
}
