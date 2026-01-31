import { useCallback, useEffect, useState } from "react";

export const useWalletBalance = (
  walletId: number | null,
  publicKey: string,
) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBalance = useCallback(async () => {
    if (!walletId || !publicKey) {
      setBalance(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `/api/wallet/${walletId}/balance?publicKey=${encodeURIComponent(publicKey)}`,
        { cache: "no-store" },
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      if (data.balance !== undefined) {
        setBalance(Number(data.balance));
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      setBalance(null);
    } finally {
      setLoading(false);
    }
  }, [walletId, publicKey]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { balance, loading, refetch: fetchBalance };
};
