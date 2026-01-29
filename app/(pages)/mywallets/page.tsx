"use client";

import type { WalletTableType } from "@/features/wallet/types";
import { useCallback, useEffect, useState } from "react";
import WalletCard from "./_components/WalletCard";

function PageMyWallets() {
  const [wallets, setWallets] = useState<WalletTableType[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = useCallback(async () => {
    try {
      const response = await fetch("/api/wallet");
      const data = await response.json();
      setWallets(data);
    } catch (error) {
      console.error("Failed to fetch wallets:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCopy = (publicKey: string) => {
    navigator.clipboard.writeText(publicKey);
    setCopiedWallet(publicKey);
    setTimeout(() => setCopiedWallet(null), 2000);
  };

  const handleWalletDelete = useCallback(() => {
    fetchWallets();
  }, [fetchWallets]);

  if (loading) {
    return (
      <div className="h-[90vh] flex items-center justify-center p-8 text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/80">Loading wallets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[90vh] overflow-y-auto py-6 text-white">
      <div className="w-[88rem] mx-auto px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-6">My Wallets</h1>
          <div className="w-full border-b border-gray-700" />
        </div>
        <p className="text-white/60 text-right mb-12">
          {wallets.length} wallet(s)
        </p>
      </div>

      {wallets.length === 0 ? (
        <div className="w-[88rem] mx-auto px-8">
          <div className="text-center py-20 space-y-4">
            <div className="w-24 h-24 mx-auto bg-white/5 rounded-2xl flex items-center justify-center border-2 border-white/20">
              <span className="text-4xl text-white/30">👛</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">No wallets yet</h2>
              <p className="text-white/60 max-w-md mx-auto">
                Create your first Solana wallet to get started.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[88rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {wallets.map((wallet) => (
              <WalletCard
                key={wallet.id}
                walletId={wallet.id}
                publicKey={wallet.public_key}
                secretKeyBs58={wallet.secret_key_bs58}
                label={wallet.label || undefined}
                createdAt={wallet.created_at}
                notes={wallet.notes || undefined}
                onCopy={() => handleCopy(wallet.public_key)}
                copied={copiedWallet === wallet.public_key}
                onDelete={handleWalletDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PageMyWallets;
