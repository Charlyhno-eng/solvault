import { Keypair } from "@solana/web3.js";

export type WalletInfo = {
  balanceSOL: number;
  dataLength: number | null;
  owner: string | null;
  isValidCurve: boolean;
};

export type SolanaWallet = {
  publicKey: string;
  secretKeyArray: number[];
  secretKeyBs58: string;
  keypair: Keypair;
  label?: string;
} | null;

export type Metrics = {
  solPrice: number;
  avgTxFee: number;
  avgBlockTime: number;
  tps: number;
  avgConfirmationTime: number;
  recentBlocks: ReadonlyArray<{
    slot: number;
    blockTime: number | null;
    numTx: number;
    timestamp: string;
  }>;
  totalTx24h: number;
};

export type recentBlocksType = {
  slot: number;
  blockTime: number | null;
  numTx: number;
  timestamp: string;
}[];
