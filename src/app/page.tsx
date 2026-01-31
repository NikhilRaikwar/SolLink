'use client';

import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  ArrowRight, 
  Check, 
  Link2, 
  Lock, 
  Zap, 
  Smartphone, 
  Github, 
  Twitter, 
  ExternalLink,
  Play,
  Copy,
  Plus,
  Unlink,
  Cpu,
  EyeOff,
  Activity
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  return (
    <nav className="border-b border-white/5 bg-neutral-950/50 backdrop-blur-2xl fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 font-syne font-bold text-2xl tracking-tight">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Shield className="w-6 h-6 text-black" />
          </div>
          <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            Sol-Link
          </span>
        </div>
        <div className="flex items-center gap-4">
          <WalletMultiButton className="!bg-white !text-black !font-bold !rounded-full !px-6 !py-2 !transition-all hover:!scale-105 active:!scale-95" />
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { select } = useWallet();
  
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full animate-pulse delay-700" />
        
        {/* Animated ZK Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100">
          <motion.path
            d="M 0 50 Q 25 25 50 50 T 100 50"
            fill="none"
            stroke="white"
            strokeWidth="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 0 30 Q 25 55 50 30 T 100 30"
            fill="none"
            stroke="white"
            strokeWidth="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-syne font-bold leading-[1.1] mb-6">
            Send SOL Privately – <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              No Trails, No Links Exposed
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 font-outfit leading-relaxed">
            Create secret links to share SOL. Powered by zero-knowledge mixer tech. 
            Recipient claims without connecting wallets on-chain.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button 
              onClick={() => {
                const button = document.querySelector('.wallet-adapter-button') as HTMLButtonElement;
                if (button) button.click();
              }}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-syne font-bold rounded-2xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 shadow-lg shadow-emerald-500/20"
            >
              Create Private Link <ArrowRight className="w-5 h-5" />
            </button>
            <a 
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Replace with real Loom
              target="_blank"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-syne font-bold rounded-2xl flex items-center justify-center gap-2 transition-all"
            >
              <Play className="w-5 h-5 fill-current" /> Watch 60s Demo
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm font-syne font-medium text-neutral-500">
            <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Privacy Cash Inspired</span>
            <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />
            <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> Helius Powered</span>
            <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />
            <span className="flex items-center gap-2">Devnet Demo – Solana Privacy Hack 2026</span>
          </div>
        </motion.div>

        {/* Mockup / Animation Demo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-20 relative max-w-4xl mx-auto group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent blur-3xl -z-10 opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="bg-neutral-900/80 border border-white/10 rounded-3xl p-4 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-green-500/20" />
              </div>
              <div className="flex-1 h-6 bg-white/5 rounded-lg flex items-center justify-center text-[10px] text-neutral-500 font-mono">
                sol-link.app/create
              </div>
            </div>
            <div className="aspect-[16/9] bg-black/40 rounded-xl relative overflow-hidden flex items-center justify-center">
              {/* Animated Demo Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 p-12">
                 <motion.div 
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-24 h-24 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/40"
                 >
                    <Lock className="w-12 h-12 text-black" />
                 </motion.div>
                 <div className="space-y-2 text-center">
                   <div className="h-4 w-48 bg-white/10 rounded-full mx-auto" />
                   <div className="h-4 w-32 bg-white/5 rounded-full mx-auto" />
                 </div>
                 <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                   <div className="h-12 bg-white/5 rounded-xl border border-white/5" />
                   <div className="h-12 bg-emerald-500/20 rounded-xl border border-emerald-500/30" />
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TrustBar = () => {
  const cards = [
    { title: "Unlinkable Transfers", desc: "No direct on-chain link", icon: Unlink },
    { title: "Zero-Knowledge Proofs", desc: "Math-backed privacy", icon: Cpu },
    { title: "No On-Chain Trail", desc: "Explorers show nothing", icon: EyeOff },
    { title: "Helius Fast RPC", desc: "Instant confirmation", icon: Activity },
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-syne font-bold text-neutral-500 uppercase tracking-[0.2em] mb-12">
          Your deposit and claim stay private – even from blockchain explorers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-neutral-900/50 border border-white/5 p-6 rounded-2xl backdrop-blur-sm"
            >
              <card.icon className="w-8 h-8 text-emerald-500 mb-4" />
              <h3 className="font-syne font-bold text-lg mb-1">{card.title}</h3>
              <p className="text-sm text-neutral-500">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      title: "Deposit & Create",
      desc: "Enter SOL amount and generate a secure link. Your funds are shielded immediately.",
      caption: "Wallet → Amount → Generate"
    },
    {
      title: "Share Privately",
      desc: "Send the link via Telegram, Signal, or DM. No wallet address is ever exposed.",
      caption: "DM → Protected"
    },
    {
      title: "Claim Anonymously",
      desc: "Recipient opens the link and claims SOL via Helius fast RPC to any destination.",
      caption: "Link → Claim → Sweep"
    },
    {
      title: "Zero Trace Left",
      desc: "On-chain explorer shows no connection between sender and receiver.",
      caption: "Private Mixer Logic"
    }
  ];

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-syne font-bold mb-4">How It Works</h2>
          <p className="text-neutral-500 font-outfit">Built with ported Privacy Cash ZK mixer logic + Helius RPC for speed.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent -z-10" />
          
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="bg-neutral-900 border border-white/10 p-8 rounded-3xl group-hover:border-emerald-500/50 transition-colors h-full">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-syne font-bold text-xl mb-6 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                  {i + 1}
                </div>
                <h3 className="text-xl font-syne font-bold mb-3">{step.title}</h3>
                <p className="text-neutral-400 text-sm mb-6 leading-relaxed">{step.desc}</p>
                <div className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg inline-block">
                  {step.caption}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { title: "Private SOL Sharing", desc: "No wallet linking involved.", icon: Shield },
    { title: "Client-side ZK", desc: "Utxo + blinding proofs.", icon: Cpu },
    { title: "Instant Claims", desc: "Powered by Helius RPC.", icon: Zap },
    { title: "Secret Links", desc: "No public address leakage.", icon: Link2 },
    { title: "Mobile Friendly", desc: "PWA-ready interface.", icon: Smartphone },
    { title: "Open Source", desc: "Solana Privacy Hack 2026.", icon: Github },
  ];

  return (
    <section className="py-32 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex gap-6 p-8 rounded-3xl hover:bg-white/5 transition-all group">
              <div className="shrink-0 w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <f.icon className="w-7 h-7 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-xl font-syne font-bold mb-2">{f.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Badges = () => {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="font-syne font-bold text-xl mb-10">Competing in Solana Privacy Hack 2026</h3>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
           {/* Replace with actual logos if available */}
           <div className="text-xl font-syne font-black tracking-tighter">SOLANA PRIVACY</div>
           <div className="text-xl font-syne font-black tracking-tighter text-emerald-500">PRIVACY CASH</div>
           <div className="text-xl font-syne font-black tracking-tighter text-blue-500">HELIUS</div>
           <div className="text-xl font-syne font-black tracking-tighter">BHOPAL, INDIA</div>
        </div>
        <p className="mt-12 text-neutral-500 font-syne font-medium italic">
          "Targeting Privacy Cash Best Overall + Helius Best Privacy Project"
        </p>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] -z-10" />
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-neutral-900/50 border border-white/10 p-12 md:p-20 rounded-[3rem] backdrop-blur-xl">
          <h2 className="text-4xl md:text-6xl font-syne font-bold mb-6">Try Sol-Link Now</h2>
          <p className="text-xl text-neutral-400 mb-10">Experience the future of Solana privacy on Devnet.</p>
          <button 
            onClick={() => {
              const button = document.querySelector('.wallet-adapter-button') as HTMLButtonElement;
              if (button) button.click();
            }}
            className="px-12 py-5 bg-white text-black font-syne font-bold rounded-2xl text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10"
          >
            Launch App
          </button>
          <p className="mt-8 text-sm text-neutral-500">
            Requires Phantom in devnet mode. Airdrop SOL first.
          </p>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-3 font-syne font-bold text-2xl mb-6">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-black" />
              </div>
              Sol-Link
            </div>
            <p className="text-neutral-500 max-w-sm mb-8 leading-relaxed">
              Privacy made simple. Built for Solana Privacy Hack 2026. 
              Securely share SOL without exposing your on-chain activity.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-syne font-bold mb-6 uppercase text-xs tracking-widest text-neutral-500">Links</h4>
            <ul className="space-y-4 font-medium text-neutral-400">
              <li><a href="#" className="hover:text-emerald-500 transition-colors">GitHub Repo</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Demo Video</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">README</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-syne font-bold mb-6 uppercase text-xs tracking-widest text-neutral-500">Contact</h4>
            <ul className="space-y-4 font-medium text-neutral-400">
              <li><a href="https://x.com/NikhilRaikwarr" className="hover:text-emerald-500 transition-colors">@NikhilRaikwarr</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-neutral-600 font-medium">
          <p>© 2026 Sol-Link. All rights reserved.</p>
          <p>Made with ❤️ by <a href="https://x.com/NikhilRaikwarr" className="text-neutral-400 hover:text-white transition-colors">NikhilRaikwar</a></p>
        </div>
      </div>
    </footer>
  );
};

// --- Main Page Logic ---

const LandingPage = () => {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Features />
      <Badges />
      <CTASection />
    </>
  );
};

const Dashboard = ({ onCreateLink, loading, generatedLink, amount, setAmount, reset }: any) => {
  return (
    <section className="pt-40 pb-32 px-6 min-h-[calc(100vh-80px)]">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900/50 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl relative overflow-hidden"
        >
          {/* Dashboard Glow */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

          {!generatedLink ? (
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl font-syne font-bold mb-2">Create Private Link</h2>
                <p className="text-neutral-500">Funds will be shielded in an ephemeral vault.</p>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-syne font-bold text-neutral-400 ml-1 uppercase tracking-wider">Amount to Shield</label>
                <div className="relative group">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-black/40 border-2 border-white/5 rounded-3xl px-8 py-8 text-4xl font-syne font-bold text-white placeholder-neutral-800 focus:outline-none focus:border-emerald-500/50 transition-all"
                    placeholder="0.0"
                  />
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                    SOL (DEVNET)
                  </div>
                </div>
              </div>

              <button
                onClick={onCreateLink}
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-syne font-bold py-6 rounded-3xl text-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98] shadow-2xl shadow-emerald-500/20"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                    Shielding Funds...
                  </>
                ) : (
                  <>
                    Create Shielded Link <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center border border-emerald-500/20 mb-2">
                  <Check className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-syne font-bold">Funds Shielded!</h2>
                <p className="text-neutral-500">Your secret link is ready to be shared.</p>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-syne font-bold text-neutral-400 ml-1 uppercase tracking-wider">Your Secret Link</label>
                <div className="relative group">
                  <div
                    className="w-full bg-black/60 border-2 border-emerald-500/30 rounded-3xl p-8 pr-16 font-mono text-sm text-neutral-200 break-all leading-relaxed"
                  >
                    {generatedLink}
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedLink);
                      alert('Link copied to clipboard!');
                    }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-emerald-500 text-black rounded-2xl hover:scale-110 active:scale-90 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-center text-xs text-neutral-600 font-medium italic">
                   Caution: Anyone with this link can claim the funds.
                </p>
              </div>

              <button
                onClick={reset}
                className="w-full py-4 text-neutral-500 hover:text-white font-syne font-bold transition-colors"
              >
                Create Another Link
              </button>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Floating CTA */}
      <motion.button 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={reset}
        className="fixed bottom-8 right-8 w-16 h-16 bg-emerald-500 text-black rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 z-50 md:hidden"
      >
        <Plus className="w-8 h-8" />
      </motion.button>
    </section>
  );
};

export default function Home() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState<string>('0.1');
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

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

    } catch (error: any) {
      console.error("Error creating link:", error);
      alert("Failed to create link: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setGeneratedLink(null);
    setAmount('0.1');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-emerald-500/30 selection:text-white">
      <Navbar />
      
      <main>
        <AnimatePresence mode="wait">
          {!publicKey ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LandingPage />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Dashboard 
                onCreateLink={handleCreateLink}
                loading={loading}
                generatedLink={generatedLink}
                amount={amount}
                setAmount={setAmount}
                reset={reset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
