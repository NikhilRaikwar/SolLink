
# Sol-Link – Private SOL Sharing via ZK Mixer Links

![Solana](https://img.shields.io/badge/Solana-Privacy%20Hack-9945FF?style=flat&logo=solana)
![Privacy Cash](https://img.shields.io/badge/Privacy%20Cash-Integrated-00C4B4)
![Helius](https://img.shields.io/badge/Helius-Powered-orange)

**Privacy-first secret links for sending SOL on Solana – powered by Privacy Cash-inspired ZK mixer + Helius RPC.**

[Live Demo (Vercel/Devnet)] | [Video Demo (3-min Loom/YouTube)] | [X Post / Submission Tweet]

## 🏆 Hackathon Submission

**Solana Privacy Hack 2026**  
**Tracks Targeted**:
- Track 02: Privacy Tooling ($15K)
- Track 01: Private Payments ($15K)
- Track 03: Open Track ($18K pool)

**Sponsor Bounties Targeted**:
- **Privacy Cash** – Best Overall App ($6K) / Best Integration ($6K)
- **Helius** – Best Privacy Project with Helius RPCs & Tooling ($5K)
- QuickNode – Most Impactful Open-Source Privacy Tooling ($3K, if applicable)

## The Problem

On Solana, sending SOL via public wallets or simple links exposes:
- Sender/receiver addresses
- Transaction history
- Funding trails (easy to link via explorer)

This breaks privacy for:
- Private gifting / remittances (especially in India & emerging markets)
- DAO bounties / friend payments
- Anonymous tipping / micro-donations

Traditional mixers are complex, slow, or custodial. Users want **simple, fast, private sharing** without losing control.

## Our Solution: Sol-Link

**Sol-Link** is a web app that lets anyone create **secret, private SOL sharing links** using a **zero-knowledge mixer** inspired by Privacy Cash.

**How it works (high-level)**:
1. User deposits SOL from their wallet → creates a **Private Note** (UTXO-like secret).
2. App generates a **secret link** containing the encrypted note keypair (client-side).
3. Recipient clicks link → claims SOL privately (sweeps funds via Helius-optimized RPC).
4. On-chain: No direct link between depositor and claimant (ZK unlinkability simulated via note commitments).

**Key Privacy Win**: The deposit and claim transactions are unlinkable — no obvious trail on explorer.

## Tech Stack & Highlights

- **Frontend**: Next.js 14 + React + Chakra UI + Wallet Adapter
- **Privacy Core**: Ported Privacy Cash SDK logic (`src/lib/privacy-cash`)
  - Utxo notes (amount + keypair + blinding)
  - Merkle Tree commitments
  - Groth16 ZK proof generation (snarkjs, client-side)
- **RPC & Infra**: Helius Devnet RPC (fast balance checks, reliable tx routing)
  - Endpoint: `https://devnet.helius-rpc.com/?api-key=...`
  - Why Helius? Instant vault queries → no spinning loaders on claim
- **Hybrid ZK Flow** (devnet-friendly):
  - Client-side note & proof generation
  - Tiplink-style sweeper for claim (simulates full unlinkability)
  - Roadmap: Full on-chain Groth16 verifier post-hack

## Demo Flow (What Judges Should See)

1. Connect Phantom wallet (devnet)
2. Enter amount → Create secret link (deposits SOL + generates encrypted keypair)
3. Copy & share link (e.g., via WhatsApp / Telegram)
4. Open link in new tab/browser → Claim SOL (Helius-powered fast check + sweep)
5. Check Solana Explorer: No obvious sender → receiver link

## Setup & Run Locally

```bash
git clone https://github.com/NikhilRaikwar/SolLink.git
cd sol-link
npm install
# Add your Helius devnet key to .env.local if needed
npm run dev -- --webpack
```

Open http://localhost:3000

**Devnet Requirements**:
- Phantom in devnet mode
- Airdrop SOL: `solana airdrop 2`

## Bounty Alignment

- **Privacy Cash**: Direct port of core mixer logic (Utxo, MerkleTree, Prover) → strong integration & creative use-case (private sharing links)
- **Helius**: Explicit fast RPC usage for UX-critical balance checks & tx reliability → perfect fit for "best privacy project with Helius"
- Open-source lib (`src/lib/privacy-cash`) → qualifies for QuickNode tooling prize

## Roadmap (Post-Hack)

- Full on-chain Groth16 verifier deployment (trusted setup)
- NFT private links (Helius DAS API integration)
- Multi-token support (USDC, memecoins)
- Mobile-friendly PWA + Phantom deep-link support
- DAO tipping integration (Realms / Squads)

## Why This Matters

Privacy shouldn’t be hard or slow. Sol-Link makes private SOL transfers as easy as sharing a link — perfect for remittances, creator tips, anonymous donations, and everyday Web3 users who value discretion.

Built with ❤️ in Bhopal, India 🇮🇳

## License

MIT

Made for **Solana Privacy Hack 2026**  
Questions? DM @NikhilRaikwarr on X
