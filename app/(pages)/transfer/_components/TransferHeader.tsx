"use client";

import { WalletIcon } from "lucide-react";

export default function TransferHeader() {
  return (
    <div className="text-center mb-20">
      <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/30 mb-8 shadow-2xl mx-auto w-fit">
        <WalletIcon className="w-8 h-8 text-purple-400" />
        <h1 className="text-4xl font-black text-purple-400 drop-shadow-lg">
          Send SOL
        </h1>
      </div>
      <p className="text-xl text-white/70 max-w-xl mx-auto leading-relaxed mb-8 md:mb-12">
        Securely transfer SOL between your wallets or to any Solana address
      </p>
    </div>
  );
}
