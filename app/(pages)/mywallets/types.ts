export type WalletDB = {
  id: number;
  public_key: string;
  secret_key_bs58: string;
  label?: string;
  created_at: string;
  notes?: string;
};
