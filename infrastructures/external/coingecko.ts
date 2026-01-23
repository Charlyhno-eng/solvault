type CoinPrice = {
  solana: {
    usd: number;
  };
};

export async function fetchSolanaPrice(): Promise<number> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
      {
        cache: "no-store",
        next: { revalidate: 600 },
      },
    );

    const data: CoinPrice = await response.json();
    return data.solana.usd;
  } catch (error) {
    console.error("Coingecko API error:", error);
    return 0;
  }
}
