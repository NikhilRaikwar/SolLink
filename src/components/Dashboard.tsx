'use client';

import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, ArrowRight, Check, Copy, RefreshCw, Zap, EyeOff, Lock, Sparkles,
  Globe, Terminal, Info, ExternalLink, LayoutDashboard, History, Settings, Link as LinkIcon
} from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function Dashboard() {
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
      const link = `${window.location.origin}/claim#${encodeURIComponent(secretKeyString)}`;
      setGeneratedLink(link);
      setStep(2);

    } catch (error: unknown) {
      console.error("Error creating link:", error);
      const message = error instanceof Error ? error.message : "An unknown error occurred";
      alert("Failed to create link: " + message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
    }
  };

  return (
    <div className="min-h-screen bg-white text-foreground font-plus-jakarta selection:bg-accent-primary/20 overflow-x-hidden">

      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] bg-accent-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-accent-secondary/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 grid-bg opacity-[0.02]" />
      </div>

      <nav className="fixed top-0 w-full z-50 border-b border-neutral-100 bg-white/60 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="flex flex-col -space-y-1">
                <span className="font-syne font-black text-xl tracking-tight uppercase leading-none">SOLlink</span>
                <span className="text-[9px] font-bold text-accent-primary tracking-[0.2em] uppercase">Private Hub</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-accent-primary/5 border border-accent-primary/10 rounded-full text-[9px] font-bold text-accent-primary uppercase tracking-[0.2em]">
              <div className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-pulse" />
              Devnet Mainframe
            </div>
            <div className="[&_.wallet-adapter-button]:font-syne [&_.wallet-adapter-button]:font-black [&_.wallet-adapter-button]:bg-foreground [&_.wallet-adapter-button]:text-white [&_.wallet-adapter-button]:px-6 [&_.wallet-adapter-button]:h-11 [&_.wallet-adapter-button]:rounded-full [&_.wallet-adapter-button]:hover:bg-accent-primary [&_.wallet-adapter-button]:hover:text-black transition-all text-xs uppercase tracking-widest paper-shadow">
              <WalletMultiButton>{publicKey ? 'Connected' : 'Connect Wallet'}</WalletMultiButton>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-16 min-h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative p-1 bg-gradient-to-br from-neutral-200 to-white rounded-[4rem] paper-shadow"
        >
          <div className="bg-white rounded-[3.8rem] p-8 md:p-12 space-y-8 overflow-hidden relative min-h-[500px] flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[100px] -mr-40 -mt-40 pointer-events-none" />

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12"
                >
                  <div className="space-y-10">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-primary">Transfer Load</label>
                        <p className="text-neutral-400 text-sm font-medium">Define the amount of SOL to shield.</p>
                      </div>
                      <Sparkles className="w-5 h-5 text-accent-secondary" />
                    </div>

                    <div className="relative group">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-neutral-50 border border-border-subtle rounded-[2.5rem] px-10 py-12 text-7xl font-bricolage font-extrabold text-foreground focus:outline-none focus:ring-4 focus:ring-accent-primary/5 focus:border-accent-primary/20 transition-all placeholder:text-neutral-200"
                        placeholder="0.00"
                      />
                      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-end">
                        <span className="text-3xl font-bricolage font-black text-neutral-300 group-focus-within:text-accent-primary transition-colors">SOL</span>
                        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Native Asset</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {['0.1', '0.5', '1.0', '5.0'].map((val) => (
                      <button
                        key={val}
                        onClick={() => setAmount(val)}
                        className={`px-8 py-5 rounded-2xl font-syne font-bold text-xs transition-all border ${amount === val ? 'bg-foreground text-white border-foreground shadow-xl' : 'bg-white text-neutral-400 border-border-subtle hover:bg-neutral-50'}`}
                      >
                        {val} SOL
                      </button>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <button
                      onClick={handleCreateLink}
                      disabled={loading || !amount}
                      className="group relative w-full h-24 overflow-hidden rounded-[2rem] bg-foreground text-white font-syne font-black text-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 paper-shadow"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-4">
                        {loading ? (
                          <>
                            <RefreshCw className="w-7 h-7 animate-spin" />
                            Processing ZK-Proof...
                          </>
                        ) : (
                          <>
                            Generate Private Link <ArrowRight className="w-7 h-7 transition-transform group-hover:translate-x-3" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-accent-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>

                    <div className="flex justify-center gap-8 text-[9px] font-black text-neutral-300 uppercase tracking-[0.3em]">
                      <span className="flex items-center gap-2"><Lock className="w-3 h-3" /> Encrypted Endpoint</span>
                      <span className="flex items-center gap-2"><EyeOff className="w-3 h-3" /> Stealth Active</span>
                      <span className="flex items-center gap-2"><Zap className="w-3 h-3" /> Instant ZK</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-12 text-center"
                >
                  <div className="relative inline-flex mb-4">
                    <div className="absolute inset-0 bg-accent-primary blur-3xl opacity-20 animate-pulse" />
                    <div className="relative w-36 h-36 bg-white border border-neutral-100 rounded-[3rem] flex items-center justify-center mx-auto shadow-2xl">
                      <LinkIcon className="w-16 h-16 text-accent-primary stroke-[3px]" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-5xl font-bricolage font-extrabold tracking-tighter">Link Secured.</h3>
                    <p className="text-neutral-500 text-lg max-w-sm mx-auto font-medium leading-relaxed">Your secret cryptographic link has been generated. Save it securely.</p>
                  </div>

                  <div className="space-y-4 text-left max-w-2xl mx-auto">
                    <div className="flex justify-between items-center px-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">Vault Signature</label>
                      <span className="text-[10px] font-bold text-accent-secondary uppercase">Highly Sensitive</span>
                    </div>
                    <div className="group relative">
                      <div className="absolute -inset-6 bg-accent-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      <div
                        className="relative bg-neutral-50 border border-border-subtle rounded-[2rem] p-8 pr-24 break-all font-mono text-sm text-foreground/80 leading-relaxed cursor-pointer hover:border-foreground/20 transition-all shadow-inner"
                        onClick={copyToClipboard}
                      >
                        <span className="text-accent-primary font-bold">sollink.me/claim#</span>{generatedLink?.split('#').pop()}
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-neutral-300 group-hover:text-foreground transition-colors">
                          <Copy className="w-7 h-7" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 pt-4 max-w-2xl mx-auto">
                    <button
                      onClick={() => {
                        setGeneratedLink(null);
                        setStep(1);
                      }}
                      className="flex-1 h-24 rounded-[2rem] bg-white border border-border-subtle font-syne font-black text-sm uppercase tracking-widest hover:bg-neutral-50 transition-all active:scale-95 paper-shadow"
                    >
                      Reset Terminal
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 h-24 rounded-[2rem] bg-foreground font-syne font-black text-sm uppercase tracking-widest text-white hover:scale-105 transition-all shadow-2xl"
                    >
                      Copy Link
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
