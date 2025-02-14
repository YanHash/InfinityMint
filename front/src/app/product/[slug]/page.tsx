"use-client"
import React from "react";
import Image from "next/image";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";


interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

const dummyProduct: Product = {
    id: "1",
    name: "Rare NFT #001",
    description: "Une œuvre d'art numérique unique en son genre.",
    price: 2.5, // Prix en ETH
    imageUrl: "/images/nft1.webp",
};

const ProductPage: React.FC<{ product: Product }> = ({product}) => {
    return (
        <div className="flex min-h-screen">
            {/* Image Section */}
            <div className="w-1/2 h-screen relative">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-r-lg"
                />
            </div>

            {/* Product Details Section */}
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
};

// 🔥 Correction : un seul `export default` qui affiche `ProductPage` avec les données de `dummyProduct`
export default function Page() {
    return (
        <div>
            <ProductPage product={dummyProduct}/>
        </div>);
}
