/**
 * Downloads all encrypted wallets as `wallets.enc.json` from the server API.
 *
 * Triggers a native browser download of encrypted wallet data. The file is already
 * encrypted server-side using AES-256-GCM before transmission.
 *
 * @returns Promise<void> - Resolves when download completes successfully
 *
 * @throws Error - When API request fails, network error occurs, or download fails
 *
 * @example
 * await exportWalletsToJson();
 * // Browser downloads 'wallets.enc.json' (already encrypted)
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
    link.download = "wallets.enc.json";
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
