import * as React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Pour Next.js


export function Welcome() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <Card className="max-w-2xl w-full shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-semibold">
                        Welcome on{" "}
                        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                            InfinityMint
                        </span>
                    </CardTitle>

                    <CardDescription className="text-lg text-gray-500 mt-2">
                        Marketplace #1 for selling, buying and discovering new NFTs
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex justify-center py-4">
                    <img
                        src="/images/Ecommerce-web-page-bro.webp"
                        alt="Ecommerce Illustration"
                        className="w-full h-full max-h-96 object-contain"
                    />
                </CardContent>
                <CardFooter className="justify-center items-center">
                    {LoadingButton()}
                </CardFooter>
            </Card>
        </div>
    )
}



export function LoadingButton() {
    const [loading, setLoading] = useState(true); // Démarre directement en mode "chargement"
    const router = useRouter(); // Pour la redirection
  
    useEffect(() => {
      const timer = setTimeout(() => {
        router.push("/"); // Redirection vers la racine "/"
      }, 5000);
  
      return () => clearTimeout(timer); // Nettoie le timer si le composant est démonté
    }, []);
  
    return (
      <button
        type="button"
        className="flex items-center px-4 py-2 text-white font-semibold rounded-md bg-gray-400 cursor-not-allowed"
        disabled
      >
        <svg className="mr-3 size-5 animate-spin" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
        </svg>
        Redirecting...
      </button>
    );
  }
