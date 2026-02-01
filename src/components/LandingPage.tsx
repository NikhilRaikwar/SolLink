'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, EyeOff, Globe, Cpu, Lock, Zap, Terminal } from 'lucide-react';
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
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <div className="min-h-screen bg-white text-foreground font-plus-jakarta selection:bg-accent-primary/20 overflow-x-hidden">

      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-secondary/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 grid-bg opacity-[0.03]" />
      </div>

      <nav className="relative z-50">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative w-12 h-12 flex items-center justify-center bg-foreground rounded-[1.25rem] paper-shadow">
              <Shield className="w-6 h-6 text-white stroke-[2.5px]" />
            </div>
            <div className="flex flex-col">
              <span className="font-syne font-black text-2xl tracking-tight uppercase leading-none">SOLlink</span>
              <span className="text-[10px] font-bold text-accent-primary tracking-[0.2em] uppercase">Stealth Network</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6"
          >
            <div className="[&_.wallet-adapter-button]:font-syne [&_.wallet-adapter-button]:font-black [&_.wallet-adapter-button]:bg-foreground [&_.wallet-adapter-button]:text-white [&_.wallet-adapter-button]:px-8 [&_.wallet-adapter-button]:h-12 [&_.wallet-adapter-button]:rounded-full [&_.wallet-adapter-button]:hover:bg-accent-primary [&_.wallet-adapter-button]:hover:text-black [&_.wallet-adapter-button]:transition-all [&_.wallet-adapter-button]:text-xs [&_.wallet-adapter-button]:uppercase [&_.wallet-adapter-button]:tracking-widest [&_.wallet-adapter-button]:border-none paper-shadow">
              <WalletMultiButton>{connected ? 'Connected' : 'Connect Wallet'}</WalletMultiButton>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-16"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-bricolage font-black leading-[0.9] tracking-tighter text-foreground max-w-6xl mx-auto">
                Private Assets. <br />
                <span className="accent-gradient">Zero Trails.</span>
              </h1>
              <p className="text-xl md:text-2xl text-neutral-500 max-w-2xl leading-relaxed mx-auto font-medium">
                Shield your Solana transactions with zero-knowledge secret links. <br className="hidden md:block" /> Secure, instant, and completely anonymous.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-8 pt-8">
              <button
                onClick={handleConnect}
                className="group relative px-14 py-6 bg-foreground text-white font-syne font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 paper-shadow"
              >
                <span className="relative z-10 flex items-center gap-3 text-xl uppercase tracking-tighter">
                  Launch App <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-accent-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats & Info Section */}
      <section className="relative z-10 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-bricolage font-extrabold leading-[0.9] tracking-tighter">
              Shield <br />
              <span className="accent-gradient">Terminal.</span>
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed font-medium">
              Execute private asset shielding. All cryptographic proofs are generated locally to ensure zero-knowledge of your intent.
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Security', value: 'ZK-SNARK', icon: Lock, color: 'text-indigo-600 bg-indigo-50' },
                { label: 'Network', value: 'DEVNET', icon: Globe, color: 'text-orange-600 bg-orange-50' },
                { label: 'Latency', value: '< 1.2s', icon: Zap, color: 'text-cyan-600 bg-cyan-50' },
                { label: 'Status', value: 'ONLINE', icon: Terminal, color: 'text-emerald-600 bg-emerald-50' }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white border border-border-subtle rounded-[2rem] space-y-4 hover:border-foreground/10 transition-all paper-shadow">
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-5 h-5 stroke-[2px]" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">{item.label}</p>
                    <p className="text-xs font-bold font-syne text-foreground uppercase tracking-wider">{item.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>


          </div>
        </div>
      </section>

      {/* Simplified CTA */}
      <section className="relative z-10 py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-20 md:p-32 bg-foreground rounded-[4rem] text-center space-y-12 overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-accent-primary/10 blur-[150px] pointer-events-none" />
            <div className="space-y-8 relative z-10">
              <h2 className="text-5xl md:text-8xl font-bricolage font-black leading-[0.9] tracking-tighter text-white">
                Enter the <br /><span className="text-accent-primary">Stealth Layer.</span>
              </h2>
              <p className="text-neutral-400 text-xl max-w-xl mx-auto font-medium">
                The most advanced private distribution network on Solana is ready for your first link.
              </p>
            </div>
            <div className="relative z-10">
              <button
                onClick={handleConnect}
                className="px-16 py-8 bg-white text-black font-syne font-black text-2xl rounded-full transition-all hover:scale-110 active:scale-95 paper-shadow"
              >
                Start Shielding
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="relative z-10 py-20 px-6 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-syne font-black text-xl tracking-tighter uppercase">SOLlink</span>
          </div>

          <div className="flex gap-12 text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">
            <a href="https://github.com/NikhilRaikwar/SolLink" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-accent-primary transition-colors">Github</a>
          </div>

          <p className="text-neutral-400 text-[10px] font-black tracking-[0.2em] uppercase">
            © 2026 SOLLINK PROTOCOL.
          </p>
        </div>
      </footer>
    </div>
  );
}
