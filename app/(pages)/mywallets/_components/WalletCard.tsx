"use client";

import { useEffect, useState } from "react";
import DeleteWalletButton from "./DeleteWalletButton";
import PrivateKeyModal from "./PrivateKeyModal";
import WalletDetails from "./WalletDetails";
import WalletHeader from "./WalletHeader";

type WalletCardProps = {
  walletId: number;
  publicKey: string;
  secretKeyBs58: string;
  label?: string;
  createdAt: string;
  notes?: string;
  onCopy: () => void;
  copied: boolean;
  onDelete?: () => void;
  onLabelChange?: (newLabel: string) => void;
};

function WalletCard({
  walletId,
  publicKey,
  secretKeyBs58,
  label,
  createdAt,
  notes,
  onCopy,
  copied,
  onDelete,
  onLabelChange,
}: WalletCardProps) {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [loadingBalance, setLoadingBalance] = useState<boolean>(true);
  const shortAddress = `${publicKey.slice(0, 8)}...${publicKey.slice(-8)}`;

  useEffect(() => {
    let cancelled = false;

    async function fetchBalance() {
      try {
        setLoadingBalance(true);
        const response = await fetch(
          `/api/wallet/${walletId}/balance?publicKey=${encodeURIComponent(publicKey)}`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (!cancelled && data.balance !== undefined) {
          setBalance(Number(data.balance));
        }
      } catch (error) {
        if (!cancelled) {
          setBalance(null);
        }
      } finally {
        if (!cancelled) {
          setLoadingBalance(false);
        }
      }
    }

    fetchBalance();

    return () => {
      cancelled = true;
    };
  }, [walletId, publicKey]);

  return (
    <>
      <div className="group bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/30 hover:shadow-xl transition-all hover:-translate-y-1">
        <WalletHeader
          walletId={walletId}
          label={label}
          createdAt={createdAt}
          onCopy={onCopy}
          copied={copied}
          onLabelChange={onLabelChange}
        />

        {/* Balance */}
        <div className="mt-2 mb-4 flex items-center justify-between text-sm">
          <span className="text-xs uppercase tracking-wide text-white/50 font-mono">
            Balance
          </span>
          <span className="font-mono text-right min-w-[80px]">
            {loadingBalance ? (
              <span className="text-xs text-white/40 animate-pulse">
                Loading...
              </span>
            ) : balance !== null ? (
              <span className="font-semibold text-green-400 text-base">
                {balance.toFixed(balance < 0.01 ? 6 : 4)} SOL
              </span>
            ) : (
              <span className="text-xs text-orange-400 font-medium">
                Unavailable
              </span>
            )}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <WalletDetails
            address={shortAddress}
            onCopy={onCopy}
            notes={notes}
            onRevealPrivateKey={() => setShowPrivateKey(true)}
          />
          <DeleteWalletButton
            walletId={walletId}
            onDeleteSuccess={onDelete}
            className="shrink-0 self-end"
          />
        </div>
      </div>

      <PrivateKeyModal
        secretKeyBs58={secretKeyBs58}
        isOpen={showPrivateKey}
        onClose={() => setShowPrivateKey(false)}
      />
    </>
  );
}

export default WalletCard;
