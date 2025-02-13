import React from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductPage: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="max-w-md w-full p-4 bg-white shadow-lg rounded-2xl">
        <CardContent className="p-4">
          <h1 className="text-xl font-semibold">test</h1>
          <p className="text-gray-600 my-2">ceci est une description</p>
          <p className="text-lg font-bold text-gray-900">$35</p>
          <Button className="mt-4 w-full">Add to Cart</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPage;