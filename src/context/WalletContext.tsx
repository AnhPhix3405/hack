"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { IWallet } from '@meshsdk/core';
import { useWallet } from '@meshsdk/react';

interface WalletContextProps {
  walletAddress: string;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

async function getWalletAddress(wallet: IWallet): Promise<string> {
    const addresses = await wallet.getUsedAddresses();
    return addresses[0];
}



export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const {wallet} =  useWallet();
    useEffect(() => {
        async function fetchAddr() {
                
                if(wallet)
                {
                    const addr = await getWalletAddress(wallet);
                    setWalletAddress(addr);
                    console.log("dia chi : " +  addr);
                }
            }
            fetchAddr();
    }, [wallet])



  return (
    <WalletContext.Provider value={{ walletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
}