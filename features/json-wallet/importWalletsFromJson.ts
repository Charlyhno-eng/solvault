import type { WalletTableType } from "@/features/wallet/types";
import { decryptWallets } from "./crypto";

/**
 * Opens a native file picker for encrypted JSON wallet files (wallets.enc.json) and imports them into the database.
 *
 * Automatically decrypts encrypted wallet files using AES-256-GCM, validates data, and imports via API.
 *
 * @returns Promise<{ success: number; error: number }> - Import statistics
 * @returns { success: number } - Number of wallets successfully imported to database
 * @returns { error: number } - Number of wallets that failed (duplicates, validation errors, network issues)
 *
 * @throws Error - When no valid wallets found after decryption/parsing or file picker canceled
 *
 * @example
 * const result = await importWalletsFromJson();
 * console.log(`${result.success} successful, ${result.error} errors`);
 */
export function importWalletsFromJson(): Promise<{
  success: number;
  error: number;
}> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.multiple = true;
    input.webkitdirectory = false;

    input.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;

      if (!files || files.length === 0) {
        resolve({ success: 0, error: 0 });
        return;
      }

      const importedWallets: Omit<WalletTableType, "id" | "created_at">[] = [];
      const errors: string[] = [];

      for (const file of Array.from(files)) {
        try {
          const text = await file.text();
          const walletsData = decryptWallets(text);

          for (const walletData of walletsData) {
            if (
              !walletData.publicKey ||
              typeof walletData.publicKey !== "string"
            ) {
              errors.push(`Invalid publicKey in ${file.name}`);
              continue;
            }
            if (
              !walletData.secretKeyBs58 ||
              typeof walletData.secretKeyBs58 !== "string"
            ) {
              errors.push(`Invalid secretKeyBs58 in ${file.name}`);
              continue;
            }

            importedWallets.push({
              public_key: walletData.publicKey,
              secret_key_bs58: walletData.secretKeyBs58,
              label: walletData.label || `Imported from ${file.name}`,
            });
          }
        } catch (parseError) {
          errors.push(
            `Failed to decrypt/parse ${file.name}: ${(parseError as Error).message}`,
          );
        }
      }

      if (importedWallets.length === 0) {
        reject(new Error("No valid wallets found in selected files"));
        return;
      }

      let successCount = 0;
      let errorCount = 0;

      for (const wallet of importedWallets) {
        try {
          const response = await fetch("/api/wallet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              publicKey: wallet.public_key,
              label: wallet.label,
              secretKeyBs58: wallet.secret_key_bs58,
            }),
          });

          if (response.ok) successCount++;
          else errorCount++;
        } catch (error) {
          errorCount++;
        }
      }

      resolve({ success: successCount, error: errorCount });
    };

    input.click();
  });
}
