// app/page.tsx
'use client';
import { MenubarAuth } from "@/components/shared/authHeader";
import { NoAuth } from "@/components/shared/noAuthContext";
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
       <>
            {NoAuth()}
       </>
      )}
    </div> 
 );
}