"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { formatAddress } from "../utils/format";
import { useGetNFTFromCollection } from "@/hooks/useGetNFTFromCollection";


import {
  useAccount,
} from "wagmi";
import { useGetCollection } from "@/hooks/useGetCollection";


export default function CollectionsPage() {
  const { address, isConnected } = useAccount();
  const userAddress = address as `0x${string}`

  const { collectionList, error, isPending, setSkipCollection, refetch } = useGetCollection(userAddress);

  console.log("👉 collectionList: ", collectionList);

  // Hook pour récupérer les NFTs de la collection depuis la blockchain
  const { nftList } = useGetNFTFromCollection(userAddress, collectionList[0]?.collectionId);

  console.log("👉 nftList: ", nftList);

  const parseTokenUri = (tokenUri: string) => {
    try {
      const formattedJson = tokenUri.replace(/""/g, '", "');
      const parsed = JSON.parse(formattedJson);
      return {
        tokenId: parsed.tokenId,
        name: parsed.name || "NFT inconnu",
        description: parsed.description || "Pas de description",
        image: parsed.image || "/noImage.jpeg", // Image par défaut
      };
    } catch (error) {
      console.error("❌ Erreur de parsing du tokenUri :", error);
      return {
        tokenId: "",
        name: "NFT inconnu",
        description: "Erreur lors du chargement",
        image: "/noImage.jpeg", // Image par défaut
      };
    }
  };

  const parsedNFT = parseTokenUri(nftList[0]?.tokenUri);

  console.log("🔵 parsedNFT: ", parsedNFT);



  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Collections NFT</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collectionList.map((collection) => (
          <Card key={collection.collectionId} className="rounded-2xl shadow-lg overflow-hidden">
            <Image
              src={parsedNFT.image || "/noImage.jpeg"}
              alt={collection.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{collection.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{collection.description}</p>
              <p className="text-gray-700 text-sm">Blockchain: ETHEREUM</p>
              <p className="text-gray-700 text-sm">Floor Price: {collection.floorPrice} ETH</p>
              <p className="text-gray-700 text-sm">Volume Traded: {collection.volumeTraded} ETH</p>
              <p className="text-gray-700 text-sm">Owner: {formatAddress(collection.owner)}</p>
              {true && <span className="text-green-500 text-sm font-bold">✔ Verified</span>}
              <Link href={`/collection/${collection.collectionId}`}>
                <Button className="mt-3 w-full">Voir les NFT</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}