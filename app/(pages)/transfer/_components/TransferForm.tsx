"use client";

import { Button } from "@/helpers/ui/BasicShadCn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/helpers/ui/BasicShadCn/card";
import { Input } from "@/helpers/ui/BasicShadCn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/helpers/ui/BasicShadCn/select";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
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

export default function TransferForm() {
  const [fromWallet, setFromWallet] = useState(wallets[0].id);
  const [toWallet, setToWallet] = useState(wallets[0].id);
  const [useCustomAddress, setUseCustomAddress] = useState(false);
  const [customAddress, setCustomAddress] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="lg:max-w-lg lg:w-full flex">
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl w-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white mb-1">
            Transfer SOL
          </CardTitle>
          <CardDescription className="text-white/60">
            Select wallets and enter amount
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 flex-1 flex flex-col justify-center">
          <div>
            <label className="text-sm font-semibold text-white/80 mb-3 block">
              From
            </label>
            <Select
              value={fromWallet.toString()}
              onValueChange={(v) => setFromWallet(Number(v))}
            >
              <SelectTrigger className="w-full h-14 bg-white/10 border-white/30 text-white font-mono rounded-xl focus-visible:ring-2 focus-visible:ring-purple-500/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/80 border-white/20 text-white w-[320px]">
                {wallets.map((wallet) => (
                  <SelectItem
                    key={wallet.id}
                    value={wallet.id.toString()}
                    className="font-mono"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <Image
                          src="/solana-sol-logo.svg"
                          alt="Solana"
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                      {wallet.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-semibold text-white/80 mb-3 block">
              To
            </label>
            <div className="space-y-3">
              <Select
                value={toWallet.toString()}
                onValueChange={(v) => {
                  setToWallet(Number(v));
                  setUseCustomAddress(false);
                  setCustomAddress("");
                }}
              >
                <SelectTrigger className="w-full h-14 bg-white/10 border-white/30 text-white font-mono rounded-xl focus-visible:ring-2 focus-visible:ring-purple-500/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/80 border-white/20 text-white w-[320px]">
                  {wallets.map((wallet) => (
                    <SelectItem
                      key={wallet.id}
                      value={wallet.id.toString()}
                      className="font-mono"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Image
                            src="/solana-sol-logo.svg"
                            alt="Solana"
                            width={20}
                            height={20}
                            className="object-contain"
                          />
                        </div>
                        {wallet.label}
                      </div>
                    </SelectItem>
                  ))}
                  <SelectItem
                    value="custom"
                    className="font-mono bg-linear-to-r from-gray-800 to-gray-700 border-t border-white/10"
                    onSelect={() => setUseCustomAddress(true)}
                  >
                    <div className="flex items-center gap-3">
                      <PlusIcon className="w-4 h-4 text-green-400" />
                      Enter custom address
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {useCustomAddress && (
                <Input
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  placeholder="Paste Solana address here..."
                  className="w-full h-14 bg-white/10 border-white/30 text-white placeholder-white/50 font-mono rounded-xl focus-visible:ring-2 focus-visible:ring-purple-500/50"
                />
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-white/80 mb-3 block">
              Amount (SOL)
            </label>
            <div className="relative">
              <Input
                type="number"
                step="0.000001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.000000"
                className="w-full h-16 bg-white/10 border-white/30 text-white placeholder-white/50 font-bold rounded-2xl focus-visible:ring-2 focus-visible:ring-purple-500/50 pr-20 text-2xl text-right"
              />
            </div>
            <div className="text-xs text-white/50 text-right font-mono">
              ~${(Number(amount || 0) * 250).toLocaleString()} (at $250/SOL)
            </div>
          </div>

          <Button
            size="lg"
            className="w-full h-16 bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-xl font-bold rounded-2xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50"
          >
            Review & Send
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
