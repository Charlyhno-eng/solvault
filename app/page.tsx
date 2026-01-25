"use client";

import { createSolanaWallet } from "@/features/web3js/createSolanaWallet";
import type { SolanaWallet } from "@/features/web3js/types";
import ButtonAction from "@/helpers/ui/ButtonAction";
import ButtonTransparent from "@/helpers/ui/ButtonTransparent";
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
      setWallet(null);

      try {
        const newWallet = await createSolanaWallet();
        if (!newWallet) throw new Error("Failed to generate wallet");

        const response = await fetch("/api/wallet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publicKey: newWallet.publicKey,
            label: `Wallet #${Date.now()}`,
            secretKeyBs58: newWallet.secretKeyBs58,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        setWallet(newWallet);
        setSaveStatus("saved");
      } catch (error) {
        setSaveStatus("error");
      }
    });
  };

  return (
    <main className="h-[90vh] overflow-hidden flex items-center justify-center px-8 py-12">
      <div className="w-[88rem] mx-auto flex items-center justify-between h-full gap-16">
        <div className="flex-1 space-y-12 w-full max-w-5xl">
          <div className="space-y-8">
            <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-white/90 leading-[1.05] tracking-tight w-full">
              <span className="font-semibold bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent inline">
                Skip centralized exchanges <br />
                that hold your data.
              </span>
            </div>
            <p className="text-xl text-white/60 max-w-lg leading-relaxed font-light">
              SolVault operates locally. You control your keys and interact
              directly with the Solana blockchain without intermediaries. No
              centralized exchange or application holding your information. Only
              you and your cryptocurrency.
            </p>
          </div>
          <ButtonAction
            onClick={handleCreateWallet}
            disabled={isPending}
            variant="primary"
            size="lg"
            className="w-48 text-base py-3 justify-center"
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              "+ Create Wallet"
            )}
          </ButtonAction>
          {saveStatus === "saved" && wallet && (
            <div className="backdrop-blur-xl rounded-2xl p-6 border border-green-400/30 shadow-2xl max-w-sm bg-black/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="w-14 h-14 border-2 border-green-400/50 rounded-xl flex items-center justify-center bg-green-500/10">
                  <svg
                    className="w-7 h-7 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Wallet Created!
                  </h3>
                  <p className="text-green-400 text-xs font-medium mt-1">
                    ✅ Securely saved to database
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-col gap-4 items-end self-end pb-8 hidden xl:flex">
          <div className="flex-col gap-4 items-end self-end pb-8 hidden xl:flex">
            <ButtonTransparent>Import Wallets</ButtonTransparent>
            <ButtonTransparent>Export Wallets</ButtonTransparent>
          </div>
        </div>
      </div>
    </main>
  );
}
