import DarkVeil from "@/helpers/ui/Layout/DarkVeil";
import Navbar from "@/helpers/ui/Layout/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SolVault",
  description: "Manage Solana wallets in one click",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        {/* Background */}
        <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden">
          <DarkVeil
            hueShift={0}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={0.5}
            scanlineFrequency={0}
            warpAmount={0}
          />
        </div>

        {/* Navbar + Content */}
        <div className="relative z-40 min-h-screen">
          <Navbar />
          <div className="pt-0">{children}</div>
        </div>
      </body>
    </html>
  );
}
