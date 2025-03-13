"use client";
import * as React from "react";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { useAccount } from "wagmi";
import { useMintNFT } from "@/blockchain/hooks/nftHooks";
import { Loader2 } from "lucide-react";


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
  const [ipfsUrl, setIpfsUrl] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [customFields, setCustomFields] = useState<CustomField[]>([{ id: Date.now(), name: "", value: "" }]);

  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
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
      setIpfsUrl(`ipfs://${ipfsHash}`);
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
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Card className="w-[550px]">
        <CardHeader className="text-center">
          <CardTitle>Mint Your NFT</CardTitle>
          <CardDescription>Create your unique NFT.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Name</Label>
                <Input value={nftName} onChange={(e) => setNftName(e.target.value)} placeholder="Name of your NFT" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Description</Label>
                <Input value={nftDescription} onChange={(e) => setNftDescription(e.target.value)} placeholder="Description of your NFT" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <h1 className="text-2xl font-semibold">Générer une image ou uploader</h1>

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
                <Label>Upload File</Label>
                <Input type="file" onChange={handleFileChange} />
                <Button onClick={uploadToPinata} disabled={uploading}>
                  {uploading ? "Uploading..." : "Upload to Pinata"}
                </Button>
                {ipfsUrl && <p>IPFS URL: {ipfsUrl}</p>}
              </div>
              {customFields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Input value={field.name} onChange={(e) => updateField(field.id, "name", e.target.value)} placeholder="Field Name" />
                  <Input value={field.value} onChange={(e) => updateField(field.id, "value", e.target.value)} placeholder="Field Value" />
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
    </div>
  );
}
