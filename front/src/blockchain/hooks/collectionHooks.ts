import { useReadContract } from "wagmi";
import { abi, contractAddress } from '@/blockchain/config/configMarketplace';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ReadContractErrorType } from "@wagmi/core";

interface Collection {
    collectionId: string
    owner : `0x${string}`
    description: string
    totalSupply: number
}

interface RetourCollectionHooks {
    collectionList: Collection[],
    error: ReadContractErrorType | null
    isPending: boolean
    setSkipCollection : Dispatch<SetStateAction<number>>
}

// Ce hook permet de recupérer les collections dans la blockchain
// - ---------------------- UTILISATION -------------------------
// const {collectionList, error, isPending, setSkipCollection} = useGetCollection("userAddress") 
// A l'instanciation, collectionList va contenir les 10 premières collections
// Ensuite, il suffit de faire setCollectionList(number) avec number le nombre de collections à ignorer dans la blockchain, collectionList sera donc mis à jour automatiquement
export const useGetCollection = (accountAddress : `0x${string}`) => {

    const [ skipCollection, setSkipCollection ] = useState<number>(0)
    var [ collectionList, setCollectionList ] = useState<Collection[]>([])

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
            console.log("hook récupere la valeur : " +  collectionListNew.length)
        }

        
    },[dataCollectionFromBlockchain])

    useEffect(()=>{
        refetch()
    },[skipCollection])

    return {collectionList, error, isPending, setSkipCollection}
}


