"use client";

import { useSolPrice } from "@/helpers/commons/useSolPrice";

export function TransactionSummary({ amount }: { amount: number }) {
  const fee = 0.000005;
  const total = amount + fee;
  const { price: solPrice } = useSolPrice();

  return (
    <div className="space-y-4 pt-4 border-t border-white/10">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-white/60">
          <span>Amount</span>
          <span>{amount.toLocaleString()} SOL</span>
        </div>
        <div className="flex justify-between text-sm text-white/60">
          <span>Network fee</span>
          <span>~{fee} SOL</span>
        </div>
      </div>

      <div className="bg-linear-to-r from-purple-500/20 to-blue-500/20 p-4 rounded-xl border border-white/10">
        <div className="flex justify-between items-baseline">
          <span className="text-3xl font-bold text-white">Total</span>
          <div className="text-right">
            <div className="text-3xl font-black text-white">
              {total.toLocaleString()} SOL
            </div>
            <div className="text-sm text-white/60 font-mono">
              ~${(total * solPrice).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
