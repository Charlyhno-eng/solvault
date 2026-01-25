export type WalletJson = {
  publicKey: string;
  secretKeyBs58: string;
  label?: string;
};

export type ImportStats = {
  success: number;
  error: number;
};
