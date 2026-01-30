"use client";

import TransferForm from "./_components/TransferForm";
import TransferHeader from "./_components/TransferHeader";
import TransferPreview from "./_components/TransferPreview";

export default function PageTransfer() {
  return (
    <div className="min-h-[90vh] py-12 px-6 md:px-12 text-white bg-linear-to-br from-gray-900/50 to-black/60">
      <div className="max-w-5xl mx-auto">
        <TransferHeader />
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch mt-16">
          <TransferForm />
          <TransferPreview />
        </div>
      </div>
    </div>
  );
}
