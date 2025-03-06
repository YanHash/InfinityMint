"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function CollectionPage() {
    const params = useParams();
    const contractAddress = params?.contractAddress;
    const [collection, setCollection] = useState(null);
    const [nfts, setNfts] = useState([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!contractAddress) return;

        fetch("/collections.json")
            .then((response) => response.json())
            .then((data) => {
                const foundCollection = data.find(
                    (col) => col.contractAddress === contractAddress
                );
                setCollection(foundCollection);
            })
            .catch((error) => console.error("Erreur de chargement des collections:", error));

        fetch("/nfts.json")
            .then((response) => response.json())
            .then((data) => {
                const filteredNfts = data.filter(
                    (nft) => nft.contractAddress === contractAddress
                );
                setNfts(filteredNfts);
            })
            .catch((error) => console.error("Erreur de chargement des NFT:", error));
    }, [contractAddress]);

    if (!isClient || !collection) return <p className="text-center mt-10">Chargement...</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">{collection.name}</h1>
            <p className="text-gray-600 mb-4">{collection.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nfts.map((nft) => (
                    <Link key={nft.id} href={`/product/${nft.id}`}>
                        <Card className="rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition">
                            <Image
                                src={nft.imageUrl}
                                alt={nft.name}
                                width={300}
                                height={200}
                                className="w-full h-48 object-cover"
                            />
                            <CardContent className="p-4">
                                <h2 className="text-xl font-semibold">{nft.name}</h2>
                                <p className="text-gray-600 text-sm mb-2">{nft.description}</p>
                                <p className="text-gray-700 text-sm">Prix: {nft.price} ETH</p>
                                <Button className="mt-3 w-full">Voir les détails</Button>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
