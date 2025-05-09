import {useEffect, useState} from "react";
import {
    useGetCollection,
    useGetNFTFromCollection,
    useGetNFTHorsSerie,
    useGetUserInformations
} from "../hooks/marketplaceHook";

interface PropsGetCollection {
    accountAddress: `0x${string}`
}


export const GetCollectionFromBlockchain = ({accountAddress}: PropsGetCollection) => {

    const {collectionList, isPending, setSkipCollection} = useGetCollection(accountAddress)

    useEffect(() => {
        console.log("changement de la collectionList : " + collectionList.length)
    }, [collectionList])


    return (
        <div>
            <button
                onClick={() => {
                    setSkipCollection(0);
                    console.log("passage");
                    console.log("voila : " + collectionList.length)
                }}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
                Get Collection from blockchain
            </button>
            {isPending && <p>Transaction en cours</p>}
            {collectionList.map((collection, index) => {
                console.log("passage div : ajout de " + collection);
                return (
                    <div key={index} style={{marginBottom: "20px", border: "1px solid #ccc", padding: "10px"}}>
                        <p><strong>Collection ID:</strong> {collection.collectionId}</p>
                        <p><strong>Owner:</strong> {collection.owner}</p>
                        <p><strong>Description:</strong> {collection.description}</p>
                        <p><strong>Total Supply:</strong> {collection.totalSupply}</p>
                    </div>
                )
            })}
        </div>
    );
};

interface PropsNFTFromCollection {
    accountAddress: `0x${string}` | undefined
    collectionId: string
}

export const GetNFTToCollectionFromBlockchain = ({accountAddress, collectionId}: PropsNFTFromCollection) => {

    const {nftList, isPending, refetch} = useGetNFTFromCollection(accountAddress, collectionId)


    return (
        <div>
            <button
                onClick={() => {
                    refetch();
                    console.log("passage");
                }}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
                Get Nft from collection
            </button>
            {isPending && <p>Transaction en cours</p>}
            {!isPending &&
                <div>
                    {nftList.map((listing, index) => (
                        <div key={index} style={{marginBottom: "20px", border: "1px solid #ccc", padding: "10px"}}>
                            <p><strong>Collection ID:</strong> {listing.collectionId}</p>
                            <p><strong>Seller:</strong> {listing.seller}</p>
                            <p><strong>Price:</strong> {listing.price}</p>
                            <p><strong>Token URI:</strong> {listing.tokenUri}</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

interface PropsNFTHorsSerie {
    accountAddress: `0x${string}`
}

export const GetNFTHorsSerieFromBlockchain = ({accountAddress}: PropsNFTHorsSerie) => {

    const {nftList, isPending, refetch} = useGetNFTHorsSerie(accountAddress)


    return (
        <div>
            <button
                onClick={() => {
                    refetch();
                    console.log("passage");
                }}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
                Get Nft Hors serie from collection
            </button>
            {isPending && <p>Transaction en cours</p>}
            {!isPending &&
                <div>
                    {nftList.map((listing, index) => (
                        <div key={index} style={{marginBottom: "20px", border: "1px solid #ccc", padding: "10px"}}>
                            <p><strong>Collection ID:</strong> {listing.collectionId}</p>
                            <p><strong>Seller:</strong> {listing.seller}</p>
                            <p><strong>Price:</strong> {listing.price}</p>
                            <p><strong>Token URI:</strong> {listing.tokenUri}</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

interface PropsUserInformations {
    accountAddress: `0x${string}`
}

export const GetUserInformationsFromBlockchain = ({accountAddress}: PropsUserInformations) => {

    const {user, isPending, refetch} = useGetUserInformations(accountAddress)

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
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
                Get User Informations
            </button>
            {isPending && <p>Transaction en cours</p>}
            {!isPending && user &&
                <div>
                    <p><strong>User Owner :</strong> {user.owner}</p>
                    <p><strong>User Created :</strong> {user.created}</p>
                    <p><strong>User Collection:</strong> {user.collections.toString()}</p>
                </div>
            }
        </div>
    );
};
