import { NextResponse } from "next/server";
import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";
import path from "path";

interface OpenAIResponse {
    data: { url: string }[];
    error?: { message: string };
}

interface PinataResponse {
    IpfsHash?: string;
    error?: string;
}

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: "Le prompt est requis" }, { status: 400 });
        }

        // Étape 1 : Génération d’image via OpenAI
        const openAiResponse = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt,
                n: 1,
                size: "1024x1024",
            }),
        });

        const openAiData = (await openAiResponse.json()) as OpenAIResponse;

        if (openAiData.error) {
            return NextResponse.json({ error: openAiData.error.message }, { status: 500 });
        }

        const imageUrl = openAiData.data[0].url;

        // Étape 2 : Télécharger l’image
        const imageResponse = await fetch(imageUrl);
        const buffer = await imageResponse.arrayBuffer();
        const tempFilePath = path.join("/tmp", "generated-image.png");
        fs.writeFileSync(tempFilePath, Buffer.from(buffer));

        // Étape 3 : Envoyer à Pinata
        const formData = new FormData();
        formData.append("file", fs.createReadStream(tempFilePath));

        const pinataResponse = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.PINATA_JWT}`,
            },
            body: formData,
        });

        const pinataData = (await pinataResponse.json()) as PinataResponse;

        if (!pinataData.IpfsHash) {
            return NextResponse.json({ error: "Échec de l’upload sur Pinata" }, { status: 500 });
        }

        const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${pinataData.IpfsHash}`;

        return NextResponse.json({ imageUrl, ipfsUrl });
    } catch (error) {
        console.error("Erreur serveur:", error);
        return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
    }
}
