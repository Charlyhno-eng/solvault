type WalletCardProps = {
  publicKey: string;
  label?: string;
  createdAt: string;
  notes?: string;
  onCopy: () => void;
  copied: boolean;
};

function WalletCard({
  publicKey,
  label,
  createdAt,
  notes,
  onCopy,
  copied,
}: WalletCardProps) {
  const shortAddress = `${publicKey.slice(0, 8)}...${publicKey.slice(-8)}`;

  return (
    <div className="group bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/30 hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-linear-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-purple-400/30">
            <span className="text-xs font-bold text-purple-300">W</span>
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white truncate text-base">
              {label || "Unnamed"}
            </h3>
            <p className="text-xs text-white/50">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <button
          onClick={onCopy}
          className="p-2 -m-2 rounded-lg hover:bg-white/10 transition-all group-hover:scale-110"
          title="Copy address"
        >
          {copied ? (
            <svg
              className="w-4 h-4 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-white/60 hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <span className="text-xs text-white/50 block mb-1">Address</span>
          <p
            className="font-mono text-white/90 hover:text-white cursor-pointer transition-colors truncate"
            onClick={onCopy}
            title={publicKey}
          >
            {shortAddress}
          </p>
        </div>

        {notes && (
          <div>
            <span className="text-xs text-white/50 block mb-1">Notes</span>
            <p className="text-white/80 truncate max-w-50">{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WalletCard;
