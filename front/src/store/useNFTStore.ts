import { create } from "zustand";

interface NFT {
    id: string;
    tokenId: string;
    name: string;
    description: string;
    image: string;
    seller: string;
    price: number;
    contractId: string;
    contractAddress: string;
}

interface NFTStore {
    selectedNFT: NFT | null;
    setSelectedNFT: (nft: NFT) => void;
    clearSelectedNFT: () => void;
}

export const useNFTStore = create<NFTStore>((set) => ({
    selectedNFT: null,
    setSelectedNFT: (nft) => set({ selectedNFT: nft }),
    clearSelectedNFT: () => set({ selectedNFT: null }),
}));
