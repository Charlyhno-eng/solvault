"use client";

import { exportWalletsToJson } from "@/features/json-wallet/exportWalletsToJson";
import { importWalletsFromJson } from "@/features/json-wallet/importWalletsFromJson";
import { createSolanaWallet } from "@/features/web3js/createSolanaWallet";
import type { WalletPossiblyNull } from "@/features/web3js/types";
import ButtonAction from "@/helpers/ui/ButtonAction";
import ButtonTransparent from "@/helpers/ui/ButtonTransparent";
import StatusCard from "@/helpers/ui/StatusCard";
import { useState, useTransition } from "react";

export default function Home() {
  const [wallet, setWallet] = useState<WalletPossiblyNull>(null);
  const [isPending, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [importStatus, setImportStatus] = useState<{
    message: string;
    type: "loading" | "success" | "error";
  } | null>(null);

  const handleCreateWallet = async () => {
    startTransition(async () => {
      setSaveStatus("saving");
      setWallet(null);
      setImportStatus(null);

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
    setSaveStatus("idle");
    setWallet(null);
    setImportStatus({ message: "Importing wallets...", type: "loading" });

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

  const handleExport = async () => {
    try {
      await exportWalletsToJson();
      setImportStatus({
        message: "Wallets exported successfully! Check your downloads folder",
        type: "success",
      });
    } catch (error) {
      setImportStatus({
        message: error instanceof Error ? error.message : "Export failed",
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
              <span className="font-semibold bg-linear-to-r from-white to-white/50 bg-clip-text text-transparent inline">
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
            <StatusCard
              type="success"
              title="Wallet Created!"
              message="✅ Securely saved to database"
            />
          )}

          {importStatus && (
            <StatusCard
              type={importStatus.type}
              message={importStatus.message}
            />
          )}
        </div>

        <div className="flex-col gap-4 items-end self-end pb-8 hidden xl:flex">
          <ButtonTransparent onClick={handleImport}>
            Import Wallets
          </ButtonTransparent>
          <ButtonTransparent onClick={handleExport}>
            Export Wallets
          </ButtonTransparent>
        </div>
      </div>
    </main>
  );
}
