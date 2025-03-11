"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useGetNFTFromCollection } from "@/hooks/useGetNFTFromCollection";
import { formatAddress } from "../../../utils/format";


interface NFT {
    id: string;
    seller: `0x${string}`;
    price: number;
    tokenUri: string;
}

export default function CollectionPage() {
    const { address } = useAccount();
    const userAddress = address as `0x${string}`;

    const params = useParams();
    const contractAddress = params?.contractAddress as string;
    const [isClient, setIsClient] = useState<boolean>(false);

    // Hook pour récupérer les NFTs de la collection depuis la blockchain
    const { nftList, error, isPending, refetch } = useGetNFTFromCollection(userAddress, contractAddress);

    const parseTokenUri = (tokenUri: string) => {
        try {
            const formattedJson = tokenUri.replace(/""/g, '", "');
            const parsed = JSON.parse(formattedJson);
            return {
                name: parsed.name || "NFT inconnu",
                description: parsed.description || "Pas de description",
                image: parsed.image?.startsWith("http") ? parsed.image : `${parsed.image}`,
            };
        } catch (error) {
            console.error("❌ Erreur de parsing du tokenUri :", error);
            return {
                name: "NFT inconnu",
                description: "Erreur lors du chargement",
                image: "/default-nft.png",
            };
        }
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="container mx-auto p-6">
            <Button onClick={() => refetch()} className="mb-6">
                🔄 Rafraîchir les NFTs
            </Button>

            {isPending && <p className="text-blue-500">Chargement des NFTs...</p>}
            {error && <p className="text-red-500">Erreur : {error.message}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nftList.length === 0 && !isPending && (
                    <p className="text-center text-gray-500 col-span-3">
                        ❌ Aucun NFT trouvé dans cette collection.
                    </p>
                )}

                {nftList.map((nft, index) => {
                    const parsedNFT = parseTokenUri(nft.tokenUri);
                    return (
                        <Link key={index} href={`/product/${nft.id}`}>
                            <Card className="rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition">
                                <Image
                                    src={parsedNFT.image}
                                    alt={parsedNFT.name}
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                                <CardContent className="p-4">
                                    <h2 className="text-xl font-semibold">{parsedNFT.name}</h2>
                                    <p className="text-gray-700 text-sm">{parsedNFT.description}</p>
                                    <p className="text-gray-700 text-sm">Vendeur: {formatAddress(nft.seller)}</p>
                                    <p className="text-gray-700 text-sm">Prix: {nft.price} ETH</p>
                                    <Button className="mt-3 w-full">Voir les détails</Button>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
