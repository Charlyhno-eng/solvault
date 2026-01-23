import { fetchSolanaPrice } from "@/infrastructures/external/coingecko";
import { getSolanaConnection } from "@/infrastructures/external/solanaConnection";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import type { Metrics } from "./types";

export async function fetchSolanaMetrics(): Promise<Metrics> {
  const connection = getSolanaConnection();

  const [performanceSamples, transactionCount, blockHeight, solPrice] =
    await Promise.all([
      connection.getRecentPerformanceSamples(10),
      connection.getTransactionCount(),
      connection.getBlockHeight(),
      fetchSolanaPrice(),
    ]);

  const recentBlocks = [];
  for (let i = 0; i < 10; i++) {
    try {
      const slot = blockHeight! - i;
      const block = await connection.getBlock(slot, {
        maxSupportedTransactionVersion: 0,
      });
      recentBlocks.push({
        slot,
        blockTime: block?.blockTime || null,
        numTx: block?.transactions?.length || 0,
        timestamp: block?.blockTime
          ? new Date(block?.blockTime * 1000).toISOString()
          : "N/A",
      });
    } catch (e) {
      continue;
    }
  }

  const samplePeriod = performanceSamples[0]?.samplePeriodSecs || 60;
  const totalTx = performanceSamples.reduce(function (acc, sample) {
    return acc + sample.numTransactions;
  }, 0);
  const totalSlots = performanceSamples.reduce(function (acc, sample) {
    return acc + sample.numSlots;
  }, 0);

  const avgTxFee = 5000 / LAMPORTS_PER_SOL;
  const avgBlockTime =
    (samplePeriod * totalSlots) / performanceSamples.length / 1000;
  const tps = totalTx / (samplePeriod * performanceSamples.length);
  const avgConfirmationTime = samplePeriod * 0.4;

  return {
    solPrice,
    avgTxFee,
    avgBlockTime,
    tps,
    avgConfirmationTime,
    recentBlocks,
    totalTx24h: (transactionCount * 1440) / 24,
  };
}
