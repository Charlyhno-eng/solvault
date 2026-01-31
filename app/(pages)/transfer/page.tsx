"use client";

import type { WalletTableType } from "@/features/wallet/types";
import { useCallback, useEffect, useState } from "react";
import TransferForm from "./_components/TransferForm";
import TransferHeader from "./_components/TransferHeader";
import TransferPreview from "./_components/TransferPreview";

export default function PageTransfer() {
  const [transferData, setTransferData] = useState<{
    fromWalletId: number;
    toWalletId?: number;
    toAddress?: string;
    amount: string;
  } | null>(null);
  const [wallets, setWallets] = useState<WalletTableType[]>([]);

  const handleFormChange = useCallback(
    (data: {
      fromWalletId: number;
      toWalletId?: number;
      toAddress?: string;
      amount: string;
    }) => {
      setTransferData(data);
    },
    [],
  );

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await fetch("/api/wallet", { cache: "no-store" });
        const data = await response.json();
        setWallets(data);
      } catch (error) {
        console.error("Failed to fetch wallets:", error);
      }
    };
    fetchWallets();
  }, []);

  return (
    <div className="min-h-[90vh] py-12 px-6 md:px-12 text-white bg-linear-to-br from-gray-900/50 to-black/60">
      <div className="max-w-5xl mx-auto">
        <TransferHeader />
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch mt-16">
          <TransferForm onFormChange={handleFormChange} />
          <TransferPreview transferData={transferData} wallets={wallets} />
        </div>
      </div>
    </div>
  );
}
