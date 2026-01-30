"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/helpers/ui/BasicShadCn/card";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";

const wallets = [
  {
    id: 1,
    label: "My Main Wallet",
    address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
  },
  {
    id: 2,
    label: "Savings",
    address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  },
  {
    id: 3,
    label: "Trading",
    address: "Cw8CFyM9FkoMi7K7Crf6HNQqf4uEMzpKw6QNghXLvLkY",
  },
];

export default function TransferPreview() {
  const [fromWallet, setFromWallet] = useState(1);
  const [toWallet, setToWallet] = useState(1);
  const [useCustomAddress, setUseCustomAddress] = useState(false);
  const [customAddress, setCustomAddress] = useState("");
  const [amount, setAmount] = useState("0");

  const fromWalletData = wallets.find((w) => w.id === fromWallet);
  const toWalletData = wallets.find((w) => w.id === toWallet) || {
    label: customAddress.slice(0, 8) + "...",
    address: customAddress,
  };

  return (
    <div className="lg:max-w-md lg:w-full flex">
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl w-full flex flex-col">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Transfer Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 flex-1 flex flex-col justify-center">
          <div className="space-y-8">
            <div className="flex items-center justify-between py-4 border-b border-white/10">
              <span className="text-white/70 font-mono text-sm">From</span>
              <div className="text-right">
                <div className="font-bold text-purple-400 text-base">
                  {fromWalletData?.label}
                </div>
                <div className="text-xs text-white/50 font-mono">
                  {fromWalletData?.address?.slice(0, 8)}...
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center py-2 mx-4">
              <div className="w-20 h-20 bg-linear-to-b from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center border-2 border-purple-400/50 shadow-xl">
                <ArrowRightIcon className="w-8 h-8 text-purple-400" />
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-white/10">
              <span className="text-white/70 font-mono text-sm">To</span>
              <div className="text-right">
                <div className="font-bold text-blue-400 text-base">
                  {toWalletData.label}
                </div>
                <div className="text-xs text-white/50 font-mono truncate">
                  {toWalletData.address?.slice(0, 32)}...
                </div>
              </div>
            </div>

            <div className="pt-8 border-t-2 border-purple-500/30">
              <div className="flex items-baseline justify-between">
                <span className="text-white/50 font-mono text-sm">Amount</span>
                <div className="text-right">
                  <div className="text-4xl font-black text-white">
                    {amount || "0"} <span className="text-2xl">SOL</span>
                  </div>
                  <div className="text-sm text-white/60 font-mono mt-1">
                    ~${(Number(amount || 0) * 250).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
