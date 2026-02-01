"use client";

import type { WalletTableType } from "@/features/wallet/types";
import {
  transferSol,
  type TransferParams,
} from "@/features/web3js/transferSol";
import { useCallback, useState } from "react";

type TransferData = {
  fromWalletId: number;
  toWalletId?: number;
  toAddress?: string;
  amount: string;
};

type TransferResult = {
  success: boolean;
  signature?: string;
  error?: string;
};

export function useTransferState(wallets: WalletTableType[]) {
  const [transferData, setTransferData] = useState<TransferData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transferResult, setTransferResult] = useState<TransferResult | null>(
    null,
  );

  const sendTransfer = useCallback(async () => {
    if (!transferData) return;

    setIsProcessing(true);
    setTransferResult(null);

    try {
      const walletResponse = await fetch(
        `/api/wallet/transfer?walletId=${transferData.fromWalletId}`,
        { cache: "no-store" },
      );

      if (!walletResponse.ok) {
        throw new Error("Failed to fetch wallet data");
      }

      const fromWalletData = await walletResponse.json();

      const toPublicKey = transferData.toWalletId
        ? wallets.find((w) => w.id === transferData.toWalletId)?.public_key
        : transferData.toAddress;

      if (!toPublicKey) {
        throw new Error("Destination address not found");
      }

      const transferParams: TransferParams = {
        fromSecretKey: fromWalletData.secretKeyBs58,
        toPublicKey,
        amountSOL: Number(transferData.amount),
        walletId: transferData.fromWalletId,
      };

      const web3Result = await transferSol(transferParams);

      setTransferResult({
        success: web3Result.success,
        signature: web3Result.success ? web3Result.signature : undefined,
        error: web3Result.success ? undefined : web3Result.error,
      });

      if (web3Result.success) {
        window.dispatchEvent(new CustomEvent("refresh-balances"));
      }
    } catch (error) {
      console.error("Transfer error:", error);
      setTransferResult({
        success: false,
        error: error instanceof Error ? error.message : "Transfer failed",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [transferData, wallets]);

  const resetTransfer = useCallback(() => {
    setTransferData(null);
    setTransferResult(null);
    setIsProcessing(false);
  }, []);

  return {
    transferData,
    setTransferData,
    isProcessing,
    transferResult,
    sendTransfer,
    resetTransfer,
  };
}
