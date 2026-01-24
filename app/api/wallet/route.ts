import { getWallets, insertWallet } from "@/features/wallet/queries";
import type { WalletInsert } from "@/features/wallet/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: WalletInsert = await request.json();

    await insertWallet(body);

    return NextResponse.json({
      success: true,
      publicKey: body.publicKey,
    });
  } catch (error) {
    console.error("Wallet save error:", error);
    return NextResponse.json(
      { error: "Failed to save wallet" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const wallets = await getWallets();
    return NextResponse.json(wallets);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch wallets" },
      { status: 500 },
    );
  }
}
