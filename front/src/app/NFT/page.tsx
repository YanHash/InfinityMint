"use client";
import * as React from "react";
import { useState } from "react";

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

import { useGetCollection } from "@/blockchain/hooks/collectionHooks";
import { useAccount } from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
export default function CardWithForm() {
  const { address } = useAccount();
  const { collectionList } = useGetCollection(address as `0x${string}`);

  // ✅ État des champs dynamiques
  const [customFields, setCustomFields] = useState([
    { id: Date.now(), name: "", value: "" },
  ]);

  // ✅ État pour ouvrir/fermer le Dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Ajouter un nouveau champ vide
  const addField = () => {
    setCustomFields([...customFields, { id: Date.now(), name: "", value: "" }]);
  };

  // Modifier un champ existant
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

  // ✅ Gérer l'ouverture du Dialog
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const handleCreateCollection = () => {
    const collectionId = "ID à recup depuis la blockchain"; // Remplace par l'ID réel récupéré de la blockchain

    toast(`${collectionName} has been created`, {
      description: collectionDescription,
      action: {
        label: "Copy ID",
        onClick: () => {
          navigator.clipboard.writeText(collectionId.toString()).then(() => {
            toast("Collection ID copied to clipboard!"); // Un autre toast pour informer l'utilisateur
          });
        },
      },
    });

    closeDialog();
  };

  return (
    <Card className="w-[550px]">
      <CardHeader className="text-center">
        <CardTitle>Mint Your NFT</CardTitle>
        <CardDescription>Create freely YOUR new NFTs.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            {/* Name Field */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your NFT" />
            </div>

            {/* Description Field */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Description of your NFT" />
            </div>

            {/* URL Field */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="url">Media URL</Label>
              <Input id="url" placeholder="URL of your NFT visual" />
            </div>

            {/* Champs dynamiques */}
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

            {/* Bouton pour ajouter un champ */}
            <Button
              variant="outline"
              className="border-white bg-slate-600 text-white"
              onClick={(e) => {
                e.preventDefault();
                addField();
              }}
            >
              Add Field
            </Button>

            {/* Sélection de Collection */}
            <div className="flex items-center space-x-4">
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="framework">Collection</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {collectionList.map((value) => (
                      <SelectItem key={value.collectionId} value={value.name}>
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="border-indigo-500 bg-slate-500 text-black"
                  onClick={(e) => {
                    e.preventDefault();
                    openDialog();
                  }} // Ouverture du Dialog ici
                >
                  New Collection
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button onClick={() => (window.location.href = "/")} variant="outline">
          Cancel
        </Button>
        <Button
          variant="default"
          className="bg-gradient-to-r from-green-400 to-blue-500"
        >
          Mint NFT
        </Button>
      </CardFooter>

      {/* ✅ Dialog intégré ici */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl bg-slate-100">
          <DialogHeader>
            <DialogTitle className="text-center">New Collection</DialogTitle>
            <DialogDescription className="text-center">
              Fill your Collection Fields and save once done!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="collectionName" className="text-left">
                Name
              </Label>
              <Input
                id="collectionName"
                placeholder="Collection Name"
                className="col-span-3"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="collectionDescription" className="text-left">
                Description
              </Label>
              <Input
                id="collectionDescription"
                placeholder="Collection Description"
                className="col-span-3"
                value={collectionDescription}
                onChange={(e) => setCollectionDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ownerAddress" className="text-left">
                Owner Address
              </Label>
              <Input
                id="ownerAddress"
                value={address}
                className="col-span-3"
                readOnly
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                closeDialog();
                handleCreateCollection();
              }}
              type="submit"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
