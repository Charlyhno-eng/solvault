import { deleteWallet } from "@/features/wallet/queries";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Wallet ID missing from URL" },
        { status: 400 },
      );
    }

    const walletId = Number(id);

    if (isNaN(walletId) || walletId <= 0) {
      return NextResponse.json(
        { error: "Invalid wallet ID format" },
        { status: 400 },
      );
    }

    const result = deleteWallet(walletId);

    if (result.changes === 0) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, deletedId: walletId, changes: result.changes },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete wallet error:", error);
    return NextResponse.json(
      { error: "Failed to delete wallet" },
      { status: 500 },
    );
  }
}
