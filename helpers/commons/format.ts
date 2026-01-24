/**
 * Formats a numeric identifier with # prefix and thousands separators.
 * @param slot - The numeric identifier to format
 * @returns Formatted string like "#1,234,567"
 */
export function formatIdWithHash(slot: number): string {
  return `#${slot.toLocaleString()}`;
}

/**
 * Converts a number to its simple string representation.
 * @param numTx - The number to convert
 * @returns String representation of the number
 */
export function toString(numTx: number): string {
  return numTx.toString();
}

/**
 * Converts Unix timestamp (seconds) to local time string.
 * @param blockTime - Unix timestamp in seconds or null/undefined
 * @returns Formatted local time string (e.g. "22:45:00") or "N/A"
 */
export function unixToLocalTime(blockTime: number | undefined | null): string {
  if (!blockTime) return "N/A";
  return new Date(blockTime * 1000).toLocaleTimeString();
}

/**
 * Calculates relative time ago in minutes from Unix timestamp.
 * @param blockTime - Unix timestamp in seconds or null/undefined
 * @returns String like "5m" or "N/A" if no timestamp
 */
export function formatTimeAgo(blockTime: number | undefined | null): string {
  if (!blockTime) return "N/A";
  const minutesAgo = Math.floor((Date.now() / 1000 - blockTime) / 60);
  return `${minutesAgo}m`;
}
