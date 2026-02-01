"use client";

import { Button } from "@/helpers/ui/BasicShadCn/button";
import { Send, Shield } from "lucide-react";

type TransactionFooterProps = {
  isProcessing: boolean;
  onSend: () => void;
  disabled?: boolean;
};

export function TransactionFooter({
  isProcessing,
  onSend,
  disabled,
}: TransactionFooterProps) {
  return (
    <div className="space-y-3 pt-4 border-t border-white/10">
      <div className="flex items-center gap-2 text-xs text-white/60">
        <Shield className="w-4 h-4" />
        <span>Transaction secured by Solana Network</span>
      </div>

      <Button
        size="lg"
        onClick={onSend}
        disabled={disabled || isProcessing}
        className="w-full h-14 bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-lg font-bold rounded-2xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-200 disabled:from-gray-600 disabled:via-gray-600 disabled:to-gray-600 disabled:shadow-none disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send SOL
          </>
        )}
      </Button>
    </div>
  );
}
