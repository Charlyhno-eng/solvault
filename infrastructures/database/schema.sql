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

-- Current holdings per wallet (SOL + tokens)
CREATE TABLE wallet_holdings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wallet_public_key TEXT NOT NULL,
  symbol TEXT NOT NULL, -- SOL, USDC, etc.
  mint_address TEXT, -- NULL for native SOL
  balance REAL NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (wallet_public_key) REFERENCES wallets(public_key),
  UNIQUE(wallet_public_key, symbol)
);

-- Index
CREATE INDEX idx_logs_wallet_time ON transaction_logs(wallet_public_key, timestamp DESC);
CREATE INDEX idx_holdings_wallet ON wallet_holdings(wallet_public_key);

-- Trigger updated_at
CREATE TRIGGER update_holdings_updated_at
  AFTER UPDATE ON wallet_holdings
  FOR EACH ROW
BEGIN
  UPDATE wallet_holdings SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
