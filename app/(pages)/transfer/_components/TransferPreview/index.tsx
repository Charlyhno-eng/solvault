"use client";

import type { WalletTableType } from "@/features/wallet/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/helpers/ui/BasicShadCn/card";
import { ArrowRight, Zap } from "lucide-react";
import { TransactionFooter } from "./TransactionFooter";
import { TransactionSummary } from "./TransactionSummary";
import { WalletPreviewCard } from "./WalletPreviewCard";

type TransferPreviewProps = {
  transferData: {
    fromWalletId: number;
    toWalletId?: number;
    toAddress?: string;
    amount: string;
  } | null;
  wallets: WalletTableType[];
};

export default function TransferPreview({
  transferData,
  wallets,
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

        <CardContent className="space-y-3 flex-1">
          <div className="space-y-1">
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

          <div className="flex items-center justify-center py-2">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center border-2 border-white/20">
              <ArrowRight className="w-8 h-8 text-white/40" />
            </div>
          </div>

          <div className="space-y-1">
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
          <TransactionFooter />
        </CardContent>
      </Card>
    </div>
  );
}
