"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

import {
  WriteMarketplaceBlockchainBuyNFT,
  WriteMarketplaceBlockchainCreateCollection,
  WriteMarketplaceBlockchainListNFT,
} from "@/blockchain/components/writeMarketplaceBlockchain";
import {
  GetCollectionFromBlockchain,
  GetNFTHorsSerieFromBlockchain,
  GetNFTToCollectionFromBlockchain,
  GetUserInformationsFromBlockchain,
} from "@/blockchain/components/getFromBlockain";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useCreateCollection,
  useGetCollection,
  useListNFT,
} from "@/blockchain/hooks/marketplaceHook";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function List() {
  const { address } = useAccount();

  // États pour la création de collection
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");

  const { request, isSuccess } = useCreateCollection(
    address,
    collectionName,
    collectionDescription
  );

  const { collectionList, refetch: refetchCollection } = useGetCollection(
    address as `0x${string}`
  );

  // Fonction pour créer une collection
  const handleCreateCollection = () => {
    request();
    console.log(`Collection Created: ${collectionName}`);
  };

  useEffect(() => {
    if (isSuccess) {
      refetchCollection();
    }
  }, [isSuccess, refetchCollection]);

  // États pour lister un NFT
  const [tokenIdNft, setTokenIdNft] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);

  const {
    request: listNFTRequest,
    isSuccess: isListNFTSuccess,
    isError: isListNFTError,
    error: listNFTError,
  } = useListNFT(address, tokenIdNft ?? "", price ?? "", selectedCollection);

  const publishListing = () => {
    console.log("Publishing Listing");
    listNFTRequest();
    console.log("NFT Published");
  };

  return (
    <div className="flex items-center justify-center h-screen  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-whitebg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <Card className="w-3/4">
        <CardHeader className="flex flex-col items-center text-2xl">
          <CardTitle className="text-4xl">List your NFT for selling</CardTitle>
          <CardDescription>
            Sell your Art and get the BEST price from InfinityMint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              {/*NFT id field*/}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="nftID">Token ID</Label>
                <Input
                  id="nftID"
                  placeholder="The ID of your Token"
                  value={tokenIdNft ?? ""}
                  onChange={(e) => setTokenIdNft(e.target.value)}
                />
              </div>

              {/*NFT name field*/}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="The Name of your Token" />
              </div>

              {/*NFT price field*/}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  placeholder="The wanted price for your Token"
                  value={price ?? ""}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-4">
                {/* Sélection de Collection */}
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="collection">Collection</Label>
                  <Select onValueChange={setSelectedCollection}>
                    <SelectTrigger id="collection">
                      <SelectValue placeholder="Select a collection" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="0">No Collection</SelectItem>
                      {collectionList.map((value) => (
                        <SelectItem
                          key={value.collectionId}
                          value={value.collectionId}
                        >
                          {value.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    className="border-white bg-gradient-to-br from-blue-400 to-purple-500 text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDialogOpen(true);
                    }}
                  >
                    New Collection
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button
            className="bg-gradient-to-bl from-blue-400 to-green-600"
            onClick={() => {
              publishListing();
            }}
          >
            Publish
          </Button>
        </CardFooter>

        {/* Dialog pour la création de collection */}
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
                <Label>Name</Label>
                <Input
                  placeholder="Collection Name"
                  className="col-span-3"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Description</Label>
                <Input
                  placeholder="Collection Description"
                  className="col-span-3"
                  value={collectionDescription}
                  onChange={(e) => setCollectionDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 py-4">
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
              <Button onClick={handleCreateCollection} type="submit">
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
}
