import type { WalletTableType } from "@/features/wallet/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/helpers/ui/BasicShadCn/select";
import Image from "next/image";

type WalletSelectProps = {
  wallets: WalletTableType[];
  selectedId: number | null;
  onChange: (id: number | null) => void;
  isFrom?: boolean;
  excludeId?: number | null;
  showAddress?: boolean;
};

export function WalletSelect({
  wallets,
  selectedId,
  onChange,
  isFrom = false,
  excludeId = null,
  showAddress = false,
}: WalletSelectProps) {
  const availableWallets = excludeId
    ? wallets.filter((w) => w.id !== excludeId)
    : wallets;

  return (
    <Select
      value={selectedId?.toString() || ""}
      onValueChange={(v) => onChange(v === "custom" ? null : Number(v))}
    >
      <SelectTrigger className="w-full h-14 bg-white/20 border-white/30 text-white font-mono rounded-xl backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-purple-500/50 hover:bg-white/25 transition-all duration-200">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-black/90 border-white/30 text-white w-[320px] backdrop-blur-md shadow-2xl">
        {availableWallets.map((wallet) => (
          <SelectItem
            key={wallet.id}
            value={wallet.id.toString()}
            className="font-mono"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isFrom ? "bg-purple-500/20" : "bg-blue-500/20"
                }`}
              >
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
                {showAddress && (
                  <div className="text-xs text-white/60 font-mono">
                    {`${wallet.public_key.slice(0, 8)}...${wallet.public_key.slice(-8)}`}
                  </div>
                )}
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
