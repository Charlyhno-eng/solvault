"use client";

import type { WalletTableType } from "@/features/wallet/types";
import { Button } from "@/helpers/ui/BasicShadCn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/helpers/ui/BasicShadCn/card";
import { AlertTriangle, ArrowRight, CheckCircle, Zap } from "lucide-react";
import { TransactionFooter } from "./TransactionFooter";
import { TransactionSummary } from "./TransactionSummary";
import { WalletPreviewCard } from "./WalletPreviewCard";

type TransferResult = {
  success: boolean;
  signature?: string;
  error?: string;
} | null;

type TransferPreviewProps = {
  transferData: {
    fromWalletId: number;
    toWalletId?: number;
    toAddress?: string;
    amount: string;
  } | null;
  wallets: WalletTableType[];
  isProcessing: boolean;
  transferResult: TransferResult;
  onSendTransfer: () => void;
  onReset: () => void;
};

export default function TransferPreview({
  transferData,
  wallets,
  isProcessing,
  transferResult,
  onSendTransfer,
  onReset,
}: TransferPreviewProps) {
  if (!transferData || !transferData.amount) {
    return (
      <div className="lg:w-full flex">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl w-full h-[600px] flex flex-col justify-center items-center">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
              <ArrowRight className="w-10 h-10 text-white/30" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                No transfer selected
              </h3>
              <p className="text-white/60 max-w-sm mx-auto">
                Fill out the form on the left to preview your transaction
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const fromWallet = wallets.find((w) => w.id === transferData.fromWalletId);
  const toWallet = transferData.toWalletId
    ? wallets.find((w) => w.id === transferData.toWalletId)
    : null;

  const amount = Number(transferData.amount) || 0;

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  if (transferResult?.success) {
    return (
      <div className="lg:w-full flex">
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl w-full flex flex-col max-h-[600px]">
          <CardHeader className="text-center pt-8 pb-6">
            <div className="w-24 h-24 bg-green-500/20 border-4 border-green-500/40 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-3">
              Transfer Successful!
            </CardTitle>
            <CardDescription className="text-white/70 text-lg">
              Your SOL has been sent securely
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="font-mono bg-black/30 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center">
              <p className="text-sm text-white/60 mb-3 uppercase tracking-wider font-semibold">
                Transaction Signature
              </p>
              <p className="font-mono text-white font-bold break-all text-lg bg-black/50 px-4 py-2 rounded-xl border border-white/20">
                {transferResult.signature?.slice(0, 8)}...
                {transferResult.signature?.slice(-8)}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 text-green-400 hover:text-green-300 hover:bg-green-500/20"
                onClick={() =>
                  window.open(
                    `https://solscan.io/tx/${transferResult.signature}`,
                    "_blank",
                  )
                }
              >
                View on Solscan
              </Button>
            </div>
            <Button
              onClick={onReset}
              className="w-full bg-green-600 hover:bg-green-700 h-14 text-lg font-bold rounded-2xl shadow-xl shadow-green-500/30"
            >
              New Transfer
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="lg:w-full flex">
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl w-full flex flex-col max-h-[600px]">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            Transaction Preview
          </CardTitle>
          <CardDescription className="text-white/60">
            Review your transfer details before sending
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 flex-1 p-0">
          <div className="space-y-2 p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">
                From
              </span>
            </div>
            <WalletPreviewCard
              label={fromWallet?.label || `Wallet ${fromWallet?.id}`}
              address={fromWallet?.public_key || ""}
              isFrom
              onCopy={copyAddress}
            />
          </div>

          <div className="flex items-center justify-center py-4">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center border-2 border-white/20">
              <ArrowRight className="w-8 h-8 text-white/40" />
            </div>
          </div>

          <div className="space-y-2 p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full" />
              <span className="text-sm font-semibold text-green-400 uppercase tracking-wider">
                To
              </span>
            </div>
            <WalletPreviewCard
              label={
                toWallet
                  ? toWallet.label || `Wallet ${toWallet.id}`
                  : "Custom Address"
              }
              address={toWallet?.public_key || transferData.toAddress || ""}
              onCopy={copyAddress}
            />
          </div>

          <TransactionSummary amount={amount} />

          {transferResult?.success === false && (
            <div className="p-4 bg-red-500/10 border-2 border-red-500/30 rounded-2xl mx-4">
              <div className="flex items-center gap-3 text-red-400 text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span className="font-medium">{transferResult.error}</span>
              </div>
            </div>
          )}

          <TransactionFooter
            isProcessing={isProcessing}
            onSend={onSendTransfer}
            disabled={isProcessing}
          />
        </CardContent>
      </Card>
    </div>
  );
}
