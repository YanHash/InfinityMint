"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { abi, contractAddress } from "@/app/Marketplace/constants/index";
import {
  useAccount,
  useSendTransaction,
  useWriteContract,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
} from "wagmi";
import { useState } from "react";
import { parseEther } from "viem/utils";

import { WriteContractBlockain, App } from "@/blockchain/marketplace";
import { WriteMarketplaceBlockchainBuyNFT, WriteMarketplaceBlockchainListNFT } from "@/blockchain/components/writeMarketplaceBlockchain";
import {
  GetCollectionFromBlockchain,
  GetNFTHorsSerieFromBlockchain,
  GetNFTToCollectionFromBlockchain,
  GetUserInformationsFromBlockchain,
} from "@/blockchain/components/getFromBlockain";

export default function Home() {
  const { address, isConnected } = useAccount();

  const [tokenIdNft, setTokenIdNft] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [collectionId, setCollectionId] = useState<string>("0");

  const [nftContractBuy, setNftContractBuy] = useState<string | null>(null);
  const [tokenIdNftBuy, setTokenIdNftBuy] = useState<string | null>(null);

  const [collectionName, setCollectionName] = useState<string | null>(null);
  const [collectionDescription, setCollectionDescription] = useState<
    string | null
  >(null);

  return (
    <main className="min-h-screen p-8">
        <div className="flex justify-end mb-8">
          <ConnectButton />
        </div>
        {isConnected ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200/20">
            <h1 className="text-2xl font-bold mb-6 text-center">Buy NFT</h1>

            <div className="space-y-6">
              <div className="space-y-4">

                <input
                  type="text"
                  onChange={(e) => {
                    setTokenIdNft(e.target.value);
                  }}
                  placeholder="Token ID"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />

                <input
                  type="text"
                  onChange={(e) => {
                    setPrice((e.target.value));
                  }}
                  placeholder="Price"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />

                <WriteMarketplaceBlockchainBuyNFT
                  accountAddress={address as `0x${string}`}
                  tokenId={tokenIdNft ?? ""}
                  price={price?.toString() ?? "100"}
                ></WriteMarketplaceBlockchainBuyNFT>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-20">
            <h2 className="text-xl font-semibold mb-4">
              Welcome to Simple Storage DApp
            </h2>
            <p className="text-gray-400">
              Please connect your wallet to interact with the blockchain.
            </p>
          </div>
        )}





      <div className="max-w-2xl mx-auto">
        <div className="flex justify-end mb-8">
          <ConnectButton />
        </div>
        {isConnected ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200/20">
            <h1 className="text-2xl font-bold mb-6 text-center">List NFT</h1>

            <div className="space-y-6">
              <div className="space-y-4">

                <input
                  type="text"
                  onChange={(e) => {
                    setTokenIdNft(e.target.value);
                  }}
                  placeholder="Token ID"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />

                <input
                  type="text"
                  onChange={(e) => {
                    setPrice((e.target.value));
                  }}
                  placeholder="Price"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />

                <input
                  type="text"
                  onChange={(e) => {
                    setCollectionId(e.target.value);
                  }}
                  placeholder="collectionId"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />

                <WriteMarketplaceBlockchainListNFT
                  accountAddress={address as `0x${string}`}
                  tokenId={tokenIdNft ?? ""}
                  price={price?.toString() ?? "10"}
                  collectionId={collectionId}
                ></WriteMarketplaceBlockchainListNFT>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-20">
            <h2 className="text-xl font-semibold mb-4">
              Welcome to Simple Storage DApp
            </h2>
            <p className="text-gray-400">
              Please connect your wallet to interact with the blockchain.
            </p>
          </div>
        )}

        <div className="max-w-2xl mx-auto">
          <div className="flex justify-end mb-8">
            <ConnectButton />
          </div>
          {isConnected ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200/20">
              <h1 className="text-2xl font-bold mb-6 text-center">
                Create Collection
              </h1>

              <div className="space-y-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    onChange={(e) => {
                      setCollectionName(e.target.value);
                    }}
                    placeholder="Name"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />

                  <input
                    type="text"
                    onChange={(e) => {
                      setCollectionDescription(e.target.value);
                    }}
                    placeholder="description"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />

                  <WriteContractBlockain
                    accountAddress={address as `0x${string}`}
                    functionName={"createCollection"}
                    argsTab={[collectionName, collectionDescription]}
                  ></WriteContractBlockain>
                  <div>
                    <GetCollectionFromBlockchain
                      accountAddress={address as `0x${string}`}
                      functionName={"getTenCollections"}
                      collectionId={"0"}
                    ></GetCollectionFromBlockchain>
                  </div>
                </div>
              </div>

              <div>
                <GetNFTToCollectionFromBlockchain
                  accountAddress={address as `0x${string}`}
                  collectionId="9430611854563446828391886019777627856093821975079941606568823989226042250080"
                  functionName={""}
                ></GetNFTToCollectionFromBlockchain>
              </div>

              <div>
                <GetNFTHorsSerieFromBlockchain
                  accountAddress={address as `0x${string}`}
                ></GetNFTHorsSerieFromBlockchain>
              </div>

              <div>
                <GetUserInformationsFromBlockchain accountAddress={address as `0x${string}`}></GetUserInformationsFromBlockchain>
              </div>
            </div>
          ) : (
            <div className="text-center mt-20">
              <h2 className="text-xl font-semibold mb-4">
                Welcome to Simple Storage DApp
              </h2>
              <p className="text-gray-400">
                Please connect your wallet to interact with the blockchain.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
