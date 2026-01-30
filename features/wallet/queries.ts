import { db } from "@/infrastructures/database/db";
import type { WalletInsert, WalletTableType } from "./types";

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
export function getWallets(): WalletTableType[] {
  return db
    .prepare("SELECT * FROM wallets ORDER BY created_at DESC")
    .all() as WalletTableType[];
}

/**
 * Deletes a wallet by its ID.
 *
 * @param walletId - Numeric ID of wallet to delete
 * @returns DeleteResult - Database delete operation result
 */
export function deleteWallet(walletId: number): { changes: number } {
  const stmt = db.prepare("DELETE FROM wallets WHERE id = ?");
  return stmt.run(walletId);
}

/**
 * Updates wallet label by ID.
 *
 * @param walletId - Numeric ID of wallet to update
 * @param label - New label (string or null for empty)
 * @returns UpdateResult - Database update operation result
 */
export function updateWalletLabel(
  walletId: number,
  label: string | null,
): { changes: number } {
  const stmt = db.prepare("UPDATE wallets SET label = ? WHERE id = ?");
  return stmt.run(label, walletId);
}
