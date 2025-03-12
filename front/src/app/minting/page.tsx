"use client";
import * as React from "react";
import { useEffect, useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react"; // Icône poubelle

import {
  useCreateCollection,
  useGetCollection,
} from "@/blockchain/hooks/marketplaceHook";
import { useAccount } from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useMintNFT } from "@/blockchain/hooks/nftHooks";

export default function CardWithForm() {
  const { address } = useAccount();
  const {
    collectionList,
    error: errorCollection,
    isPending: isPendingCollection,
    setSkipCollection,
    refetch: refetchCollection,
  } = useGetCollection(address as `0x${string}`);

  const [customFields, setCustomFields] = useState([
    { id: Date.now(), name: "", value: "" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isNFTAlertOpen, setIsNFTAlertOpen] = useState(false);

  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");

  const { request, isSuccess, isError, error } = useCreateCollection(
    address,
    collectionName,
    collectionDescription
  );

  useEffect(() => {
    // Cette fonction permet de raffraichir la page lorsqu'il y a un changement sur la creation de la collection
    if (isSuccess) {
      refetchCollection();
    }
  }, [isSuccess]);

  // Ajouter un champ dynamique
  const addField = () => {
    setCustomFields([...customFields, { id: Date.now(), name: "", value: "" }]);
  };

  // Modifier un champ
  const updateField = (id: number, key: "name" | "value", newValue: string) => {
    setCustomFields(
      customFields.map((field) =>
        field.id === id ? { ...field, [key]: newValue } : field
      )
    );
  };

  // Supprimer un champ
  const removeField = (id: number) => {
    setCustomFields(customFields.filter((field) => field.id !== id));
  };

  // États pour les champs principaux
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [nftUrl, setNftUrl] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");

  const {
    request: requestMintNFT,
    isSuccess: isSuccessMintNFT,
    isError: isErrorMintNFT,
    error: errorMintNFT,
  } = useMintNFT(
    address,
    nftName,
    nftDescription,
    nftUrl,
    JSON.stringify(customFields)
  );

  // Soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nftData = {
      name: nftName,
      description: nftDescription,
      url: nftUrl,
      collection: selectedCollection,
      customFields,
    };

    console.log("NFT Data:", nftData);
    toast.success("NFT information saved successfully!");

    // 🔹 Ici, tu peux envoyer `nftData` à ton backend ou à la blockchain
    // CODE

    requestMintNFT();

    setIsNFTAlertOpen(false);
    setIsNFTAlertOpen(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-whitebg-gradient-to-r from-emerald-500 from-10% via-sky-500 via-30% to-indigo-500 to-90%">
      <Card className="w-[550px]">
        <CardHeader className="text-center">
          <CardTitle>Mint Your NFT</CardTitle>
          <CardDescription>Create freely YOUR new NFTs.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              {/* Champ Name */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={nftName}
                  onChange={(e) => setNftName(e.target.value)}
                  placeholder="Name of your NFT"
                />
              </div>
              {/* Champ Description */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={nftDescription}
                  onChange={(e) => setNftDescription(e.target.value)}
                  placeholder="Description of your NFT"
                />
              </div>
              {/* Champ URL */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="url">Media URL</Label>
                <Input
                  id="url"
                  value={nftUrl}
                  onChange={(e) => setNftUrl(e.target.value)}
                  placeholder="URL of your NFT visual"
                />
              </div>

              {customFields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>Field Name</Label>
                    <Input
                      value={field.name}
                      onChange={(e) =>
                        updateField(field.id, "name", e.target.value)
                      }
                      placeholder="Enter field name (e.g. stylistic attribut, color)"
                    />
                    <Label>Field Value</Label>
                    <Input
                      value={field.value}
                      onChange={(e) =>
                        updateField(field.id, "value", e.target.value)
                      }
                      placeholder="Enter field value"
                    />
                  </div>
                  <Button variant="ghost" onClick={() => removeField(field.id)}>
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              ))}

              <Button
                variant="outline"
                className="border-white bg-gradient-to-r from-green-500 via-yellow-400 to-orange-600 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  addField();
                }}
              >
                Add Field
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            className="bg-gradient-to-r from-green-400 to-blue-500"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Mint NFT
          </Button>
        </CardFooter>

        {/* AlertDialog pour confirmer la création d'un NFT*/}
        <AlertDialog open={isNFTAlertOpen} onOpenChange={setIsNFTAlertOpen}>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>NFT Created!</AlertDialogTitle>
              <AlertDialogDescription>
                Congratulation on Minting your new NFT. You can find it directly
                in your wallet and list it on InfinityMint if wanted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setIsNFTAlertOpen(false)}>
                Got It
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </div>
  );
}
