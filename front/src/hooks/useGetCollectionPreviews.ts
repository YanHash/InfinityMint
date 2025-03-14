import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { abi, contractAddress } from "../blockchain/config/configMarketplace"; // Vérifiez que le chemin est correct

interface CollectionPreview {
    collectionId: string;
    imageUrl: string;
}

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

const parseTokenUri = (tokenUri: string) => {
    try {
        const formattedJson = tokenUri.replace(/""/g, '", "');
        const parsed = JSON.parse(formattedJson);
        return parsed.image || "/noImage.jpeg"; // Image par défaut
    } catch (error) {
        console.error("❌ Erreur de parsing du tokenUri :", error);
        return "/noImage.jpeg"; // Image par défaut
    }
};

export const useGetCollectionPreviews = (accountAddress: `0x${string}`, collectionIds: string[]) => {
    const [collectionPreviews, setCollectionPreviews] = useState<CollectionPreview[]>([]);

    useEffect(() => {
        const fetchNFTs = async () => {
            const previews: CollectionPreview[] = [];

            for (const id of collectionIds) {
                const { data: dataNFTFromBlockchain, error } = useReadContract({
                    abi,
                    address: contractAddress,
                    functionName: "getNFTFromCollectionId",
                    args: [id],
                    account: accountAddress,
                });

                if (error) {
                    console.error(`Erreur lors de la récupération des NFTs pour la collection ${id} :`, error);
                    continue;
                }

                if (dataNFTFromBlockchain && Array.isArray(dataNFTFromBlockchain) && dataNFTFromBlockchain.length > 0) {
                    const firstNFT = dataNFTFromBlockchain[0];
                    const decodedTokenUri = decodeBase64(firstNFT.tokenUri);
                    const imageUrl = parseTokenUri(decodedTokenUri);

                    previews.push({
                        collectionId: id,
                        imageUrl,
                    });
                }
            }

            setCollectionPreviews(previews);
        };

        fetchNFTs();
    }, [collectionIds, accountAddress]);


    return { collectionPreviews };
};
