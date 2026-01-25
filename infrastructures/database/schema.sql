-- Table wallets created
CREATE TABLE wallets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_key TEXT UNIQUE NOT NULL,
  label TEXT,
  secret_key_bs58 TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  notes TEXT
);

-- Transaction logs (sent/received)
CREATE TABLE transaction_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wallet_public_key TEXT NOT NULL,
  type TEXT CHECK(type IN ('sent', 'received')) NOT NULL,
  signature TEXT,
  amount_sol REAL NOT NULL,
  counterparty TEXT, -- recipient/source address
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (wallet_public_key) REFERENCES wallets(public_key)
);

-- Index
CREATE INDEX idx_logs_wallet_time ON transaction_logs(wallet_public_key, timestamp DESC);
