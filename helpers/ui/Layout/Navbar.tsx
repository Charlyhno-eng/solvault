"use client";

import { SolanaColors } from "@/helpers/ui/Layout/ColorTheme";
import GradientText from "@/helpers/ui/Layout/GradientText";
import ButtonTransparent from "@/helpers/ui/MyComponents/ButtonTransparent";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "My wallets", href: "/mywallets" },
    { label: "Transfer", href: "/transfer" },
    { label: "Solana metrics", href: "/metrics" },
  ];

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
          {navItems.map(({ label, href }) => {
            const isActive = pathname === href;

            return (
              <ButtonTransparent
                key={href}
                onClick={() => router.push(href)}
                className={`
                  ${
                    isActive
                      ? "bg-linear-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/50 border-white/50 scale-105 font-bold tracking-wide"
                      : "bg-transparent"
                  }
                  hover:scale-105 transition-all duration-300
                `}
              >
                {label}
              </ButtonTransparent>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
