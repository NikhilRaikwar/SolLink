'use client';

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { LandingPage } from '@/components/LandingPage';
import { Dashboard } from '@/components/Dashboard';

export default function Home() {
  const { publicKey } = useWallet();

  return (
    <>
      {publicKey ? <Dashboard /> : <LandingPage />}
    </>
  );
}
