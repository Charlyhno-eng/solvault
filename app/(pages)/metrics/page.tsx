"use client";

import { fetchSolanaMetrics } from "@/features/web3js/solanaMetrics";
import type { Metrics } from "@/features/web3js/types";
import {
  formatIdWithHash,
  formatTimeAgo,
  toString,
  unixToLocalTime,
} from "@/helpers/commons/format";
import { useEffect, useState } from "react";

function PageMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function refreshData() {
    setLoading(true);
    try {
      setMetrics(await fetchSolanaMetrics());
    } catch (error) {
      console.error("Error fetching metrics:", error);
      setMetrics(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(function () {
    refreshData();
    const tenMinutesInterval = setInterval(refreshData, 600000);
    return function () {
      clearInterval(tenMinutesInterval);
    };
  }, []);

  if (loading || !metrics) {
    return (
      <div className="h-[90vh] overflow-y-auto text-white">
        <div className="w-[88rem] mx-auto px-8 flex items-center justify-center h-full">
          <div className="text-center">
            Loading Solana transaction metrics...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[90vh] overflow-y-auto text-white font-mono text-sm">
      <div className="w-[88rem] mx-auto px-8 space-y-8 py-8">
        <h1 className="text-2xl mb-8 border-b border-gray-700 pb-4">
          Solana Transaction Metrics
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-black/20 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-white/30 transition-all">
            <h2 className="text-lg font-bold mb-4">SOL Price</h2>
            <div className="text-3xl font-bold text-green-400">
              ${metrics.solPrice.toFixed(2)}
            </div>
          </div>

          <div className="bg-black/20 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-white/30 transition-all">
            <h2 className="text-lg font-bold mb-4">Avg TX Fee</h2>
            <div className="text-2xl font-bold">
              {metrics.avgTxFee.toFixed(6)} SOL
            </div>
            <div className="text-gray-400 text-xs">
              ~${(metrics.avgTxFee * metrics.solPrice).toFixed(6)}
            </div>
          </div>

          <div className="bg-black/20 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-white/30 transition-all">
            <h2 className="text-lg font-bold mb-4">Current TPS</h2>
            <div className="text-3xl font-bold text-blue-400">
              {metrics.tps.toFixed(0)}
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-6 rounded-xl md:col-span-2 lg:col-span-2 shadow-xl hover:shadow-2xl transition-all">
            <h2 className="text-lg font-bold mb-4">Average Time</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-xl font-bold">
                  {metrics.avgBlockTime.toFixed(1)}s
                </div>
                <div className="text-gray-400 text-xs">Block</div>
              </div>
              <div>
                <div className="text-xl font-bold">
                  {metrics.avgConfirmationTime.toFixed(1)}s
                </div>
                <div className="text-gray-400 text-xs">Confirmation</div>
              </div>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-6 rounded-xl md:col-span-2 lg:col-span-1 shadow-xl hover:shadow-2xl transition-all">
            <h2 className="text-lg font-bold mb-4">24h TX</h2>
            <div className="text-4xl font-bold text-center text-purple-400">
              {Math.round(metrics.totalTx24h).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="bg-black/10 p-6 rounded-xl backdrop-blur-md border border-gray-600/30">
          <h2 className="text-lg font-bold mb-4">Last 10 Blocks</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left pb-2 pr-4">Slot</th>
                  <th className="text-left pb-2 pr-4">TX</th>
                  <th className="text-left pb-2 pr-4">Time</th>
                  <th className="text-left pb-2">Ago</th>
                </tr>
              </thead>
              <tbody>
                {metrics.recentBlocks.map(
                  function renderBlockRow(block, index) {
                    return (
                      <tr
                        key={index}
                        className="border-b border-gray-800/50 hover:bg-white/5"
                      >
                        <td className="font-mono pr-4">
                          {formatIdWithHash(block.slot)}
                        </td>
                        <td className="pr-4">{toString(block.numTx)}</td>
                        <td className="pr-4">
                          {unixToLocalTime(block.blockTime)}
                        </td>
                        <td>{formatTimeAgo(block.blockTime)}</td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-xs text-gray-400 text-center">
          Auto-refresh 10min | Live Mainnet Beta
        </div>
      </div>
    </div>
  );
}

export default PageMetrics;
