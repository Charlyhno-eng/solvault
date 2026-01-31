"use client";

import type { WalletTableType } from "@/features/wallet/types";
import { Badge } from "@/helpers/ui/BasicShadCn/badge";
import { Button } from "@/helpers/ui/BasicShadCn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/helpers/ui/BasicShadCn/card";
import { ArrowRight, Copy, Shield, Zap } from "lucide-react";
import Image from "next/image";

interface TransferPreviewProps {
  transferData: {
    fromWalletId: number;
    toWalletId?: number;
    toAddress?: string;
    amount: string;
  } | null;
  wallets: WalletTableType[];
}

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
  const fee = 0.000005; // Fee fixe Solana
  const total = amount + fee;

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}…${address.slice(-4)}`;
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
          {" "}
          {/* ✅ space-y-3 réduit de space-y-6 */}
          {/* From Wallet */}
          <div className="space-y-1">
            {" "}
            {/* ✅ space-y-1 réduit de space-y-3 */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">
                From
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center border-2 border-purple-500/30">
                  <Image
                    src="/solana-sol-logo.svg"
                    alt="Solana"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">
                    {fromWallet?.label || `Wallet ${fromWallet?.id}`}
                  </p>
                  <p className="text-white/60 text-sm font-mono">
                    {truncateAddress(fromWallet?.public_key || "")}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/20"
                onClick={() => fromWallet && copyAddress(fromWallet.public_key)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {/* Arrow - ✅ Réduit py-4 → py-2 */}
          <div className="flex items-center justify-center py-2">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center border-2 border-white/20">
              <ArrowRight className="w-8 h-8 text-white/40" />
            </div>
          </div>
          {/* To Wallet */}
          <div className="space-y-1">
            {" "}
            {/* ✅ space-y-1 réduit de space-y-3 */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full" />
              <span className="text-sm font-semibold text-green-400 uppercase tracking-wider">
                To
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border-2 border-blue-500/30">
                  <Image
                    src="/solana-sol-logo.svg"
                    alt="Solana"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">
                    {toWallet
                      ? toWallet.label || `Wallet ${toWallet.id}`
                      : "Custom Address"}
                  </p>
                  <p className="text-white/60 text-sm font-mono">
                    {truncateAddress(
                      toWallet?.public_key || transferData.toAddress || "",
                    )}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/20"
                onClick={() => {
                  if (toWallet) copyAddress(toWallet.public_key);
                  else if (transferData.toAddress)
                    copyAddress(transferData.toAddress);
                }}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {/* Amount Details */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/60">
                <span>Amount</span>
                <span>{amount.toLocaleString()} SOL</span>
              </div>
              <div className="flex justify-between text-sm text-white/60">
                <span>Network fee</span>
                <span>~{fee} SOL</span>
              </div>
            </div>

            <div className="bg-linear-to-r from-purple-500/20 to-blue-500/20 p-4 rounded-xl border border-white/10">
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-bold text-white">Total</span>
                <div className="text-right">
                  <div className="text-3xl font-black text-white">
                    {total.toLocaleString()} SOL
                  </div>
                  <div className="text-sm text-white/60 font-mono">
                    ~${(total * 250).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Security & Confirm */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Shield className="w-4 h-4" />
              <span>Transaction secured by Solana Network</span>
            </div>

            <Badge
              variant="secondary"
              className="w-full justify-center text-xs uppercase font-bold bg-green-500/20 text-green-400 border-green-500/30 h-10"
            >
              Ready to send
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
