type WalletDetailsProps = {
  address: string;
  notes?: string;
  onCopy: () => void;
  onRevealPrivateKey: () => void;
};

function WalletDetails({
  address,
  notes,
  onCopy,
  onRevealPrivateKey,
}: WalletDetailsProps) {
  return (
    <div className="space-y-3">
      <div>
        <span className="text-xs text-white/50 block mb-1">Address</span>
        <p
          className="font-mono text-white/90 hover:text-white cursor-pointer transition-colors truncate"
          onClick={onCopy}
          title="Click to copy"
        >
          {address}
        </p>
      </div>

      <div>
        <span className="text-xs text-white/50 block mb-1">Private Key</span>
        <button
          onClick={onRevealPrivateKey}
          className="w-full flex items-center justify-between px-3 py-2 text-left bg-black/20 border border-white/10 rounded-lg hover:border-white/30 transition-all group-hover:bg-black/30 text-white/70 hover:text-white text-xs font-mono"
          title="Reveal private key"
        >
          <span>••••••••••••••••••••••••••••••••</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
      </div>

      {notes && (
        <div>
          <span className="text-xs text-white/50 block mb-1">Notes</span>
          <p className="text-white/80 truncate max-w-50">{notes}</p>
        </div>
      )}
    </div>
  );
}

export default WalletDetails;
