import { ImportStats, WalletJson } from "./types";

/**
 * Opens a native file picker for JSON wallet files and imports them into the database.
 *
 * @returns Promise<ImportStats> - Resolves with import statistics containing:
 * @returns { success: number } - Number of wallets successfully imported
 * @returns { error: number } - Number of wallets that failed to import (duplicates/network errors)
 *
 * @throws Error - When no valid wallets found in selected files
 *
 * @example
 * const result = await importWalletsFromJson();
 * console.log(`${result.success} successful, ${result.error} errors`);
 */
export function importWalletsFromJson(): Promise<ImportStats> {
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

      const importedWallets: WalletJson[] = [];
      const errors: string[] = [];

      for (const file of Array.from(files)) {
        try {
          const text = await file.text();
          const walletsData = JSON.parse(text) as WalletJson[];

          for (const wallet of walletsData) {
            if (!wallet.publicKey || typeof wallet.publicKey !== "string") {
              errors.push(`Invalid publicKey in ${file.name}`);
              continue;
            }
            if (
              !wallet.secretKeyBs58 ||
              typeof wallet.secretKeyBs58 !== "string"
            ) {
              errors.push(`Invalid secretKeyBs58 in ${file.name}`);
              continue;
            }

            importedWallets.push({
              publicKey: wallet.publicKey,
              secretKeyBs58: wallet.secretKeyBs58,
              label: wallet.label || `Imported from ${file.name}`,
            });
          }
        } catch (parseError) {
          errors.push(
            `Failed to parse ${file.name}: ${(parseError as Error).message}`,
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
            body: JSON.stringify(wallet),
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
