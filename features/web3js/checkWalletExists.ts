import { getSolanaConnection } from "@/infrastructures/external/solanaConnection";
import { AccountInfo, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import type { WalletInfo } from "./types";

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

    return {
      balanceSOL,
      dataLength,
      owner,
      isValidCurve,
    };
  } catch (error) {
    console.error("Error check wallet:", error);
    throw error;
  }
}
