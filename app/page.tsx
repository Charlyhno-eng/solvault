"use client";

import { importWalletsFromJson } from "@/features/json-wallet/importWalletsFromJson";
import { createSolanaWallet } from "@/features/web3js/createSolanaWallet";
import type { SolanaWallet } from "@/features/web3js/types";
import ButtonAction from "@/helpers/ui/ButtonAction";
import ButtonTransparent from "@/helpers/ui/ButtonTransparent";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";

export default function Home() {
  const [wallet, setWallet] = useState<SolanaWallet>(null);
  const [isPending, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [importStatus, setImportStatus] = useState<{
    message: string;
    type: "success" | "error" | null;
  } | null>(null);

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

  const handleImport = async () => {
    setImportStatus({ message: "Importing wallets...", type: null });

    try {
      const result = await importWalletsFromJson();

      if (result.success === 0 && result.error === 0) {
        setImportStatus(null);
        return;
      }

      setImportStatus({
        message: `Import completed: ${result.success} successful, ${result.error} errors`,
        type: "success",
      });
    } catch (error) {
      setImportStatus({
        message: error instanceof Error ? error.message : "Import failed",
        type: "error",
      });
    }

    setTimeout(() => setImportStatus(null), 5000);
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

          {importStatus && (
            <div
              className={cn(
                "backdrop-blur-xl rounded-2xl p-6 border shadow-2xl max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500 text-white",
                importStatus.type === "success"
                  ? "border-green-400/30 bg-green-500/10"
                  : "border-red-400/30 bg-red-500/10",
              )}
            >
              <div className="flex flex-col items-center space-y-3 text-center">
                <div
                  className={cn(
                    "w-14 h-14 border-2 rounded-xl flex items-center justify-center",
                    importStatus.type === "success"
                      ? "border-green-400/50 bg-green-500/20 text-green-400"
                      : importStatus.type === "error"
                        ? "border-red-400/50 bg-red-500/20 text-red-400"
                        : "border-white/50 bg-white/10 text-white",
                  )}
                >
                  {importStatus.type === null ? (
                    <div className="w-7 h-7 border-2 border-current/50 rounded-full animate-spin border-t-transparent" />
                  ) : importStatus.type === "success" ? (
                    <svg
                      className="w-7 h-7"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-7 h-7"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <p className="text-sm font-medium leading-relaxed text-white">
                  {importStatus.message}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 items-end self-end pb-8 hidden xl:flex">
          <ButtonTransparent onClick={handleImport}>
            Import Wallets
          </ButtonTransparent>
          <ButtonTransparent>Export Wallets</ButtonTransparent>
        </div>
      </div>
    </main>
  );
}
