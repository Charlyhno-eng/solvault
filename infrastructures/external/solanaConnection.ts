import { Connection } from "@solana/web3.js";

let solanaConnection: Connection | null = null;

export function getSolanaConnection(): Connection {
  if (!solanaConnection) {
    solanaConnection = new Connection(
      "https://solana-rpc.publicnode.com",
      "confirmed",
    );
  }
  return solanaConnection;
}

export function resetSolanaConnection(): void {
  solanaConnection = null;
}
