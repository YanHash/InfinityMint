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
import { useNFTStore } from "@/store/useNFTStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CollectionPage() {
    const { address } = useAccount();
    const userAddress = address as `0x${string}`;

    const params = useParams();
    const contractId = params?.contractId as string;
    const [isClient, setIsClient] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>("");

    const { nftList, error, isPending, refetch } = useGetNFTFromCollection(userAddress, contractId);

    console.log("👉 nftList: ", nftList);

    const parseTokenUri = (tokenUri: string) => {
        try {
            const formattedJson = tokenUri.replace(/""/g, '", "');
            const parsed = JSON.parse(formattedJson);
            return {
                tokenId: parsed.tokenId,
                name: parsed.name || "NFT inconnu",
                description: parsed.description || "Pas de description",
                image: parsed.image.startsWith("ipfs://")
                    ? `https://gateway.pinata.cloud/ipfs/${parsed.image.replace("ipfs://", "")}`
                    : parsed.image || "/noImage.jpeg",
            };
        } catch (error) {
            console.error("❌ Erreur de parsing du tokenUri :", error);
            return {
                tokenId: "",
                name: "NFT inconnu",
                description: "Erreur lors du chargement",
                image: "/noImage.jpeg",
            };
        }
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        switch (filter) {
            case "lowToHigh": {
                nftList.sort((a, b) => b.price - a.price);
                break;
            }
            case "highToLow": {
                nftList.sort((a, b) => a.price - b.price);
                break;
            }
            case "newest": {
                nftList.sort();
                break;
            }
        }
    }, [filter]);

    return (
        <div className="container mx-auto p-6">
            <Button onClick={() => refetch()} className="mb-6">
                🔄 Rafraîchir les NFTs
            </Button>

            <div className="mb-5 w-1/4">
                <Select onValueChange={(filtre) => setFilter(filtre)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="lowToHigh">Price : Low to High</SelectItem>
                        <SelectItem value="highToLow">Price : High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>

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
                        <Link
                            key={index}
                            href={`/product/${parsedNFT.tokenId}`}
                            onClick={() =>
                                useNFTStore.getState().setSelectedNFT({
                                    id: parsedNFT.tokenId,
                                    tokenId: parsedNFT.tokenId,
                                    name: parsedNFT.name,
                                    description: parsedNFT.description,
                                    image: parsedNFT.image,
                                    seller: nft.seller,
                                    price: nft.price,
                                    contractId: contractId,
                                    contractAddress: nft.contractAddress,
                                })
                            }
                        >
                            <Card className="rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition">
                                <Image
                                    src={parsedNFT.image}
                                    alt={parsedNFT.name}
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                    onError={(e) => (e.currentTarget.src = "/noImage.jpeg")}
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