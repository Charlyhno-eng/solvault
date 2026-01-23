import { Keypair } from "@solana/web3.js";
import { decode, encode } from "bs58";
import type { SolanaWallet } from "./types";

export async function createSolanaWallet(): Promise<SolanaWallet> {
  const keypair = Keypair.generate();

  const wallet: SolanaWallet = {
    publicKey: keypair.publicKey.toBase58(),
    secretKeyArray: Array.from(keypair.secretKey),
    secretKeyBs58: encode(keypair.secretKey),
    keypair,
  };

  console.log("Wallet Solana créé avec succès !");
  console.log("Clé publique (adresse) :", wallet.publicKey);
  console.log("Clé privée (raw array) :", wallet.secretKeyArray);
  console.log("Clé privée (bs58) :", wallet.secretKeyBs58);

  return wallet;
}

export function restoreWalletFromBs58(secretKeyBs58: string): Keypair {
  const secretKey = decode(secretKeyBs58);
  return Keypair.fromSecretKey(secretKey);
}
