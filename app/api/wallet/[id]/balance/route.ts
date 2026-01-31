import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";

const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { searchParams } = new URL(request.url);
    const publicKey = searchParams.get("publicKey");

    if (!publicKey) {
      return NextResponse.json({ error: "Missing publicKey" }, { status: 400 });
    }

    const connection = new Connection(RPC_ENDPOINT, "confirmed");
    const pk = new PublicKey(publicKey);
    const lamports = await connection.getBalance(pk);
    const balance = Number(lamports) / LAMPORTS_PER_SOL;

    return NextResponse.json({ balance });
  } catch (error) {
    console.error("Balance fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch balance" },
      { status: 500 },
    );
  }
}
