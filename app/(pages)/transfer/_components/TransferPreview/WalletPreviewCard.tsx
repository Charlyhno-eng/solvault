"use client";

import { Button } from "@/helpers/ui/BasicShadCn/button";
import { Copy } from "lucide-react";
import Image from "next/image";

type WalletPreviewCardProps = {
  label: string;
  address: string;
  isFrom?: boolean;
  onCopy: (address: string) => void;
};

export function WalletPreviewCard({
  label,
  address,
  isFrom = false,
  onCopy,
}: WalletPreviewCardProps) {
  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 4)}…${addr.slice(-4)}`;

  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${
            isFrom
              ? "bg-purple-500/20 border-purple-500/30"
              : "bg-blue-500/20 border-blue-500/30"
          }`}
        >
          <Image
            src="/solana-sol-logo.svg"
            alt="Solana"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <div>
          <p className="font-semibold text-white text-lg">{label}</p>
          <p className="text-white/60 text-sm font-mono">
            {truncateAddress(address)}
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/20"
        onClick={() => onCopy(address)}
      >
        <Copy className="w-4 h-4" />
      </Button>
    </div>
  );
}
