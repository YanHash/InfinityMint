"use client";
import * as React from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Trash2 } from "lucide-react";
import { useAccount } from "wagmi";
import { useMintNFT } from "@/blockchain/hooks/nftHooks";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";



interface CustomField {
    id: number;
    name: string;
    value: string;
}

export default function CardWithForm() {
    const { address } = useAccount();
    const [isNFTAlertOpen, setIsNFTAlertOpen] = useState<boolean>(false);
    const [nftName, setNftName] = useState<string>("");
    const [nftDescription, setNftDescription] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [ipfsUrl, setIpfsUrl] = useState<string>("/noImage.jpeg");
    const [uploading, setUploading] = useState<boolean>(false);
    const [customFields, setCustomFields] = useState<CustomField[]>([{ id: Date.now(), name: "", value: "" }]);
    const [isGenerating, setIsGenerating] = useState(false); // Toggle pour choisir entre génération ou upload


    const [prompt, setPrompt] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const { request: requestMintNFT } = useMintNFT(address, nftName, nftDescription, ipfsUrl, JSON.stringify(customFields));

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const uploadToPinata = async () => {
        if (!file) return alert("Please select a file");

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
                    pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY,
                },
            });

            const ipfsHash = response.data.IpfsHash;
            setIpfsUrl(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
        } catch (error) {
            console.error("Upload error:", error);
        }
        setUploading(false);
    };

    const addField = () => {
        setCustomFields([...customFields, { id: Date.now(), name: "", value: "" }]);
    };

    const updateField = (id: number, key: "name" | "value", newValue: string) => {
        setCustomFields(customFields.map(field => field.id === id ? { ...field, [key]: newValue } : field));
    };

    const removeField = (id: number) => {
        setCustomFields(customFields.filter(field => field.id !== id));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!ipfsUrl) return alert("Upload the file first!");

        requestMintNFT();
        setIsNFTAlertOpen(true);
    };

    const generateImage = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
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

            setIpfsUrl(data.ipfsUrl || "");
        } catch (error) {
            setError("Erreur de connexion au serveur.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <Card className="w-[550px] mx-auto">
                <CardHeader className="text-center">
                    <CardTitle>Mint Your NFT</CardTitle>
                    <CardDescription>Create your unique NFT.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label>Name</Label>
                                <Input value={nftName} onChange={(e) => setNftName(e.target.value)}
                                    placeholder="Name of your NFT" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label>Description</Label>
                                <Input value={nftDescription} onChange={(e) => setNftDescription(e.target.value)}
                                    placeholder="Description of your NFT" />
                            </div>
                            <div className="flex justify-between my-4">
                                <Label>Mode Génération d'image</Label>
                                <Switch checked={isGenerating} onCheckedChange={setIsGenerating} className="" />
                            </div>

                            {isGenerating ? (
                                <>
                                    <Label>Prompt pour l'image</Label>
                                    <Input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="Décrivez l'image..." />
                                    <Button onClick={generateImage} disabled={loading || !prompt.trim()}>
                                        {loading ? <Loader2 className="animate-spin" /> : "Générer l'image"}
                                    </Button>

                                </>
                            ) : (
                                <>
                                    <Label>Upload une image</Label>
                                    <Input type="file" onChange={handleFileChange} />
                                    <Button onClick={uploadToPinata} disabled={uploading}>
                                        {uploading ? "Uploading..." : "Upload to Pinata"}
                                    </Button>
                                </>
                            )}

                            {customFields.map((field) => (
                                <div key={field.id} className="flex items-center space-x-2">
                                    <Input value={field.name}
                                        onChange={(e) => updateField(field.id, "name", e.target.value)}
                                        placeholder="Field Name" />
                                    <Input value={field.value}
                                        onChange={(e) => updateField(field.id, "value", e.target.value)}
                                        placeholder="Field Value" />
                                    <Button variant="ghost" onClick={() => removeField(field.id)}>
                                        <Trash2 className="w-5 h-5 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" onClick={addField}>Add Field</Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={() => (window.location.href = "/")} variant="outline">
                        Cancel
                    </Button>
                    <Button variant="default" onClick={handleSubmit}>
                        Mint NFT
                    </Button>
                </CardFooter>
            </Card>
            {(ipfsUrl || nftName) && (
                <Card className="mx-auto rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition w-[400px] mt-6">
                    <h1 className="text-center text-lg font-semibold mt-2">NFT Preview</h1>
                    <div className="flex justify-center">
                        <Image
                            src={
                                ipfsUrl || "/noImage.jpeg"
                            }
                            alt="NFT Preview"
                            width={300}
                            height={300}
                            className="rounded-lg shadow-md"
                        />


                    </div>
                    <CardContent className="p-4">
                        <h2 className="text-xl font-semibold">{nftName || "Nom du NFT"}</h2>
                        <p className="text-gray-600 text-sm">{nftDescription || "Description du NFT"}</p>

                        <div className="mt-2">
                            {customFields.length > 0 && customFields.map((field) => (
                                <p key={field.id} className="text-gray-700 text-sm">
                                    <strong>{field.name}:</strong> {field.value}
                                </p>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

        </div>
    );
}
