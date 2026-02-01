'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, Transaction, SystemProgram, Keypair } from '@solana/web3.js';
import { Shield, ArrowDown, CheckCircle, Lock, Loader2, Zap, EyeOff, RefreshCw, Sparkles, Globe, AlertCircle, CircleDollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NoteData {
    valid: boolean;
}

export default function ClaimPage() {
    const params = useParams();
    const noteString = params.note as string;
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    const [noteData, setNoteData] = useState<NoteData | null>(null);
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
            const vaultKeypair = Keypair.fromSecretKey(secretKey);

            setStatusMessage("Verifying Balance...");

            const balance = await connection.getBalance(vaultKeypair.publicKey);
            if (balance === 0) {
                throw new Error("This link has already been claimed or is empty.");
            }

            setStatus('submitting');
            setStatusMessage("Transferring Funds...");

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

            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = vaultKeypair.publicKey;
            transaction.sign(vaultKeypair);

            const signature = await connection.sendRawTransaction(transaction.serialize());
            await connection.confirmTransaction(signature, 'confirmed');

            setStatus('success');
            setStatusMessage("Funds Claimed Successfully!");

        } catch (e: unknown) {
            console.error(e);
            setStatus('error');
            const message = e instanceof Error ? e.message : "An unknown error occurred";
            setError(message);
        }
    };

    if (error) {
        return (
            <div className="min-h-screen bg-white text-foreground flex items-center justify-center p-6 selection:bg-accent-primary/20">
                <div className="fixed inset-0 grid-bg opacity-[0.02]" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative p-12 bg-white border border-neutral-100 rounded-[3.5rem] text-center space-y-8 paper-shadow max-w-md"
                >
                    <div className="w-20 h-20 bg-neutral-50 rounded-3xl flex items-center justify-center mx-auto">
                        <AlertCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bricolage font-black tracking-tighter">Access Denied</h1>
                        <p className="text-neutral-500 font-medium leading-relaxed">{error}</p>
                    </div>
                    <button onClick={() => window.location.href = '/'} className="w-full py-6 bg-foreground text-white rounded-2xl font-syne font-black text-xs uppercase tracking-widest hover:bg-accent-primary transition-all shadow-lg">
                        Return to Home
                    </button>
                </motion.div>
            </div>
        );
    }

    if (!noteData) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-accent-primary blur-3xl opacity-20 animate-pulse" />
                    <Loader2 className="relative z-10 w-16 h-16 animate-spin text-accent-primary" />
                </div>
                <span className="font-syne font-black text-[10px] text-foreground tracking-[0.4em] uppercase">Initializing Vault...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-foreground font-plus-jakarta selection:bg-accent-primary/20 overflow-x-hidden">

            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-accent-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent-secondary/5 blur-[100px] rounded-full" />
                <div className="absolute inset-0 grid-bg opacity-[0.02]" />
            </div>

            <nav className="relative z-50">
                <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                    <div
                        onClick={() => window.location.href = '/'}
                        className="flex items-center gap-3 group cursor-pointer"
                    >
                        <div className="relative w-12 h-12 flex items-center justify-center bg-foreground rounded-[1.25rem] paper-shadow">
                            <Shield className="w-6 h-6 text-white stroke-[2.5px]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-syne font-black text-2xl tracking-tight uppercase leading-none">SOLlink</span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-12 pb-40">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-2xl"
                >
                    <div className="relative p-1 bg-gradient-to-br from-neutral-200 to-white rounded-[4rem] paper-shadow">
                        <div className="bg-white rounded-[3.8rem] p-8 md:p-12 space-y-12 overflow-hidden relative text-center">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[100px] -mr-40 -mt-40 pointer-events-none" />

                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-6 py-4 pb-8"
                                    >
                                        <div className="relative inline-flex justify-center">
                                            <div className="absolute inset-0 bg-accent-primary blur-2xl opacity-20 animate-pulse" />
                                            <CheckCircle className="relative w-12 h-12 text-emerald-500 stroke-[2.5px]" />
                                        </div>

                                        <div className="space-y-3">
                                            <h2 className="text-3xl md:text-4xl font-bricolage font-black tracking-tighter leading-none">Vault Swept.</h2>
                                            <p className="text-neutral-500 text-sm max-w-xs mx-auto font-medium leading-relaxed">
                                                Cryptographic transfer complete. <br />Assets have been transferred to your wallet.
                                            </p>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                onClick={() => window.location.href = '/'}
                                                className="px-8 py-3 bg-foreground text-white font-syne font-bold text-xs rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg uppercase tracking-widest"
                                            >
                                                Done
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="interaction"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-12"
                                    >
                                        <div className="space-y-8">
                                            <div className="space-y-4">
                                                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent-primary">Secure Distribution</h2>
                                                <h1 className="text-5xl md:text-6xl font-bricolage font-black tracking-tighter leading-none">Private Vault</h1>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            {status === 'idle' ? (
                                                <div className="space-y-10">
                                                    <p className="text-neutral-500 text-xl font-medium">Sweep the vault assets directly to your wallet.</p>
                                                    {!publicKey ? (
                                                        <div className="[&_.wallet-adapter-button]:w-full [&_.wallet-adapter-button]:h-28 [&_.wallet-adapter-button]:justify-center [&_.wallet-adapter-button]:font-syne [&_.wallet-adapter-button]:font-black [&_.wallet-adapter-button]:bg-foreground [&_.wallet-adapter-button]:text-white [&_.wallet-adapter-button]:rounded-[2.5rem] [&_.wallet-adapter-button]:hover:bg-accent-primary [&_.wallet-adapter-button]:text-2xl [&_.wallet-adapter-button]:uppercase [&_.wallet-adapter-button]:tracking-tighter [&_.wallet-adapter-button]:transition-all paper-shadow">
                                                            <WalletMultiButton>
                                                                Connect Wallet
                                                            </WalletMultiButton>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-6">
                                                            <div className="flex items-center justify-center gap-2 text-emerald-500 font-bold uppercase tracking-widest text-xs">
                                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                                Wallet Connected
                                                            </div>
                                                            <button
                                                                onClick={handleClaim}
                                                                className="group relative w-full h-28 overflow-hidden rounded-[2.5rem] bg-foreground text-white font-syne font-black text-2xl transition-all hover:scale-[1.02] active:scale-[0.98] paper-shadow"
                                                            >
                                                                <span className="relative z-10 flex items-center justify-center gap-4 uppercase tracking-tighter">
                                                                    Sweep Assets <Zap className="w-8 h-8" />
                                                                </span>
                                                                <div className="absolute inset-0 bg-accent-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="space-y-12 bg-neutral-50 rounded-[3.5rem] p-16 border border-neutral-100 shadow-inner">
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-2 text-left">
                                                            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em]">Current Status</span>
                                                            <p className="text-accent-primary font-syne font-black text-lg uppercase tracking-wider">{status === 'generating_proof' ? 'GENERATING PROOF' : 'BROADCASTING'}</p>
                                                        </div>
                                                        <div className="relative">
                                                            <div className="absolute inset-0 bg-accent-primary blur-2xl opacity-20 animate-pulse" />
                                                            <RefreshCw className="w-10 h-10 text-accent-primary animate-spin" />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-8">
                                                        <div className="h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                                                            <motion.div
                                                                className="h-full bg-accent-primary"
                                                                initial={{ width: "0%" }}
                                                                animate={{ width: status === 'generating_proof' ? "65%" : "100%" }}
                                                                transition={{ duration: 4 }}
                                                            />
                                                        </div>
                                                        <p className="text-xs text-neutral-500 font-black uppercase tracking-[0.3em]">
                                                            {statusMessage}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="pt-8 flex items-center justify-center gap-10 text-[10px] font-black text-neutral-300 uppercase tracking-[0.4em]">
                                            <div className="flex items-center gap-2">
                                                <EyeOff className="w-4 h-4" /> Anonymous
                                            </div>
                                            <div className="w-1.5 h-1.5 bg-neutral-200 rounded-full" />
                                            <div className="flex items-center gap-2">
                                                <Shield className="w-4 h-4" /> Encrypted
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </main>

            <footer className="fixed bottom-12 w-full text-center pointer-events-none z-10">
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.5em]">
                    SOLLINK PROTOCOL // PRIVATE LAYER ONE
                </p>
            </footer>
        </div>
    );
}
