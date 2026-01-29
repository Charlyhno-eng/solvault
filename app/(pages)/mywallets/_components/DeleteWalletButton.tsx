"use client";

import StatusCard from "@/helpers/ui/StatusCard";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";

type DeleteWalletButtonProps = {
  walletId: number;
  onDeleteSuccess?: () => void;
  className?: string;
};

export default function DeleteWalletButton({
  walletId,
  onDeleteSuccess,
  className = "",
}: DeleteWalletButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<{
    message: string;
    type: "loading" | "success" | "error";
  } | null>(null);

  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to permanently delete this wallet?"))
      return;

    startTransition(async () => {
      setIsDeleting(true);
      setDeleteStatus({ message: "Deleting wallet...", type: "loading" });

      try {
        const response = await fetch(`/api/wallet/${walletId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to delete wallet");
        }

        const result = await response.json();
        setDeleteStatus({
          message: `Wallet #${walletId} deleted successfully`,
          type: "success",
        });

        if (onDeleteSuccess) onDeleteSuccess();
      } catch (error) {
        setDeleteStatus({
          message: error instanceof Error ? error.message : "Delete failed",
          type: "error",
        });
      } finally {
        setIsDeleting(false);
        setTimeout(() => setDeleteStatus(null), 3000);
      }
    });
  };

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={isDeleting || isPending}
        className={cn(
          "relative px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 border flex items-center gap-1.5 shadow-sm",
          "border-red-500/60 bg-red-500/20 text-red-300 hover:bg-red-500/30 hover:border-red-500/80 hover:shadow-md active:scale-95 active:top-[-8px] disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        )}
      >
        {isDeleting ? (
          <>
            <div className="w-2.5 h-2.5 border-2 border-red-400/50 border-t-red-400 rounded-full animate-spin" />
            <span className="font-medium">Deleting...</span>
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Delete</span>
          </>
        )}
      </button>

      {deleteStatus && (
        <StatusCard type={deleteStatus.type} message={deleteStatus.message} />
      )}
    </>
  );
}
