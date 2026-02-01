import { RPC_PUBLICNODE } from "@/helpers/commons/constants";
import { Connection } from "@solana/web3.js";

let solanaConnection: Connection | null = null;

export function getSolanaConnection(): Connection {
  if (!solanaConnection) {
    solanaConnection = new Connection(RPC_PUBLICNODE, "confirmed");
  }
  return solanaConnection;
}

export function resetSolanaConnection(): void {
  solanaConnection = null;
}
