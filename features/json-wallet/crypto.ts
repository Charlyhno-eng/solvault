import type { WalletInsert } from "@/features/wallet/types";
import CryptoJS from "crypto-js";

/**
 * Encryption key (256-bit AES-GCM). Keep this secret!
 */
const ENCRYPTION_KEY = "SolVaultSecretKey2026!@#x7K9mP2vQ8wR4tY6uI0oE3a";

/**
 * Encrypts wallet data to base64 string.
 *
 * @param data - Array of WalletInsert objects to encrypt
 * @returns Encrypted base64 string
 */
export function encryptWallets(data: WalletInsert[]): string {
  const jsonString = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(jsonString, ENCRYPTION_KEY);
  return encrypted.toString();
}

/**
 * Decrypts wallet data from base64 string.
 *
 * @param encryptedData - Encrypted base64 string
 * @returns Array of decrypted WalletInsert objects
 * @throws Error - Invalid encryption or decryption failure
 */
export function decryptWallets(encryptedData: string): WalletInsert[] {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const jsonString = decrypted.toString(CryptoJS.enc.Utf8);

    if (!jsonString) throw new Error("Invalid encryption format");

    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error("Failed to decrypt wallets. Wrong file or corrupted data.");
  }
}
