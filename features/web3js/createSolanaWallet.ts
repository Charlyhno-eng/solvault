import { Keypair } from "@solana/web3.js";
import { decode, encode } from "bs58";
import type { WalletPossiblyNull } from "./types";

/**
 * Generates a new random Solana wallet with public key and multiple secret key formats.
 *
 * @returns Promise<WalletPossiblyNull> - Wallet object containing:
 *   - `publicKey`: Base58-encoded public address string
 *   - `secretKeyArray`: Secret key as Uint8Array converted to number array
 *   - `secretKeyBs58`: Secret key encoded in Base58 string format
 *   - `keypair`: Raw Solana Keypair object for direct use
 */
export async function createSolanaWallet(): Promise<WalletPossiblyNull> {
  const keypair = Keypair.generate();

  const wallet: WalletPossiblyNull = {
    publicKey: keypair.publicKey.toBase58(),
    secretKeyArray: Array.from(keypair.secretKey),
    secretKeyBs58: encode(keypair.secretKey),
    keypair,
  };

  return wallet;
}

/**
 * Restores a Solana Keypair from a Base58-encoded secret key string.
 *
 * @param secretKeyBs58 - Base58-encoded secret key string (typically 88 characters)
 * @returns Keypair instance ready for signing transactions
 *
 * @example
 * const keypair = restoreWalletFromBs58("your-bs58-secret-key-here");
 * console.log(keypair.publicKey.toBase58());
 */
export function restoreWalletFromBs58(secretKeyBs58: string): Keypair {
  const secretKey = decode(secretKeyBs58);
  return Keypair.fromSecretKey(secretKey);
}
