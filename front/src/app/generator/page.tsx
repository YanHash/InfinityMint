"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function ImageGenerator() {
    const [prompt, setPrompt] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [ipfsUrl, setIpfsUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const generateImage = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        setImageUrl("");
        setIpfsUrl("");
        setError("");

        try {

            const response = await fetch("/api/generate-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });



            const data: { imageUrl?: string; ipfsUrl?: string; error?: string } = await response.json();

            if (!response.ok || data.error) {
                setError(data.error || "Une erreur est survenue.");
                setLoading(false);
                return;
            }

            setImageUrl(data.imageUrl || "");
            setIpfsUrl(data.ipfsUrl || "");
        } catch (error) {
            setError("Erreur de connexion au serveur.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <h1 className="text-2xl font-semibold">Générateur d'images AI & IPFS 🚀</h1>

            <Input
                type="text"
                placeholder="Décrivez l'image à générer..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full max-w-md"
            />

            <Button onClick={generateImage} disabled={loading || !prompt.trim()} className="w-full max-w-md">
                {loading ? <Loader2 className="animate-spin" /> : "Générer une image"}
            </Button>

            {error && <p className="text-red-500">{error}</p>}

            {imageUrl && (
                <Card className="mt-4 w-full max-w-md">
                    <CardContent className="p-4 flex flex-col items-center">
                        <img src={imageUrl} alt="Image générée" className="rounded-lg shadow-md" />
                        {ipfsUrl && (
                            <a
                                href={ipfsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 text-blue-500 underline"
                            >
                                Voir sur IPFS
                            </a>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
