'use client';

import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Shield, ArrowRight, Check, Copy, RefreshCw, LogOut, Wallet } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function Dashboard() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, disconnect } = useWallet();
  const [amount, setAmount] = useState<string>('0.1');
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const handleCreateLink = async () => {
    if (!publicKey || !amount) return;

    setLoading(true);
    try {
      const solanaKeypair = (await import('@solana/web3.js')).Keypair.generate();
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

      const secretKeyString = Buffer.from(solanaKeypair.secretKey).toString('base64');
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

  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      // Small toast or visual feedback could be added here
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-outfit relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-10 border-b border-white/5 bg-black/40 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Shield className="w-5 h-5 text-black stroke-[2.5px]" />
            </div>
            <span className="font-syne font-bold text-2xl tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              Sol-Link
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-neutral-400">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Devnet Active
            </div>
            <WalletMultiButton />
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Info & Stats */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h2 className="text-4xl font-syne font-bold leading-tight">
                Create your <br />
                <span className="text-emerald-400">Private Link</span>
              </h2>
              <p className="text-neutral-400 text-lg max-w-sm">
                Deposit SOL into a shielded vault and share the key via a single, anonymous link.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Network', value: 'Solana Devnet', icon: Wallet },
                { label: 'Privacy', value: 'High (ZK-Ready)', icon: Shield }
              ].map((stat, i) => (stat.icon && (
                <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                  <stat.icon className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">{stat.label}</p>
                    <p className="text-sm font-semibold">{stat.value}</p>
                  </div>
                </div>
              )))}
            </motion.div>
          </div>

          {/* Right Column: Interaction Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            className="relative"
          >
            <div className="absolute -inset-[1px] bg-gradient-to-br from-white/20 to-transparent rounded-3xl blur-sm" />
            <div className="relative bg-neutral-900/80 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <label className="text-sm font-semibold text-neutral-300">Amount to Shield</label>
                        <span className="text-xs text-neutral-500 font-mono">Available: 10.5 SOL</span>
                      </div>
                      <div className="relative group">
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-5 text-3xl font-syne font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all placeholder:text-neutral-800"
                          placeholder="0.00"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold text-neutral-400">
                          SOL
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex gap-3">
                      <div className="mt-0.5">
                        <Shield className="w-4 h-4 text-emerald-500" />
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Funds will be transferred to a temporary vault. Only the generated link can reclaim them. 
                        <span className="text-emerald-500/80"> Zero trace of the recipient on-chain.</span>
                      </p>
                    </div>

                    <button
                      onClick={handleCreateLink}
                      disabled={loading || !amount}
                      className="group relative w-full overflow-hidden rounded-2xl bg-white p-[1px] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500" />
                      <div className="relative flex h-14 items-center justify-center gap-2 rounded-[15px] bg-neutral-950 font-syne font-bold text-white transition-all group-hover:bg-transparent group-hover:text-black">
                        {loading ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            Shielding...
                          </>
                        ) : (
                          <>
                            Shield SOL <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </div>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8 text-center"
                  >
                    <div className="relative inline-flex">
                      <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse" />
                      <div className="relative w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-10 h-10 text-emerald-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-syne font-bold">SOL Shielded!</h3>
                      <p className="text-neutral-400 text-sm">Your private link is ready to be shared.</p>
                    </div>

                    <div className="space-y-3 text-left">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Secret Link</label>
                      <div className="group relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative bg-black border border-white/10 rounded-2xl p-5 pr-14 break-all font-mono text-sm text-emerald-400/90 leading-relaxed cursor-pointer hover:border-emerald-500/30 transition-all"
                             onClick={copyToClipboard}>
                          {generatedLink}
                          <div className="absolute right-4 top-5 text-neutral-500 group-hover:text-emerald-400 transition-colors">
                            <Copy className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          setGeneratedLink(null);
                          setStep(1);
                        }}
                        className="flex-1 h-12 rounded-xl bg-white/5 border border-white/10 font-syne font-bold text-sm hover:bg-white/10 transition-colors"
                      >
                        Shield More
                      </button>
                      <button
                        onClick={copyToClipboard}
                        className="flex-1 h-12 rounded-xl bg-emerald-500 font-syne font-bold text-sm text-black hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
                      >
                        Copy Link
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
