"use client";

import { createSolanaWallet } from "@/features/web3js/createSolanaWallet";
import type { SolanaWallet } from "@/features/web3js/types";
import { useState, useTransition } from "react";

export default function Home() {
  const [wallet, setWallet] = useState<SolanaWallet>(null);
  const [isPending, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const handleCreateWallet = async () => {
    startTransition(async () => {
      setSaveStatus("saving");
      try {
        const newWallet = await createSolanaWallet();

        if (newWallet) {
          const response = await fetch("/api/wallet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              publicKey: newWallet.publicKey,
              label: `Wallet #${Date.now()}`,
            }),
          });

          if (response.ok) {
            setWallet(newWallet);
            setSaveStatus("saved");
            console.log("NEW WALLET CREATED & SAVED via API:", newWallet);
          } else {
            setSaveStatus("error");
          }
        }
      } catch (error) {
        setSaveStatus("error");
        console.error("Wallet creation failed:", error);
      }
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-black bg-linear-to-r from-[#21ecab] to-[#9548fc] bg-clip-text text-transparent drop-shadow-lg">
            SolVault
          </h1>
          <p className="text-xl text-white/80 max-w-sm mx-auto leading-relaxed">
            Create and manage Solana wallets in one click
          </p>
        </div>

        <button
          onClick={handleCreateWallet}
          disabled={isPending}
          className="w-full py-6 px-8 bg-linear-to-r from-[#21ecab] via-[#9548fc] to-[#21ecab] text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-purple-500/25"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating...
            </span>
          ) : (
            "Create Solana Wallet"
          )}
        </button>

        {saveStatus === "saved" && wallet && (
          <div className="backdrop-blur-xl rounded-2xl p-8 border border-green-400/30 shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 border-2 border-green-400/50 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-white">
                Wallet Created & Saved!
              </h3>

              <div className="w-full space-y-3 text-left text-sm">
                <div className="p-4 rounded-xl border border-white/10">
                  <p className="text-xs text-white/70 mb-1 font-medium">
                    Public Key:
                  </p>
                  <p className="font-mono text-white break-all text-sm">
                    {wallet.publicKey}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-white/10">
                  <p className="text-xs text-white/70 mb-1 font-medium">
                    Secret Key (bs58):
                  </p>
                  <code className="font-mono text-orange-400 text-xs break-all">
                    {wallet.secretKeyBs58.slice(0, 32)}...
                  </code>
                </div>
              </div>

              <p className="text-green-400 text-sm font-medium">
                ✅ Securely saved to database
              </p>
            </div>
          </div>
        )}

        {saveStatus === "error" && (
          <div className="backdrop-blur-xl rounded-2xl p-6 border border-red-400/30">
            <p className="text-red-400 text-sm font-medium">
              ❌ Failed to save wallet. Try again.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
