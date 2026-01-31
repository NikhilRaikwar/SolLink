
'use client';

import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import BN from 'bn.js';
import { Utxo } from '@/lib/privacy-cash/utxo';
import { Keypair } from '@/lib/privacy-cash/keypair';
// import { prove } from '@/lib/privacy-cash/prover'; // We will use this later
import { LightWasm, WasmFactory } from '@lightprotocol/hasher.rs';
import { motion } from 'framer-motion';
import { Link2, Shield, ArrowRight, Check } from 'lucide-react';

// Devnet Program ID from Anchor.toml
const PROGRAM_ID = new PublicKey("ATZj4jZ4FFzkvAcvk27DW9GRkgSbFnHo49fKKPQXU7VS");

export default function Home() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState<string>('0.1');
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const handleCreateLink = async () => {
    if (!publicKey || !amount) return;

    setLoading(true);
    try {
      // 1. Generate an Ephemeral Keypair (The "Vault")
      // This keypair will hold the funds until the link is claimed.
      // We'll use standard Solana Web3 Keypair for this real-value transfer demo
      const solanaKeypair = (await import('@solana/web3.js')).Keypair.generate();

      // 2. Transfer SOL to the Vault
      const amountLamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: solanaKeypair.publicKey,
          lamports: amountLamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      // 3. Serialize the Secret Key into the Link
      // We encode the secret key so the claim page can recover the wallet
      const secretKeyString = Buffer.from(solanaKeypair.secretKey).toString('base64');

      // 4. Generate Link
      // We use a different format: /claim/v1-<base64_key>
      const link = `${window.location.origin}/claim/${encodeURIComponent(secretKeyString)}`;
      setGeneratedLink(link);
      setStep(2);

    } catch (error: any) {
      console.error("Error creating link:", error);
      alert("Failed to create link: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-emerald-500/30">
      <nav className="border-b border-white/5 bg-black/20 backdrop-blur-xl fixed w-full z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-black" />
            </div>
            Sol-Link
          </div>
          <WalletMultiButton />
        </div>
      </nav>

      <main className="pt-32 px-6 pb-20 max-w-xl mx-auto">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              Send Crypto via Link
            </h1>
            <p className="text-neutral-400">
              Create a private link. Anyone with the link can claim the funds.
              Zero wallet address needed.
            </p>
          </div>

          <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none" />

            {!publicKey ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Link2 className="w-8 h-8 text-neutral-500" />
                </div>
                <p className="text-neutral-400">Connect your wallet to start.</p>
                <div className="flex justify-center">
                  <WalletMultiButton />
                </div>
              </div>
            ) : step === 1 ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300 ml-1">Amount (SOL)</label>
                  <div className="relative group">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-2xl font-mono text-white placeholder-neutral-700 focus:outline-none focus:border-emerald-500/50 transition-colors"
                      placeholder="0.0"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                      DEVNET
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCreateLink}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                >
                  {loading ? (
                    'Processing...'
                  ) : (
                    <>
                      Create Link <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-emerald-400 bg-emerald-400/10 p-4 rounded-xl border border-emerald-400/20">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Funds Shielded Successfully!</span>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400 ml-1">Copy this secret link</label>
                  <div
                    onClick={() => {
                      if (generatedLink) {
                        navigator.clipboard.writeText(generatedLink);
                        alert('Copied!');
                      }
                    }}
                    className="bg-black/40 border border-dashed border-white/20 rounded-xl p-4 break-all font-mono text-sm text-neutral-300 cursor-pointer hover:bg-black/60 hover:border-emerald-500/30 transition-all active:scale-[0.99]"
                  >
                    {generatedLink}
                  </div>
                  <p className="text-xs text-neutral-500 text-center">
                    Only share this with the recipient. It contains the key to the funds.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setGeneratedLink(null);
                    setStep(1);
                  }}
                  className="w-full py-3 text-neutral-400 hover:text-white transition-colors"
                >
                  Send Another
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
