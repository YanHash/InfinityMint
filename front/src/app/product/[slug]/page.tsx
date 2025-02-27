import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import path from "path";
import fs from "fs";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
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

    if (!product) return <p className="text-center text-gray-500">NFT non trouvé</p>;

    return (
        <div className="flex min-h-screen">
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
            <div className="w-1/2 flex justify-center items-center p-8 bg-white">
                <Card className="max-w-md w-full shadow-lg rounded-2xl p-6">
                    <CardContent>
                        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                        <p className="text-gray-600 my-2">{product.description}</p>
                        <p className="text-lg font-bold text-gray-900">Ξ {product.price} ETH</p>
                        <Button className="mt-4 w-full">Buy Now</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
