import type { SolanaWallet } from "@/features/web3js/types";
import { db } from "@/infrastructures/database/db";
import type { WalletInsert } from "./types";

export async function insertWallet(wallet: WalletInsert): Promise<void> {
  const stmt = db.prepare(`
    INSERT INTO wallets (public_key, label)
    VALUES (?, ?)
  `);
  stmt.run(wallet.publicKey, wallet.label);
}

export function getWallets(): SolanaWallet[] {
  return db
    .prepare("SELECT * FROM wallets ORDER BY created_at DESC")
    .all() as SolanaWallet[];
}

export function getWallet(publicKey: string): SolanaWallet | null {
  return db
    .prepare("SELECT * FROM wallets WHERE public_key = ?")
    .get(publicKey) as SolanaWallet | null;
}
