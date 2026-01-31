"use client";

import { Badge } from "@/helpers/ui/BasicShadCn/badge";
import { Shield } from "lucide-react";

export function TransactionFooter() {
  return (
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
  );
}
