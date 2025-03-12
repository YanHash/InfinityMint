"use client";

import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"

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

interface NFT {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    contractAddress: string;
}

export default function CollectionPage() {
    const params = useParams();
    const contractAddress = params?.contractAddress as string;
    const [collection, setCollection] = useState<Collection | null>(null);
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [isClient, setIsClient] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>("");


    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!contractAddress) return;

        fetch("/collections.json")
            .then((response) => response.json())
            .then((data: Collection[]) => {
                const foundCollection = data.find((col) => col.contractAddress === contractAddress);
                setCollection(foundCollection || null);
            })
            .catch((error) => console.error("Erreur de chargement des collections:", error));

        fetch("/nfts.json")
            .then((response) => response.json())
            .then((data: NFT[]) => {
                const filteredNfts = data.filter((nft) => nft.contractAddress === contractAddress);
                setNfts(filteredNfts);
            })
            .catch((error) => console.error("Erreur de chargement des NFT:", error));
    }, [contractAddress]);

    useEffect(() => {
        switch (filter) {
            case "lowToHigh" : {
                nfts.sort(function (a, b) {
                    return b.price - a.price;
                });
                break
            }
            case "highToLow" : {
                nfts.sort(function (a, b) {
                    return a.price - b.price;
                });
                break
            }
            case "newest" : {
                nfts.sort();
                //todo check
                break
            }
        }
        setNfts(nfts);
    }, [filter]);

    if (!isClient || !collection) return <p className="text-center mt-10">Chargement...</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">{collection.name}</h1>
            <p className="text-gray-600 mb-4 text-center">{collection.description}</p>
            <br/>
            <div className={"mb-5 w-1/4"}>
                <Select onValueChange={(filtre) => setFilter(filtre)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="lowToHigh">Price : Low to High</SelectItem>
                        <SelectItem value="highToLow">Price : High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nfts.map((nft) => (
                    <Link key={nft.id} href={`/product/${nft.id}`}>
                        <Card
                            className="rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition">
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
