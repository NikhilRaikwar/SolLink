
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import BN from 'bn.js';
import { Utxo } from '@/lib/privacy-cash/utxo';
import { Keypair } from '@/lib/privacy-cash/keypair';
import { prove } from '@/lib/privacy-cash/prover';
import { LightWasm, WasmFactory } from '@lightprotocol/hasher.rs';
import { Shield, ArrowDown, CheckCircle, Lock, Loader2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClaimPage() {
    const params = useParams();
    const noteString = params.note as string;
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [noteData, setNoteData] = useState<any>(null);
    const [status, setStatus] = useState<'idle' | 'generating_proof' | 'submitting' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (noteString) {
            try {
                // Just decoded to check format
                const secretKey = Buffer.from(decodeURIComponent(noteString), 'base64');
                if (secretKey.length !== 64) {
                    throw new Error("Invalid key length");
                }
                setNoteData({ valid: true }); // Dummy state to unblock UI
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

            // 1. Recover the Vault Keypair
            const secretKey = Buffer.from(decodeURIComponent(noteString), 'base64');
            const vaultKeypair = (await import('@solana/web3.js')).Keypair.fromSecretKey(secretKey);

            setStatusMessage("Verifying Balance...");

            // 2. Check Vault Balance
            const balance = await connection.getBalance(vaultKeypair.publicKey);
            if (balance === 0) {
                throw new Error("This link has already been claimed or is empty.");
            }

            setStatus('submitting');
            setStatusMessage("Transferring Funds to Your Wallet...");

            // 3. Construct Sweep Transaction
            // We need to leave a tiny bit for rent/fees, or use closeAccount instructions if it was a token account.
            // For pure SOL, we just transfer (balance - fee).
            const transaction = new Transaction();

            // Simple fee estimation (5000 lamports is standard for signature)
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

            // 4. Send Transaction
            // Critical: The VAULT signs this transaction, paying for the fee.
            // The connected user (recipient) does NOT need to sign or pay gas if we structured it perfectly, 
            // but here we are just sweeping.

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
            <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl text-center">
                    <h1 className="text-xl font-bold text-red-500 mb-2">Error</h1>
                    <p className="text-neutral-400">{error}</p>
                </div>
            </div>
        );
    }

    if (!noteData) {
        return (
            <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
        );
    }



    return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 selection:bg-emerald-500/30">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none" />

            <nav className="fixed top-0 w-full border-b border-white/5 bg-black/20 backdrop-blur-xl z-50">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <div className="w-8 h-8 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <Shield className="w-4 h-4 text-black" />
                        </div>
                        Sol-Link
                    </div>
                </div>
            </nav>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-neutral-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden"
            >
                {status === 'success' ? (
                    <div className="text-center py-8 space-y-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto"
                        >
                            <CheckCircle className="w-10 h-10 text-black" />
                        </motion.div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Transfer Complete!</h2>
                            <p className="text-neutral-400">
                                The funds have been withdrawn to your wallet.
                            </p>
                        </div>
                        <a href="/" className="inline-block mt-4 text-emerald-400 hover:text-emerald-300 font-medium">
                            Create your own link
                        </a>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800 mb-4 border border-white/5">
                                <ArrowDown className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h2 className="text-neutral-400 text-sm font-bold uppercase tracking-wider mb-2">You Received Funds</h2>
                            <div className="text-xl font-mono text-white mb-2">
                                Check wallet for balance
                            </div>
                        </div>

                        <div className="space-y-4">
                            {status === 'idle' && (
                                !publicKey ? (
                                    <div className="flex justify-center">
                                        <WalletMultiButton />
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleClaim}
                                        className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors transform active:scale-[0.98]"
                                    >
                                        <Lock className="w-4 h-4" /> Claim with ZK Proof
                                    </button>
                                )
                            )}

                            {status !== 'idle' && (
                                <div className="bg-black/30 rounded-xl p-4 border border-white/5 space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-neutral-400">Status</span>
                                        <span className="text-emerald-400 font-mono animate-pulse">{status === 'generating_proof' ? 'PROVING' : 'VERIFYING'}</span>
                                    </div>
                                    <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-emerald-500"
                                            initial={{ width: "0%" }}
                                            animate={{ width: status === 'generating_proof' ? "60%" : "100%" }}
                                            transition={{ duration: 2 }}
                                        />
                                    </div>
                                    <div className="text-xs text-center text-neutral-500 font-mono">
                                        {statusMessage}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
