import { getSolanaConnection } from "@/infrastructures/external/solanaConnection";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { restoreWalletFromBs58 } from "./createSolanaWallet";
import type { TransferError, TransferResult } from "./types";

export type TransferParams = {
  fromSecretKey: string;
  toPublicKey: string;
  amountSOL: number;
  walletId: number;
};

/**
 * Transfers SOL tokens from one wallet to another with comprehensive error handling and balance validation.
 *
 * @param params - Transfer configuration object
 * @param params.fromSecretKey - Base58-encoded secret key of the source wallet
 * @param params.toPublicKey - Base58-encoded public key of the destination wallet
 * @param params.amountSOL - Amount of SOL to transfer (in SOL, not lamports)
 * @param params.walletId - Database ID of the source wallet for logging
 * @returns Promise<TransferResult> - Result object containing transaction signature on success, or detailed error on failure
 */
export async function transferSol(
  params: TransferParams,
): Promise<TransferResult> {
  try {
    const connection = getSolanaConnection();
    const fromKeypair = restoreWalletFromBs58(params.fromSecretKey);
    const toPublicKey = new PublicKey(params.toPublicKey);

    if (!PublicKey.isOnCurve(fromKeypair.publicKey.toBytes())) {
      throw new Error("Invalid from wallet public key");
    }
    if (!PublicKey.isOnCurve(toPublicKey.toBytes())) {
      throw new Error("Invalid to wallet public key");
    }

    const balance = await connection.getBalance(fromKeypair.publicKey);
    const amountLamports = Math.floor(params.amountSOL * LAMPORTS_PER_SOL);
    const minRequired = amountLamports + 5000 * 2;

    if (balance < minRequired) {
      const balanceSOL = Number(balance) / LAMPORTS_PER_SOL;
      throw new Error(
        `Insufficient balance. Available: ${balanceSOL.toFixed(6)} SOL`,
      );
    }

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash("confirmed");

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toPublicKey,
        lamports: amountLamports,
      }),
    );

    transaction.recentBlockhash = blockhash;
    transaction.lastValidBlockHeight = lastValidBlockHeight;
    transaction.feePayer = fromKeypair.publicKey;

    transaction.sign(fromKeypair);
    const signature = await connection.sendRawTransaction(
      transaction.serialize(),
    );

    const confirmation = await connection.confirmTransaction(
      {
        signature,
        blockhash,
        lastValidBlockHeight,
      },
      "confirmed",
    );

    if (confirmation.value.err) {
      throw new Error(`Transaction failed: ${confirmation.value.err}`);
    }

    return {
      success: true,
      signature,
      blockhash,
      amountSOL: params.amountSOL,
      from: fromKeypair.publicKey.toBase58(),
      to: params.toPublicKey,
      timestamp: new Date().toISOString(),
      fee: 0.000005,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Transfer failed";
    return {
      success: false,
      error: errorMessage as TransferError,
      signature: null,
    };
  }
}
