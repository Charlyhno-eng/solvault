export type WalletInsert = {
  publicKey: string;
  secretKeyBs58: string;
  label?: string | null;
};

export type WalletTableType = {
  id: number;
  public_key: string;
  label?: string | null;
  secret_key_bs58: string;
  created_at: string;
  notes?: string | null;
};
