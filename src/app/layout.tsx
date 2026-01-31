import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";
import { SolanaWalletProvider } from "@/components/Providers";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sol-Link | Send SOL Privately",
  description: "Send SOL Privately – No Trails, No Links Exposed. Powered by zero-knowledge mixer tech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${outfit.variable} font-outfit antialiased bg-neutral-950 text-white`}
      >
        <SolanaWalletProvider>
          {children}
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
