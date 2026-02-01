import { getWalletById, getWallets } from "@/features/wallet/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const walletId = Number(searchParams.get("walletId"));

    if (walletId) {
      const wallet = getWalletById(walletId);
      if (!wallet) {
        return NextResponse.json(
          { error: "Wallet not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({
        id: wallet.id,
        publicKey: wallet.public_key,
        secretKeyBs58: wallet.secret_key_bs58,
        label: wallet.label,
      });
    }

    const wallets = getWallets();
    return NextResponse.json(wallets);
  } catch (error) {
    console.error("Wallet fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch wallets" },
      { status: 500 },
    );
  }
}
