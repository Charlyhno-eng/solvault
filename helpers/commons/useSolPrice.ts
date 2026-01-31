import { fetchSolanaPrice } from "@/infrastructures/external/coingecko";
import { useCallback, useEffect, useState } from "react";

/**
 * Custom React hook to fetch and track the current SOL price in USD from CoinGecko API
 * Updates automatically every 60 seconds with fallback handling
 *
 * @returns {Object} Hook return object
 * @returns {number} price - Current SOL price in USD (0 if failed)
 * @returns {boolean} loading - Loading state during price fetch
 * @returns {() => Promise<void>} refetch - Manual function to refetch price
 *
 * @example
 * const { price, loading, refetch } = useSolPrice();
 * // Usage: ~${amount * price} (at ${price}/SOL)
 */
export function useSolPrice() {
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchPrice = useCallback(async () => {
    try {
      setLoading(true);
      const priceData = await fetchSolanaPrice();
      setPrice(Number(priceData));
    } catch (error) {
      setPrice(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, [fetchPrice]);

  return { price, loading, refetch: fetchPrice };
}
