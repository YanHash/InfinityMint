"use client"

import Image from "next/image";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {notFound, useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {LoadingSpinner} from "@/components/ui/spinner";
import Product from "@/app/model/Product";

const ProductPage = () => {
    const {idProduit} = useParams();
    const [nfts, setNfts] = useState([]);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch("/data.json").then(
            res => res.json()).then(
            (data) => {
                setNfts(data.nfts);
            })
    }, []);

    useEffect(() => {
        let trouve: boolean = false;
        if (nfts.length > 0) {
            nfts.forEach((collection: any) => {
                collection.collectionNfts.forEach((collectionNfts: any) => {
                    if ({idProduit}.idProduit === collectionNfts.id) {
                        setProduct(collectionNfts);
                        trouve = true;
                    }
                });
            });
            if (!trouve) {
                return notFound();
            }
        }
    }, [nfts]);

    return (
        product != null ?
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
            </div> :
            <LoadingSpinner/>
    );
}
export default ProductPage;
