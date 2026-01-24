import type { SolanaWallet } from "@/features/web3js/types";
import { db } from "@/infrastructures/database/db";
import type { WalletInsert } from "./types";

/**
 * Inserts a new wallet record into the database.
 *
 * @param wallet - Wallet data to insert containing public key, label, and secret key
 * @returns Promise<void>
 */
export async function insertWallet(wallet: WalletInsert): Promise<void> {
  const stmt = db.prepare(`
    INSERT INTO wallets (public_key, label, secret_key_bs58)
    VALUES (?, ?, ?)
  `);
  stmt.run(wallet.publicKey, wallet.label, wallet.secretKeyBs58);
}

/**
 * Retrieves all wallet records ordered by creation date (newest first).
 *
 * @returns Array of all wallet records
 */
export function getWallets(): SolanaWallet[] {
  return db
    .prepare("SELECT * FROM wallets ORDER BY created_at DESC")
    .all() as SolanaWallet[];
}

/**
 * Retrieves a single wallet by its public key.
 *
 * @param publicKey - Public key string to lookup
 * @returns Wallet record matching the public key or null if not found
 */
export function getWallet(publicKey: string): SolanaWallet | null {
  return db
    .prepare("SELECT * FROM wallets WHERE public_key = ?")
    .get(publicKey) as SolanaWallet | null;
}
