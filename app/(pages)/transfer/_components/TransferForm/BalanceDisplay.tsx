type BalanceDisplayProps = {
  balance: number | null;
  loading: boolean;
};

export function BalanceDisplay({ balance, loading }: BalanceDisplayProps) {
  if (loading) {
    return (
      <span className="text-xs text-white/40 animate-pulse">Loading...</span>
    );
  }
  if (balance === null) {
    return (
      <span className="text-xs text-orange-400 font-medium">Unavailable</span>
    );
  }
  return (
    <span className="font-semibold text-green-400 text-sm">
      {balance.toFixed(balance < 0.01 ? 6 : 4)} SOL
    </span>
  );
}
