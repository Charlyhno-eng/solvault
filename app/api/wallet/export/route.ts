import { getWallets } from "@/features/wallet/queries";
import type { WalletTableType } from "@/features/wallet/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const wallets: WalletTableType[] = getWallets();

    if (wallets.length === 0) {
      return NextResponse.json({ error: "No wallets found" }, { status: 404 });
    }

    const exportData = wallets.map((wallet: WalletTableType) => ({
      publicKey: wallet.public_key,
      secretKeyBs58: wallet.secret_key_bs58,
      label: wallet.label || undefined,
    }));

    const jsonString = JSON.stringify(exportData, null, 2);

    return new NextResponse(jsonString, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": "attachment; filename=wallets.json",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
