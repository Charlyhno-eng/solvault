"use client";

import Image from "next/image";
import { useState } from "react";

type WalletHeaderProps = {
  walletId: number;
  label?: string;
  createdAt: string;
  onCopy: () => void;
  copied: boolean;
  onLabelChange?: (newLabel: string) => void;
};

function WalletHeader({
  walletId,
  label,
  createdAt,
  onCopy,
  copied,
  onLabelChange,
}: WalletHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(label || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const commit = async () => {
    if (isUpdating) {
      return;
    }

    const next = editLabel.trim();
    if (!next) {
      setEditLabel(label || "");
      setIsEditing(false);
      return;
    }

    setIsUpdating(true);

    try {
      const response = await fetch(`/api/wallet/${walletId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: next }),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      onLabelChange?.(next);
      setIsEditing(false);
    } catch {
      setEditLabel(label || "");
      setIsEditing(false);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commit();
    } else if (e.key === "Escape") {
      setEditLabel(label || "");
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 bg-linear-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-purple-400/30 p-1.5">
          <Image
            src="/solana-sol-logo.svg"
            alt="Solana"
            width={28}
            height={28}
            className="object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          {isEditing ? (
            <input
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isUpdating}
              className="bg-white/10 border border-white/30 backdrop-blur-sm text-white placeholder-white/50 text-base font-semibold px-2 py-1.5 rounded focus:outline-none focus:border-white/50 w-full transition-all"
              placeholder="Enter wallet name"
              autoFocus
            />
          ) : (
            <h3
              className="font-semibold text-white truncate text-base cursor-pointer hover:text-white/90 transition-colors"
              onClick={() => {
                setEditLabel(label || "");
                setIsEditing(true);
              }}
              title="Click to edit"
            >
              {label || "Unnamed"}
            </h3>
          )}

          <p className="text-xs text-white/50">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <button
        onClick={onCopy}
        className="p-2 -m-2 rounded-lg hover:bg-white/10 transition-all"
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
  );
}

export default WalletHeader;
