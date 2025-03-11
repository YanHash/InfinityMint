"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useState } from "react";

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

export default function Home() {
  const { address, isConnected } = useAccount();

  const [tokenIdNft, setTokenIdNft] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [collectionId, setCollectionId] = useState<string>("0");
  const [collectionName, setCollectionName] = useState<string | null>(null);
  const [collectionDescription, setCollectionDescription] = useState<
    string | null
  >(null);

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-3/4">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
