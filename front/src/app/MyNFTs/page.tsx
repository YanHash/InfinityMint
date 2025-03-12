'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useGetNFTFromCollection } from "../../blockchain/hooks/marketplaceHook";
import React from "react";

const NFTWallet = () => {
  const { address, isConnected } = useAccount();
  const { nftList, error } = useGetNFTFromCollection(address as `0x${string}`, "0");

  return (
    <div>
      <ConnectButton />
      {isConnected && (
        <div>
          <h2>Vos NFTs</h2>
          {error && <p className="text-red-500">Erreur : {error.message}</p>}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {nftList.map((nft, index) => (
              <div key={index} className="border p-2 rounded-lg">
                <img src={nft.imageUrl} alt={nft.name} className="w-full h-auto rounded-lg" />
                <p className="mt-2 text-center">{nft.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTWallet;
