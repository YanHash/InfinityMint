import { create } from "zustand";

interface NFT {
    tokenId: string;
    name: string;
    description: string;
    image: string;
    seller: string;
    price: number;
}

interface NFTStore {
    selectedNFT: NFT | null;
    setSelectedNFT: (nft: NFT) => void;
}

export const useNFTStore = create<NFTStore>((set) => ({
    selectedNFT: null,
    setSelectedNFT: (nft) => set({ selectedNFT: nft }),
}));
