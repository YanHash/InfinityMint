import { useReadContract } from "wagmi";
import { abi, contractAddress } from '@/blockchain/config/configMarketplace';
import { useEffect, useState } from "react";

interface Props {
    accountAddress: `0x${string}`
    functionName: string
    argsTab: []
}

export const GetCollectionFromBlockchain = ({ accountAddress, functionName, argsTab }:Props) => {
    
    const { data: balance, error, isPending: getIsPending, refetch } = useReadContract({
        abi,
        address: contractAddress,
        functionName: functionName,
        args: argsTab,
        account: accountAddress,
    });


    interface Collection {
        collectionId: string
        owner : `0x${string}`
        description: string
        totalSupply: number
    }

    const retour: Collection[] = balance;


    return (
        <div>
            <button
                onClick={() => {
                    refetch();
                    console.log("passage");
                }}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
                {functionName}
            </button>
            {getIsPending && <p>Transaction en cours</p>}
            {!getIsPending && 
            
            <div>
            {retour.map((collection, index) => (
                <div key={index} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
                    <p><strong>Collection ID:</strong> {collection.collectionId}</p>
                    <p><strong>Owner:</strong> {collection.owner}</p>
                    <p><strong>Description:</strong> {collection.description}</p>
                    <p><strong>Total Supply:</strong> {collection.totalSupply}</p>
                </div>
            ))}
        </div>
            }
        </div>
    );
};


export const GetNFTToCollectionFromBlockchain = ({ accountAddress, functionName, argsTab }:Props) => {
    
    const { data: balance, error, isPending: getIsPending, refetch } = useReadContract({
        abi,
        address: contractAddress,
        functionName: functionName,
        args: argsTab,
        account: accountAddress,
    });

    interface Listing {
        collectionId: string
        seller: `0x${string}`
        price: number
        tokenUri: String
    }

    const retour: Listing[] = balance;

    const base64Modif = (valeur:String) => {
        const base64String = valeur.split(",")[1];
        
        // Décoder la chaîne Base64
        const decodedString = atob(base64String);

        // Convertir la chaîne JSON en objet JavaScript
        const jsonObject = JSON.parse(decodedString);


        return decodedString
    }

    return (
        <div>
            <button
                onClick={() => {
                    refetch();
                    console.log("passage");
                }}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
                {functionName}
            </button>
            {getIsPending && <p>Transaction en cours</p>}
            {!getIsPending && 
                <div>
                {retour.map((listing, index) => (
                    <div key={index} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
                        <p><strong>Collection ID:</strong> {listing.collectionId}</p>
                        <p><strong>Seller:</strong> {listing.seller}</p>
                        <p><strong>Price:</strong> {listing.price}</p>
                        <p><strong>Token URI:</strong> {base64Modif(listing.tokenUri)}</p>
                    </div>
                ))}
            </div>
            }
        </div>
    );
};