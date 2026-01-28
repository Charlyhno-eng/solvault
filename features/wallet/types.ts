export type WalletInsert = {
  publicKey: string;
  label: string;
  secretKeyBs58: string;
};

export type WalletTableType = {
  id: number;
  public_key: string;
  label?: string | null;
  secret_key_bs58: string;
  created_at: string;
  notes?: string | null;
};
