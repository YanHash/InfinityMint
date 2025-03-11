import { abi, contractAddress } from '@/blockchain/config/configMarketplace';
import { useEffect, useState } from 'react';
import { useWriteContract } from "wagmi";
import { useBuyNFT, useListNFT } from '../hooks/marketplaceHook';

interface Props {
    accountAddress: `0x${string}` | undefined
    tokenId: string
    price: string
    collectionId: string
}

export const WriteMarketplaceBlockchainListNFT = ({accountAddress, tokenId, price, collectionId }:Props) => {

    const {request, isSuccess, isError, error} = useListNFT(accountAddress,tokenId,price,collectionId)
    
    return (
        <div>
            <button onClick={request} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">Ecrire dans la blockain </button>
            {isSuccess && <p>Transaction réussie !</p>}
            {isError && <p>Erreur : {error?.message}</p>}
        </div>
        
    );
}


interface PropsBuyNFT {
    accountAddress: `0x${string}` | undefined
    tokenId: string
    price : string
}
export const WriteMarketplaceBlockchainBuyNFT = ({accountAddress, tokenId, price }:PropsBuyNFT) => {

    const {request, isSuccess, isError, error} = useBuyNFT(accountAddress,tokenId, price)
    
    return (
        <div>
            <button onClick={request} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">Ecrire dans la blockain </button>
            {isSuccess && <p>Transaction réussie !</p>}
            {isError && <p>Erreur : {error?.message}</p>}
        </div>
        
    );
}