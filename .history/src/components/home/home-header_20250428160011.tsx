"use client"

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {useWalletList} from '@meshsdk/react';
import { useWallet } from '@meshsdk/react';
// import { CardanoWallet } from '@meshsdk/react';

export function HomeHeader() {
  // const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);
  const { connect, connected, address } = useWallet();
  console.log(connected)
  
  const handleConnectWallet = () => {
    // router.push('/dashboard');
    setIsOpen(!isOpen);  
  };
  const wallets = useWalletList();
  return (
    <header className="w-full px-4 sm:px-6 lg:px-8 py-4 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-primary/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold gradient-text">BlockFund</span>
        </Link>

        <div className="relative">
          <Button onClick={handleConnectWallet} variant="outline" className="hover:border-primary hover:text-primary transition-colors">
            <Wallet className="mr-2 h-4 w-4" />
            Kết nối ví
          </Button>
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
              {wallets.map((wallet, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={async () => {
                    await connect(wallet.name);
                    console.log(`Connected to ${wallet.name}`);
                    console.log(connected);
                  }}
                >
                  <img
                    src={wallet.icon}
                    alt={wallet.name}
                    className="w-8 h-8 mr-3"
                  />
                  <span>{wallet.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}