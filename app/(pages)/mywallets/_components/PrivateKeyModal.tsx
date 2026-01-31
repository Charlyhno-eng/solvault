"use client";

import ButtonAction from "@/helpers/ui/MyComponents/ButtonAction";
import { useEffect } from "react";

type PrivateKeyModalProps = {
  secretKeyBs58: string;
  isOpen: boolean;
  onClose: () => void;
};

function PrivateKeyModal({
  secretKeyBs58,
  isOpen,
  onClose,
}: PrivateKeyModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(secretKeyBs58);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-black/95 border border-white/20 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Private Key (Base58)</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-xl p-1 -m-1 rounded-lg hover:bg-white/10 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-black/50 p-4 rounded-lg border border-white/10">
            <div className="font-mono text-sm bg-black/20 p-4 rounded-lg select-all break-all text-white border border-white/20">
              {secretKeyBs58}
            </div>
          </div>

          <div className="flex justify-center">
            <ButtonAction variant="primary" size="lg" onClick={handleCopy}>
              📋 Copy Private Key
            </ButtonAction>
          </div>

          <p className="text-xs text-orange-400 text-center font-medium">
            ⚠️ Never share this key. Anyone with it controls your wallet.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivateKeyModal;
