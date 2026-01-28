/**
 * Exports all wallets to a downloadable JSON file.
 *
 * @returns Promise<void> - Triggers browser download of wallets.json
 *
 * @example
 * await exportWalletsToJson();
 * // Browser downloads 'wallets.json' with all wallet data
 */
export async function exportWalletsToJson(): Promise<void> {
  try {
    const response = await fetch("/api/wallet/export");

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const jsonString = await response.text();
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "wallets.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error(
      `Export failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
