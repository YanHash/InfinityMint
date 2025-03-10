"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Collection {
    id: string;
    name: string;
    description: string;
    blockchain: string;
    floorPrice: number;
    volumeTraded: number;
    owners: number;
    verified: boolean;
    imageUrl: string;
    contractAddress: string;
}

export default function CollectionsPage() {
    const [collections, setCollections] = useState<Collection[]>([]);

    useEffect(() => {
        fetch("/collections.json")
            .then((response) => response.json())
            .then((data: Collection[]) => setCollections(data))
            .catch((error) => console.error("Erreur de chargement des collections:", error));
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Collections NFT</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((collection) => (
                    <Card key={collection.id} className="rounded-2xl shadow-lg overflow-hidden">
                        <Image
                            src={collection.imageUrl}
                            alt={collection.name}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover"
                        />
                        <CardContent className="p-4">
                            <h2 className="text-xl font-semibold">{collection.name}</h2>
                            <p className="text-gray-600 text-sm mb-2">{collection.description}</p>
                            <p className="text-gray-700 text-sm">Blockchain: {collection.blockchain}</p>
                            <p className="text-gray-700 text-sm">Floor Price: {collection.floorPrice} ETH</p>
                            <p className="text-gray-700 text-sm">Volume Traded: {collection.volumeTraded} ETH</p>
                            <p className="text-gray-700 text-sm">Owners: {collection.owners}</p>
                            {collection.verified && <span className="text-green-500 text-sm font-bold">✔ Verified</span>}
                            <Link href={`/collection/${collection.contractAddress}`}>
                                <Button className="mt-3 w-full">Voir les NFT</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}