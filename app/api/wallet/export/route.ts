import { encryptWallets } from "@/features/json-wallet/crypto";
import { getWallets } from "@/features/wallet/queries";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const wallets = getWallets();

    if (wallets.length === 0) {
      return NextResponse.json({ error: "No wallets found" }, { status: 404 });
    }

    const exportData = wallets.map((wallet) => ({
      publicKey: wallet.public_key,
      secretKeyBs58: wallet.secret_key_bs58,
      label: wallet.label || undefined,
    }));

    const encryptedJson = encryptWallets(exportData);

    return new NextResponse(encryptedJson, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": "attachment; filename=wallets.enc.json",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
