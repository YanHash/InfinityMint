import {useEffect, useState} from "react";
import {useReadContract} from "wagmi";
import {abi, contractAddress} from "../blockchain/config/configMarketplace"; // Vérifiez que le chemin est correct

interface Collection {
    collectionId: string;
    name: string;
    owner: `0x${string}`;
    description: string;
    totalSupply: number;
    floorPrice: number;
    volumeTraded: number;
}

export const useGetCollection = (accountAddress: `0x${string}`) => {
    const [skipCollection, setSkipCollection] = useState<number>(0);
    const [collectionList, setCollectionList] = useState<Collection[]>([]);

    console.log("🚀 useGetCollection");


    // Récupération des collections depuis la blockchain
    const {data, error, isPending, refetch} = useReadContract({
        abi,
        address: contractAddress,
        functionName: "getTenCollections",
        args: [skipCollection],
        account: accountAddress,
    });

    // Mettre à jour la liste des collections lorsqu'on récupère de nouvelles données
    useEffect(() => {
        if (Array.isArray(data)) {
            setCollectionList(data as Collection[]);
        }
    }, [data]);


    // Rafraîchir les données lorsque `skipCollection` change
    useEffect(() => {
        refetch();
    }, [skipCollection, refetch]);

    return {
        collectionList,
        error,
        isPending,
        setSkipCollection,
        refetch, // Permet de relancer la récupération manuellement
    };
};
