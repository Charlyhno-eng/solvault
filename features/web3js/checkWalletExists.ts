import { getSolanaConnection } from "@/infrastructures/external/solanaConnection";
import { AccountInfo, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import type { WalletInfo } from "./types";

/**
 * Validates a wallet address and retrieves its current state information.
 *
 * @param publicKeyString - Base58-encoded public key string of the wallet to check
 * @returns Promise<WalletInfo> - Wallet state containing:
 *   - `balanceSOL`: Current balance in SOL (lamports converted to SOL)
 *   - `dataLength`: Length of account data in bytes or null
 *   - `owner`: Base58-encoded program owner of the account or null
 *   - `isValidCurve`: Whether the public key is on the curve (validity check)
 * @throws Error if public key is invalid or network request fails
 */
export async function checkWalletExists(
  publicKeyString: string,
): Promise<WalletInfo> {
  try {
    const connection = getSolanaConnection();
    const publicKey = new PublicKey(publicKeyString);

    const balance = await connection.getBalance(publicKey);
    const balanceSOL = Number(balance) / LAMPORTS_PER_SOL;

    const accountInfo: AccountInfo<Buffer> | null =
      await connection.getAccountInfo(publicKey);

    const dataLength = accountInfo?.data?.length || null;
    const owner = accountInfo?.owner?.toBase58() || null;
    const isValidCurve = PublicKey.isOnCurve(publicKey.toBytes());

    console.log("Balance SOL:", balanceSOL);
    console.log("Data length:", dataLength);
    console.log("Owner:", owner);
    console.log("Clé valide ?", isValidCurve);

    return { balanceSOL, dataLength, owner, isValidCurve };
  } catch (error) {
    console.error("Error check wallet:", error);
    throw error;
  }
}
