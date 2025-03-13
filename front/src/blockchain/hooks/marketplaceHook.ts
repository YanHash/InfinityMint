"use client"
import { useReadContract, useWriteContract } from "wagmi";
import { abi, contractAddress } from '@/blockchain/config/configMarketplace';
import { contractAddress as nftContract} from '@/blockchain/config/configNft';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ReadContractErrorType } from "@wagmi/core";
import { parseEther } from "viem";

interface Collection {
    collectionId: string
    owner : `0x${string}`
    name : string
    description: string
    totalSupply: number
}


export const useCreateCollection = (accountAddress : `0x${string}` | undefined, name:string, description : string) => {

    const { writeContract, isSuccess, isError, error } = useWriteContract();
    
    const request = () => {

        writeContract({
            address: contractAddress,
            abi: abi,
            functionName: "createCollection",
            args: [ name, description ],
            account:accountAddress,
        });

    }

    return {request, isSuccess, isError, error}

}

// Ce hook permet de recupérer les collections dans la blockchain
// - ---------------------- UTILISATION -------------------------
// const {collectionList, error, isPending, setSkipCollection} = useGetCollection("userAddress") 
// A l'instanciation, collectionList va contenir les 10 premières collections
// Ensuite, il suffit de faire setCollectionList(number) avec number le nombre de collections à ignorer dans la blockchain, collectionList sera donc mis à jour automatiquement
export const useGetCollection = (accountAddress : `0x${string}`) => {

    const [ skipCollection, setSkipCollection ] = useState<number>(0)
    const [ collectionList, setCollectionList ] = useState<Collection[]>([])

    const { data: dataCollectionFromBlockchain, error, isPending: isPending, refetch } = useReadContract({
        abi,
        address: contractAddress,
        functionName: "getTenCollections",
        args: [skipCollection],
        account: accountAddress,
    });

    useEffect(()=>{

        let collectionListNew: Collection[] = [];
        if (Array.isArray(dataCollectionFromBlockchain)) {
            dataCollectionFromBlockchain.forEach(item => {
                collectionListNew.push(item)
            });
            setCollectionList(collectionListNew)
        }

        
    },[dataCollectionFromBlockchain])

    useEffect(()=>{
        console.log("Passage dans skipCollection");
        refetch()
    },[skipCollection])



    return {collectionList, error, isPending, setSkipCollection, refetch}
}


interface Listing {
    collectionId: string
    seller: `0x${string}`
    price: number
    tokenUri: String
}

// Ce hook permet de recupérer les nft d'une collection dans la blockchain
export const useGetNFTFromCollection = (accountAddress : `0x${string}` | undefined, collectionId:string) => {

    var [ nftList, setNftList ] = useState<Listing[]>([])

    const { data: dataNFTFromBlockchain, error, isPending: isPending, refetch } = useReadContract({
        abi,
        address: contractAddress,
        functionName: "getNFTFromCollectionId",
        args: [collectionId],
        account: accountAddress,
    });

    const base64Modif = (valeur:String) => {
        const base64String = valeur.split(",")[1];
        
        // Décoder la chaîne Base64
        const decodedString = atob(base64String);

        // Convertir la chaîne JSON en objet JavaScript
        const jsonObject = JSON.parse(decodedString);


        return decodedString
    }

    useEffect(()=>{

        let nftListNew: Listing[] = [];
        console.log("valeur recup de la collectio NFT : " + dataNFTFromBlockchain)
        if (Array.isArray(dataNFTFromBlockchain)) {
            dataNFTFromBlockchain.forEach(item => {
                nftListNew.push(item)
            });

            nftListNew.map((value)=>{
                value.tokenUri = base64Modif(value.tokenUri)
            })

            setNftList(nftListNew)

            console.log("hook récupere la valeur : " +  nftList.length)
        }

        
    },[dataNFTFromBlockchain])

    return {nftList, error, isPending, refetch}
}


// Ce hook permet de lister un NFT
export const useListNFT = (accountAddress : `0x${string}` | undefined, tokenId:string, price:string, collectionId:string) => {

    const { writeContract, isSuccess, isError, error } = useWriteContract();
    
    const request = () => {

        writeContract({
            address: contractAddress,
            abi: abi,
            functionName: "listNFT",
            args: [ nftContract, tokenId, price, collectionId ],
            account:accountAddress
        });

    }

    return {request, isSuccess, isError, error}
}

// ********************* TODO *********************

// Cette fonction retourne les NFT hors serie 
export const useGetNFTHorsSerie = (accountAddress : `0x${string}` | undefined) => {
    var [ nftList, setNftList ] = useState<Listing[]>([])
    const [ skipCollection, setSkipCollection ] = useState<number>(0)


    const { data: dataNFTFromBlockchain, error, isPending: isPending, refetch } = useReadContract({
        abi,
        address: contractAddress,
        functionName: "getNFTHorsSerie",
        args: [skipCollection],
        account: accountAddress,
    });

    const base64Modif = (valeur:String) => {
        const base64String = valeur.split(",")[1];
        
        // Décoder la chaîne Base64
        const decodedString = atob(base64String);

        // Convertir la chaîne JSON en objet JavaScript
        //const jsonObject = JSON.parse(decodedString);


        return decodedString
    }

    useEffect(()=>{

        let nftListNew: Listing[] = [];
        console.log("valeur recup de la collectio NFT : " + dataNFTFromBlockchain)
        if (Array.isArray(dataNFTFromBlockchain)) {
            dataNFTFromBlockchain.forEach(item => {
                nftListNew.push(item)
            });

            nftListNew.map((value)=>{
                value.tokenUri = base64Modif(value.tokenUri)
            })

            setNftList(nftListNew)

            console.log("hook (useGetNFTHorsSerie) récupere la valeur : " +  nftList.length)
        }

        
    },[dataNFTFromBlockchain])

    useEffect(()=>{
        refetch();
    },[skipCollection])

    return {nftList, error, isPending, setSkipCollection, refetch}
} 

// Cette fonction va permettre de faire un achat de NFT
// ERROR !!!!!!!!!!
export const useBuyNFT  = (accountAddress : `0x${string}` | undefined, tokenId: string, price : string) => {
    const { writeContract, isSuccess, isError, error } = useWriteContract();
    
    const request = () => {
        console.log("request useBuyNFT " + price + " tokenId : " + tokenId)
        writeContract({
            address: contractAddress,
            abi: abi,
            functionName: "buyNFT",
            args: [ nftContract, tokenId ],
            account:accountAddress,
            value: parseEther(price),
        });

    }

    return {request, isSuccess, isError, error}
}

interface User {
    owner : `0x${string}` | undefined 
    created: boolean
    collections: Collection[] 
}

export const useGetUserInformations = (accountAddress : `0x${string}` | undefined) => {

    var [ user, setUser ] = useState<User>({
        owner:"0x",
        created:false,
        collections:[]
    })

    const { data: dataUserFromBlockchain, error, isPending: isPending, refetch } = useReadContract({
        abi,
        address: contractAddress,
        functionName: "getUserInformations",
        account: accountAddress,
    });

    useEffect(()=>{

        let newUser: User;
        console.log("(Hook User) user recup pour le moment " + dataUserFromBlockchain)
        newUser = dataUserFromBlockchain as User;

        setUser(newUser);

        
    },[dataUserFromBlockchain])

    console.log("(Hook User) user recup pour le moment ")
    return {user, error, isPending, refetch}

}

