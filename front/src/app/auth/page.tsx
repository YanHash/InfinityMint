// app/page.tsx
'use client';
import { MenubarAuth } from "@/components/shared/authHeader";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi'

export default function Home() {
  const { address, isConnected } = useAccount();
  return (
    <div>
      {isConnected ? (
        <>
            <MenubarAuth address={address ?? ''} isConnected={isConnected} />
        </>
      ) : (
       <><p>Please connect your Wallet.</p><ConnectButton /></>
      )}
    </div> 
 );
}