import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { abi, contractAddress } from "../blockchain/config/configMarketplace"; // Vérifiez que le chemin est correct

interface Listing {
    collectionId: string;
    seller: `0x${string}`;
    price: number;
    tokenUri: string;
}

// Hook pour récupérer les NFTs d'une collection depuis la blockchain
export const useGetNFTFromCollection = (accountAddress: `0x${string}`, collectionId: string) => {
    const [nftList, setNftList] = useState<Listing[]>([]);
    const { data: dataNFTFromBlockchain, error, isPending, refetch } = useReadContract({
        abi,
        address: contractAddress,
        functionName: "getNFTFromCollectionId",
        args: [collectionId],
        account: accountAddress,
    });

    // Fonction de conversion Base64 en texte lisible
    const decodeBase64 = (valeur: string): string => {
        try {
            const base64String = valeur.split(",")[1]; // Extraction
            return base64String ? atob(base64String) : valeur;
        } catch (e) {
            console.error("Erreur de décodage Base64 :", e);
            return valeur;
        }
    };

    useEffect(() => {
        if (dataNFTFromBlockchain && Array.isArray(dataNFTFromBlockchain)) {
            console.log("📌 Valeur récupérée de la blockchain :", dataNFTFromBlockchain);

            // Transformer les données reçues en ajoutant le décodage du tokenUri
            const nftListNew = dataNFTFromBlockchain.map((item) => ({
                ...item,
                tokenUri: decodeBase64(item.tokenUri), // Décodage sécurisé
            }));

            setNftList(nftListNew);
            console.log("✅ NFTs mis à jour :", nftListNew);
        }
    }, [dataNFTFromBlockchain]);

    return { nftList, error, isPending, refetch };
};
