'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Play, Zap, Lock, Link as LinkIcon, ExternalLink, Github, Twitter, Layers, Fingerprint, EyeOff, Terminal } from 'lucide-react';
import { WalletMultiButton, useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

export function LandingPage() {
  const { setVisible } = useWalletModal();
  const { connected } = useWallet();

  const handleConnect = () => {
    if (!connected) {
      setVisible(true);
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-outfit selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-emerald-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-cyan-600/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
      </div>

      <nav className="relative z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Shield className="w-5 h-5 text-black stroke-[2.5px]" />
            </div>
            <span className="font-syne font-bold text-2xl tracking-tight">Sol-Link</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" className="text-neutral-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <WalletMultiButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-10"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Solana Privacy Hack 2026
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-6xl md:text-7xl font-syne font-extrabold leading-[1.1] tracking-tight">
                Send SOL Privately – <br />
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">No Trails, No Links.</span>
              </h1>
              <p className="text-xl text-neutral-400 max-w-xl leading-relaxed">
                Create secret links to share SOL. Powered by zero-knowledge mixer tech. Recipient claims without connecting wallets on-chain.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <button 
                onClick={handleConnect}
                className="group relative px-8 py-4 bg-white text-black font-syne font-bold rounded-2xl overflow-hidden transition-transform active:scale-95"
              >
                <div className="absolute inset-0 bg-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Create Private Link <ArrowRight className="w-5 h-5" />
                </span>
              </button>
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-syne font-bold rounded-2xl transition-all active:scale-95 flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" /> Watch 60s Demo
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-8 pt-4">
              <div className="flex flex-col">
                <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-2">Inspired By</span>
                <span className="font-syne font-bold text-sm text-neutral-300">Privacy Cash</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-2">Powered By</span>
                <span className="font-syne font-bold text-sm text-neutral-300">Helius RPC</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-2">Status</span>
                <span className="font-syne font-bold text-sm text-neutral-300">Devnet Live</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Animation Demo Visual */}
            <div className="relative aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-[2.5rem] blur-3xl" />
              <div className="relative h-full w-full bg-neutral-900/40 border border-white/10 rounded-[2.5rem] backdrop-blur-sm overflow-hidden flex items-center justify-center">
                
                {/* Simulated ZK Circuit Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                  <motion.path
                    d="M 10 50 L 30 50 L 40 30 L 60 70 L 70 50 L 90 50"
                    fill="none"
                    stroke="url(#grad)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Floating SOL Icons & Cards */}
                <div className="relative space-y-4 w-full px-12">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md flex items-center gap-4 transform -rotate-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="h-2 w-24 bg-white/20 rounded-full mb-2" />
                      <div className="h-2 w-16 bg-white/10 rounded-full" />
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="p-4 bg-black/40 border border-emerald-500/30 rounded-2xl backdrop-blur-md flex items-center gap-4 translate-x-8 rotate-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-32 bg-emerald-500/40 rounded-full" />
                      <div className="h-1.5 w-40 bg-white/5 rounded-full" />
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-full blur-[60px] opacity-20"
                  />
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Shield className="w-24 h-24 text-emerald-400/20" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.02] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: EyeOff, label: 'Unlinkable Transfers', desc: 'Broken chain tech' },
              { icon: Fingerprint, label: 'Zero-Knowledge Proofs', desc: 'Secure math verification' },
              { icon: Terminal, label: 'No On-Chain Trail', desc: 'Explorer-safe privacy' },
              { icon: Zap, label: 'Helius Fast RPC', desc: 'Instant claim speed' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                  <item.icon className="w-6 h-6 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div>
                  <h3 className="font-syne font-bold text-sm text-neutral-200">{item.label}</h3>
                  <p className="text-neutral-500 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-syne font-bold">How It Works</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">Built with ported Privacy Cash ZK mixer logic + Helius RPC for speed.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Deposit & Create', desc: 'Wallet → Enter amount → Generate secret link (copy button glows)' },
              { title: 'Share Privately', desc: 'Send link via WhatsApp/Telegram/DM (no wallet address exposed)' },
              { title: 'Claim Anonymously', desc: 'Recipient opens link → Claims SOL (Helius fast check → instant sweep)' },
              { title: 'Zero Trace Left', desc: 'Explorer shows no direct sender-receiver connection' }
            ].map((step, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="relative p-8 bg-neutral-900/50 border border-white/5 rounded-3xl space-y-6 group"
              >
                <div className="text-6xl font-syne font-black text-white/5 absolute top-4 right-6 group-hover:text-emerald-500/10 transition-colors">{i + 1}</div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
                  {i === 0 && <Layers className="w-6 h-6" />}
                  {i === 1 && <Twitter className="w-6 h-6" />}
                  {i === 2 && <Zap className="w-6 h-6" />}
                  {i === 3 && <Shield className="w-6 h-6" />}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-syne font-bold">{step.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-32 px-6 bg-emerald-500/[0.02]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          {[
            { title: 'Private SOL sharing', desc: 'No direct wallet linking ever exposed on explorer.' },
            { title: 'Client-side ZK', desc: 'Note generation with Utxo + blinding for maximum safety.' },
            { title: 'Instant Claims', desc: 'Powered by Helius RPC for sub-second verification.' },
            { title: 'Secret Links', desc: 'Encrypted link format means no public address leaks.' },
            { title: 'Mobile Ready', desc: 'PWA-compatible interface built for the modern web.' },
            { title: 'Open Source', desc: 'Hackathon-built with MIT license. Transparency is key.' }
          ].map((feature, i) => (
            <div key={i} className="flex gap-5">
              <div className="mt-1">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-syne font-bold text-lg">{feature.title}</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hackathon Badges */}
      <section className="relative z-10 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <p className="text-neutral-500 text-xs font-bold uppercase tracking-[0.2em]">Competing in Solana Privacy Hack 2026</p>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
             <div className="flex items-center gap-2 font-syne font-bold text-xl">
               <Shield className="w-6 h-6 text-emerald-400" /> Solana Privacy
             </div>
             <div className="flex items-center gap-2 font-syne font-bold text-xl">
               <Layers className="w-6 h-6 text-cyan-400" /> Privacy Cash
             </div>
             <div className="flex items-center gap-2 font-syne font-bold text-xl">
               <Zap className="w-6 h-6 text-yellow-400" /> Helius
             </div>
             <div className="flex items-center gap-2 font-syne font-bold text-xl uppercase tracking-tighter">
               Bhopal, India
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 md:p-20 bg-neutral-900 rounded-[3rem] border border-white/10 text-center space-y-10 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-emerald-500/10 blur-[100px] pointer-events-none" />
            <div className="space-y-6 relative z-10">
              <h2 className="text-4xl md:text-5xl font-syne font-bold leading-tight">Ready to send SOL <br />with total privacy?</h2>
              <p className="text-neutral-400 text-lg">Requires Phantom in devnet mode. Airdrop SOL first.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-6">
              <button className="px-12 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-syne font-black text-lg rounded-2xl transition-all shadow-xl shadow-emerald-500/20 active:scale-95">
                Try Sol-Link on Devnet Now
              </button>
              <p className="text-neutral-600 text-xs">ZK proofs generated client-side • Devnet only – no real funds at risk</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 pt-20 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-syne font-bold text-xl">Sol-Link</span>
              </div>
              <p className="text-neutral-500 text-sm max-w-xs">
                Privacy made simple. Built for Solana Privacy Hack 2026. Send SOL without leaving a trace.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
              <div className="space-y-4">
                <h5 className="font-syne font-bold text-sm uppercase tracking-widest text-neutral-400">Project</h5>
                <ul className="space-y-3 text-neutral-500 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">GitHub Repo</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Demo Video</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">README</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="font-syne font-bold text-sm uppercase tracking-widest text-neutral-400">Social</h5>
                <ul className="space-y-3 text-neutral-500 text-sm">
                  <li><a href="https://x.com/NikhilRaikwarr" className="hover:text-white transition-colors inline-flex items-center gap-2">X / Twitter <ExternalLink className="w-3 h-3" /></a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-neutral-500 text-xs font-medium">
              © 2026 Sol-Link. Built with ❤️ by <a href="https://x.com/NikhilRaikwarr" className="text-neutral-300 hover:text-emerald-400 transition-colors">NikhilRaikwar</a>
            </p>
            <div className="flex gap-8 text-neutral-500 text-xs font-medium">
              <span>Privacy First</span>
              <span>Open Source</span>
              <span>Solana Devnet</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
