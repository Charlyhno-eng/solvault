import { fetchSolanaPrice } from "@/infrastructures/external/coingecko";
import { useCallback, useEffect, useState } from "react";

export const useSolPrice = () => {
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
};
