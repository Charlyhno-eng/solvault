"use client";
import { createSolanaWallet } from "@/features/web3js/createSolanaWallet";
import { SolanaWallet } from "@/features/web3js/types";
import { useState, useTransition } from "react";

export default function Home() {
  const [wallet, setWallet] = useState<SolanaWallet>(null);
  const [isPending, startTransition] = useTransition();

  const handleCreateWallet = () => {
    startTransition(async () => {
      const newWallet = await createSolanaWallet();
      setWallet(newWallet);
      console.log("NEW WALLET CREATED:", newWallet);
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">SolVault</h1>
          <p className="text-white/80">
            Create and manage Solana wallets in one click
          </p>
        </div>

        <button
          onClick={handleCreateWallet}
          disabled={isPending}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#21ecab] to-[#9548fc] text-white font-semibold text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating..." : "Create Solana Wallet"}
        </button>

        {wallet && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 space-y-3">
            <h3 className="text-white font-semibold text-lg">
              Wallet Created !
            </h3>
            <p className="text-xs text-white/70 break-all">
              <strong>Public Key:</strong> {wallet.publicKey}
            </p>
            <p className="text-xs text-white/70">
              <strong>Secret (bs58):</strong>{" "}
              {wallet.secretKeyBs58.slice(0, 20)}...
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
