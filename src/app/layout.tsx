import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { SolanaWalletProvider } from "@/components/Providers";
import { Analytics } from "@vercel/analytics/next";

import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sol-Link | Private SOL Sharing",
  description: "Send SOL privately with zero-knowledge secret links. Powered by Helius.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${plusJakarta.variable} ${bricolage.variable} ${jetbrainsMono.variable} antialiased`}>
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="981f814d-4ade-4c91-82e9-555623bff8aa"
        />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <SolanaWalletProvider>
          {children}
        </SolanaWalletProvider>
        <Analytics />
      </body>
    </html>
  );
}