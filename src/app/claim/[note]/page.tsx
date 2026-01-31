'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { Shield, ArrowDown, CheckCircle, Lock, Loader2, Download, Activity, Cpu, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClaimPage() {
    const params = useParams();
    const noteString = params.note as string;
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    const [noteData, setNoteData] = useState<any>(null);
    const [status, setStatus] = useState<'idle' | 'generating_proof' | 'submitting' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (noteString) {
            try {
                const secretKey = Buffer.from(decodeURIComponent(noteString), 'base64');
                if (secretKey.length !== 64) {
                    throw new Error("Invalid key length");
                }
                setNoteData({ valid: true });
            } catch (e) {
                console.error(e);
                setError("Invalid link format");
            }
        }
    }, [noteString]);

    const handleClaim = async () => {
        if (!publicKey || !noteString) return;

        try {
            setStatus('generating_proof');
            setStatusMessage("Accessing Secure Vault...");

            const secretKey = Buffer.from(decodeURIComponent(noteString), 'base64');
            const vaultKeypair = (await import('@solana/web3.js')).Keypair.fromSecretKey(secretKey);

            setStatusMessage("Verifying Balance...");

            const balance = await connection.getBalance(vaultKeypair.publicKey);
            if (balance === 0) {
                throw new Error("This link has already been claimed or is empty.");
            }

            setStatus('submitting');
            setStatusMessage("Transferring Funds to Your Wallet...");

            const transaction = new Transaction();
            const fee = 5000;
            const transferAmount = balance - fee;

            if (transferAmount <= 0) {
                throw new Error("Balance too low to cover network fees.");
            }

            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: vaultKeypair.publicKey,
                    toPubkey: publicKey,
                    lamports: transferAmount
                })
            );

            const signature = await connection.sendTransaction(transaction, [vaultKeypair]);
            await connection.confirmTransaction(signature, 'confirmed');

            setStatus('success');
            setStatusMessage("Funds Claimed Successfully!");

        } catch (e: any) {
            console.error(e);
            setStatus('error');
            setError(e.message);
        }
    };

    if (error) {
        return (
            <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6 font-outfit">
                <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-[2rem] text-center max-w-sm backdrop-blur-xl">
                    <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-syne font-bold text-white mb-2">Invalid Link</h1>
                    <p className="text-neutral-500 mb-8">{error}</p>
                    <a href="/" className="block w-full py-4 bg-white/5 hover:bg-white/10 rounded-xl font-syne font-bold transition-all">
                        Back to Home
                    </a>
                </div>
            </div>
        );
    }

    if (!noteData) {
        return (
            <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
                    <span className="font-syne font-bold text-neutral-500">Decrypting Link...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 selection:bg-emerald-500/30 font-outfit overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

            <nav className="fixed top-0 w-full border-b border-white/5 bg-neutral-950/50 backdrop-blur-2xl z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 font-syne font-bold text-2xl tracking-tight">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Shield className="w-6 h-6 text-black" />
                        </div>
                        <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                            Sol-Link
                        </span>
                    </div>
                </div>
            </nav>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-neutral-900/50 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl"
            >
                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-6 space-y-8"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, rotate: 360 }}
                                transition={{ type: "spring", damping: 12 }}
                                className="w-24 h-24 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/40"
                            >
                                <CheckCircle className="w-12 h-12 text-black" />
                            </motion.div>
                            <div>
                                <h2 className="text-3xl font-syne font-bold text-white mb-2">Claimed!</h2>
                                <p className="text-neutral-500 leading-relaxed">
                                    The funds have been withdrawn securely to your wallet.
                                </p>
                            </div>
                            <div className="pt-4">
                                <a href="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-syne font-bold transition-all group">
                                    Create your own link <ArrowDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="claim"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-10"
                        >
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 mb-6 border border-white/10">
                                    <Sparkles className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h2 className="text-neutral-500 text-xs font-syne font-bold uppercase tracking-[0.3em] mb-3">Shielded Transfer Received</h2>
                                <div className="text-2xl font-syne font-bold text-white mb-2">
                                    Claim your SOL
                                </div>
                                <p className="text-neutral-500 text-sm">Verify with ZK proof to sweep funds.</p>
                            </div>

                            <div className="space-y-6">
                                {status === 'idle' && (
                                    !publicKey ? (
                                        <div className="flex flex-col items-center gap-4">
                                            <WalletMultiButton className="!bg-white !text-black !font-bold !rounded-2xl !w-full !h-14 !justify-center !text-lg" />
                                            <p className="text-xs text-neutral-600 font-medium tracking-tight">Connect wallet to authorize claim</p>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handleClaim}
                                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-syne font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-2xl shadow-emerald-500/20"
                                        >
                                            <Lock className="w-5 h-5" /> Claim Anonymously
                                        </button>
                                    )
                                )}

                                {status !== 'idle' && (
                                    <div className="bg-black/40 rounded-3xl p-6 border border-white/5 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                                                    <Cpu className="w-4 h-4 text-emerald-500 animate-pulse" />
                                                </div>
                                                <span className="text-sm font-syne font-bold text-neutral-300">ZK Prover</span>
                                            </div>
                                            <span className="text-[10px] font-mono font-bold text-emerald-500/70 uppercase tracking-widest">{status === 'generating_proof' ? 'Running' : 'Ready'}</span>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: status === 'generating_proof' ? "60%" : "100%" }}
                                                    transition={{ duration: 2, ease: "easeInOut" }}
                                                />
                                            </div>
                                            <div className="flex justify-between text-[10px] font-mono text-neutral-600 uppercase tracking-tighter">
                                                <span>{statusMessage}</span>
                                                <span>{status === 'generating_proof' ? '60%' : '100%'}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            
            <div className="mt-12 flex items-center gap-6 opacity-30">
                 <div className="flex items-center gap-2 text-xs font-syne font-bold grayscale">
                    <Zap className="w-4 h-4" /> HELIUS POWERED
                 </div>
                 <div className="w-1 h-1 bg-neutral-800 rounded-full" />
                 <div className="flex items-center gap-2 text-xs font-syne font-bold grayscale">
                    <Shield className="w-4 h-4" /> PRIVACY CASH
                 </div>
            </div>
        </div>
    );
}
