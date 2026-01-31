"use client";

import type { WalletTableType } from "@/features/wallet/types";
import { useSolPrice } from "@/helpers/commons/useSolPrice";
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
import { useCallback, useEffect, useState } from "react";
import { BalanceDisplay } from "./BalanceDisplay";
import { useWalletBalance } from "./useWalletBalance";
import { WalletSelect } from "./WalletSelect";

type TransferFormProps = {
  onFormChange: (data: {
    fromWalletId: number;
    toWalletId?: number;
    toAddress?: string;
    amount: string;
  }) => void;
};

export default function TransferForm({ onFormChange }: TransferFormProps) {
  const [wallets, setWallets] = useState<WalletTableType[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromWallet, setFromWallet] = useState<number | null>(null);
  const [toWallet, setToWallet] = useState<number | null>(null);
  const [useCustomAddress, setUseCustomAddress] = useState(false);
  const [customAddress, setCustomAddress] = useState("");
  const [amount, setAmount] = useState("");

  const fromWalletData = wallets.find((w) => w.id === fromWallet);
  const toWalletData = wallets.find((w) => w.id === toWallet);
  const { balance: fromBalance, loading: loadingFromBalance } =
    useWalletBalance(fromWallet, fromWalletData?.public_key || "");
  const { balance: toBalance, loading: loadingToBalance } = useWalletBalance(
    toWallet,
    toWalletData?.public_key || "",
  );
  const { price: solPrice } = useSolPrice();

  const fetchWallets = useCallback(async () => {
    try {
      const response = await fetch("/api/wallet", { cache: "no-store" });
      const data = await response.json();
      setWallets(data);

      if (data.length > 0) {
        setFromWallet(data[0].id);
      }
    } catch (error) {
      console.error("Failed to fetch wallets:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  const availableToWallets = wallets.filter(
    (wallet) => wallet.id !== fromWallet,
  );

  const handleReviewClick = useCallback(() => {
    if (!fromWallet || (!toWallet && !customAddress) || !amount) {
      return;
    }

    onFormChange({
      fromWalletId: fromWallet,
      toWalletId: toWallet || undefined,
      toAddress: useCustomAddress ? customAddress : undefined,
      amount,
    });
  }, [
    fromWallet,
    toWallet,
    useCustomAddress,
    customAddress,
    amount,
    onFormChange,
  ]);

  if (loading) {
    return (
      <div className="lg:max-w-lg lg:w-full flex">
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl w-full flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white mb-1">
              Transfer SOL
            </CardTitle>
            <CardDescription className="text-white/60">
              Loading wallets...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (wallets.length === 0) {
    return (
      <div className="lg:max-w-lg lg:w-full flex">
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl w-full flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white mb-1">
              Transfer SOL
            </CardTitle>
            <CardDescription className="text-white/60">
              No wallets available
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <span className="text-4xl text-white/30">👛</span>
              <p className="text-white/60">Create a wallet first</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <WalletSelect
              wallets={wallets}
              selectedId={fromWallet}
              onChange={(id) => {
                setFromWallet(id);
                setToWallet(null);
                setUseCustomAddress(false);
                setCustomAddress("");
              }}
              isFrom
              showAddress
            />
            {fromWallet && (
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-white/50 uppercase tracking-wide font-mono">
                  Balance
                </span>
                <span className="font-mono min-w-[80px] text-right">
                  <BalanceDisplay
                    balance={fromBalance}
                    loading={loadingFromBalance}
                  />
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-white/80 mb-3 block">
              To
            </label>
            <div className="space-y-3">
              <Select
                value={
                  toWallet?.toString() || (useCustomAddress ? "custom" : "")
                }
                onValueChange={(v) => {
                  if (v === "custom") {
                    setToWallet(null);
                    setUseCustomAddress(true);
                  } else {
                    setToWallet(Number(v));
                    setUseCustomAddress(false);
                    setCustomAddress("");
                  }
                }}
              >
                <SelectTrigger className="w-full h-14 bg-white/20 border-white/30 text-white font-mono rounded-xl backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-purple-500/50 hover:bg-white/25 transition-all duration-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/30 text-white w-[320px] backdrop-blur-md shadow-2xl">
                  {availableToWallets.map((wallet) => (
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
                        <div className="flex-1">
                          <div>{wallet.label || `Wallet ${wallet.id}`}</div>
                          <div className="text-xs text-white/60 font-mono">
                            {`${wallet.public_key.slice(0, 8)}...${wallet.public_key.slice(-8)}`}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                  <SelectItem
                    value="custom"
                    className="font-mono bg-linear-to-r from-gray-800 to-gray-700 border-t border-white/10"
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
            {toWallet && (
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-white/50 uppercase tracking-wide font-mono">
                  Balance
                </span>
                <span className="font-mono min-w-[80px] text-right">
                  <BalanceDisplay
                    balance={toBalance}
                    loading={loadingToBalance}
                  />
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-white/80 mb-3 block">
              Amount (SOL)
            </label>
            <div className="relative">
              <Input
                type="number"
                step="0.000001"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.000000"
                className="w-full h-16 bg-white/10 border-white/30 text-white placeholder-white/50 font-bold rounded-2xl focus-visible:ring-2 focus-visible:ring-purple-500/50 pr-20 text-2xl text-right"
              />
            </div>
            <div className="text-xs text-white/50 text-right font-mono mt-1 flex justify-between items-center">
              <span>~${(Number(amount || 0) * solPrice).toLocaleString()}</span>
              <span>at ${solPrice.toFixed(2)}/SOL</span>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleReviewClick}
            disabled={
              !fromWallet || (!toWallet && !customAddress) || !amount || loading
            }
            className="w-full h-16 bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-xl font-bold rounded-2xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-200"
          >
            Review & Send
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
