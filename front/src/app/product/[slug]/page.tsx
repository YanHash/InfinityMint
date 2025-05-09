"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useNFTStore} from "@/store/useNFTStore";
import {useBuyNFT} from "@/blockchain/hooks/marketplaceHook";
import {formatAddress} from "@/utils/format";

import {useAccount} from "wagmi";

export default function ProductPage() {
    const router = useRouter();
    const {selectedNFT} = useNFTStore();

    useEffect(() => {
        if (!selectedNFT) {
            router.push("/"); // Redirige vers la collection si aucun NFT n'est sélectionné
        }
    }, [selectedNFT, router]);

    if (!selectedNFT) return <p className="text-center text-gray-500">NFT non trouvé</p>;

    // Ajout de valeurs par défaut si certaines données sont manquantes
    const product = {
        id: selectedNFT.id || "N/A",
        name: selectedNFT.name || "NFT Inconnu",
        description: selectedNFT.description || "Aucune description disponible.",
        price: selectedNFT.price || 0,
        imageUrl: selectedNFT.image,
        seller: selectedNFT.seller,
        blockchain: "Ethereum",
        contractId: selectedNFT.contractId,
        contractAddress: selectedNFT.contractAddress,
        tokenId: selectedNFT.tokenId,
        standard: "ERC-721",
        attributes: {},
        creator: "Inconnu",
        royalties: "0%",
        listingType: "Achat immédiat",
        highestBid: "0",
        lastSalePrice: "0",
        marketplaceFees: "2.5%",
        history: [],
        verifiedCollection: true,
    };

    const {address} = useAccount();

    const {request} = useBuyNFT(address, product.tokenId, product.price.toString());

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Image NFT */}
            <div className="w-1/2 h-screen relative">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-r-lg"
                />
            </div>

            {/* Détails NFT */}
            <div className="w-1/2 flex justify-center items-center p-8">
                <Card className="w-full shadow-lg rounded-2xl p-6 bg-white">
                    <CardContent>
                        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                        {product.verifiedCollection && (
                            <span className="text-green-500 text-sm font-semibold">✅ Collection Vérifiée</span>
                        )}
                        <p className="text-gray-600 my-2">{product.description}</p>

                        {/* Prix et enchères */}
                        <p className="text-lg font-bold text-gray-900">
                            Ξ {product.price} ETH
                        </p>
                        {product.listingType === "Enchères" && (
                            <p className="text-sm text-gray-500">
                                Offre la plus haute : Ξ {product.highestBid} ETH
                            </p>
                        )}

                        <div className="mt-4 text-sm text-gray-700">
                            <p>
                                <strong>Blockchain :</strong> {product.blockchain}
                            </p>
                            <p>
                                <strong>Seller :</strong>{" "}
                                <span className="break-all">{formatAddress(product.seller)}</span>
                            </p>
                            <p>
                                <strong>Collection ID :</strong>{" "}
                                <span className="break-all">{formatAddress(product.contractId)}</span>
                            </p>
                            <p>
                                <strong>Contract :</strong>{" "}
                                <span className="break-all">{formatAddress(product.contractAddress)}</span>
                            </p>
                            <p>
                                <strong>Token ID :</strong> {product.tokenId}
                            </p>
                            <p>
                                <strong>Standard :</strong> {product.standard}
                            </p>
                            <p>
                                <strong>Créateur :</strong> {product.creator}
                            </p>
                            <p>
                                <strong>Royalties :</strong> {product.royalties}
                            </p>
                            <p>
                                <strong>Frais Marketplace :</strong> {product.marketplaceFees}
                            </p>
                        </div>

                        {/* Attributs */}
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold text-gray-900">Attributs</h2>
                            <ul className="text-sm text-gray-700">
                                {Object.entries(product.attributes).length > 0 ? (
                                    Object.entries(product.attributes).map(([key, value]) => (
                                        <li key={key}>
                                            <strong>{key} :</strong>{" "}
                                            {Array.isArray(value) ? (value as string[]).join(", ") : (value as string)}
                                        </li>
                                    ))
                                ) : (
                                    <p>Aucun attribut disponible.</p>
                                )}
                            </ul>
                        </div>

                        {/* Historique des ventes */}
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Historique des ventes
                            </h2>
                            <ul className="text-sm text-gray-700">
                                {product.history.length > 0 ? (
                                    product.history.map((event, index) => (
                                        <li key={index}>
                                            <strong>{event.event} :</strong> {event.from} → {event.to} pour
                                            Ξ {event.price} ETH ({event.date})
                                        </li>
                                    ))
                                ) : (
                                    <p>Aucun historique disponible.</p>
                                )}
                            </ul>
                        </div>

                        <Button onClick={request} className="mt-4 w-full">
                            Acheter Maintenant
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
