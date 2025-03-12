import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import path from "path";
import fs from "fs";
import { useBuyNFT } from "@/blockchain/hooks/marketplaceHook";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    blockchain: string;
    contractAddress: string;
    tokenId: string;
    standard: string;
    attributes: {
        type: string;
        rarity: string;
        [key: string]: string | string[];
    };
    creator: string;
    royalties: string;
    listingType: string;
    highestBid: string;
    lastSalePrice: string;
    marketplaceFees: string;
    history: {
        event: string;
        from: string;
        to: string;
        price: string;
        date: string;
    }[];
    verifiedCollection: boolean;
}

const getProductData = async (slug: string) => {
    const filePath = path.join(process.cwd(), "public", "nfts.json");
    if (!fs.existsSync(filePath)) return null;
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const nfts: Product[] = JSON.parse(jsonData);
    return nfts.find((nft) => nft.id === slug) || null;
};

export async function generateStaticParams() {
    const filePath = path.join(process.cwd(), "public", "nfts.json");
    if (!fs.existsSync(filePath)) return [];
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const nfts: Product[] = JSON.parse(jsonData);
    return nfts.map((nft) => ({ slug: nft.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    if (!resolvedParams || !resolvedParams.slug) return <p className="text-center text-gray-500">NFT non trouvé</p>;
    const product = await getProductData(resolvedParams.slug);

    const {request, isSuccess, isError, error} = useBuyNFT("0x",product?.tokenId ?? "", product?.price.toString() ?? "0");

    if (!product) return <p className="text-center text-gray-500">NFT non trouvé</p>;

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Image NFT */}
            <div className="w-1/2 h-screen relative">
                {product.imageUrl ? (
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-r-lg"
                    />
                ) : null}
            </div>

            {/* Détails NFT */}
            <div className="w-1/2 flex  justify-center items-center p-8">
                <Card className="w-full shadow-lg rounded-2xl p-6 bg-white">
                    <CardContent>
                        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                        {product.verifiedCollection && <span className="text-green-500 text-sm font-semibold">✅ Collection Vérifiée</span>}
                        <p className="text-gray-600 my-2">{product.description}</p>

                        {/* Prix et enchères */}
                        <p className="text-lg font-bold text-gray-900">Ξ {product.price} ETH</p>
                        {product.listingType === "Enchères" && (
                            <p className="text-sm text-gray-500">Offre la plus haute : Ξ {product.highestBid} ETH</p>
                        )}

                        <div className="mt-4 text-sm text-gray-700">
                            <p><strong>Blockchain :</strong> {product.blockchain}</p>
                            <p><strong>Contrat :</strong> <span className="break-all">{product.contractAddress}</span></p>
                            <p><strong>Token ID :</strong> {product.tokenId}</p>
                            <p><strong>Standard :</strong> {product.standard}</p>
                            <p><strong>Créateur :</strong> {product.creator}</p>
                            <p><strong>Royalties :</strong> {product.royalties}</p>
                            <p><strong>Frais Marketplace :</strong> {product.marketplaceFees}</p>
                        </div>

                        {/* Attributs */}
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold text-gray-900">Attributs</h2>
                            <ul className="text-sm text-gray-700">
                                {Object.entries(product.attributes).map(([key, value]) => (
                                    <li key={key}><strong>{key} :</strong> {Array.isArray(value) ? value.join(", ") : value}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Historique des ventes */}
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold text-gray-900">Historique des ventes</h2>
                            <ul className="text-sm text-gray-700">
                                {product.history.map((event, index) => (
                                    <li key={index}>
                                        <strong>{event.event} :</strong> {event.from} → {event.to} pour Ξ {event.price} ETH ({event.date})
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button onClick={request} className="mt-4 w-full">Acheter Maintenant</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
