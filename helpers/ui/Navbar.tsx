"use client";

import { SolanaColors } from "@/helpers/ui/ColorTheme";
import GradientText from "@/helpers/ui/GradientText";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="w-full px-6 py-4 backdrop-blur-sm z-50 border-b border-white/10 sticky top-0">
      <div className="w-[88rem] mx-auto flex items-center justify-between gap-6">
        <div className="flex items-start space-x-4 min-w-0 shrink-0">
          <Link href="/">
            <GradientText
              colors={[
                SolanaColors.TURQUOISE,
                SolanaColors.BLUE,
                SolanaColors.VIOLET,
              ]}
              animationSpeed={2.5}
              className="text-2xl md:text-3xl font-black tracking-tight drop-shadow-sm leading-none cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              SolVault
            </GradientText>
          </Link>
          <GradientText
            colors={[
              SolanaColors.TURQUOISE,
              SolanaColors.BLUE,
              SolanaColors.VIOLET,
            ]}
            animationSpeed={1.5}
            className="text-xs md:text-sm font-mono opacity-80 tracking-widest uppercase self-end mt-1 pl-4 hidden md:block"
          >
            Solana Wallet Manager
          </GradientText>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4 min-w-0 shrink-0">
          <button
            onClick={() => router.push("/mywallets")}
            className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-200 border border-white/20 rounded-lg backdrop-blur-sm hover:bg-white/5 whitespace-nowrap"
          >
            My wallets
          </button>
          <button
            onClick={() => router.push("/metrics")}
            className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-200 border border-white/20 rounded-lg backdrop-blur-sm hover:bg-white/5 active:scale-95 whitespace-nowrap"
          >
            Solana metrics
          </button>
        </div>
      </div>
    </nav>
  );
}
