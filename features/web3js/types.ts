import { Keypair } from "@solana/web3.js";

export type WalletInfo = {
  balanceSOL: number;
  dataLength: number | null;
  owner: string | null;
  isValidCurve: boolean;
};

export type WalletPossiblyNull = {
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

export type TransferResult =
  | {
      success: true;
      signature: string;
      blockhash: string;
      amountSOL: number;
      from: string;
      to: string;
      timestamp: string;
      fee: number;
    }
  | {
      success: false;
      error: TransferError;
      signature: null;
    };

export type TransferError =
  | "Invalid from wallet public key"
  | "Invalid to wallet public key"
  | "Insufficient balance. Available: X SOL"
  | "Transaction failed: X"
  | "Network error"
  | "Transfer failed";
