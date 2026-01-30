"use client";

import { useState } from "react";
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
  const shortAddress = `${publicKey.slice(0, 8)}...${publicKey.slice(-8)}`;

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

        <div className="flex items-center justify-between gap-3 mt-4">
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
