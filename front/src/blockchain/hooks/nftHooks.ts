import { useEffect, useState } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import { abi, contractAddress } from "../config/configNft";

import { contractAddress as contractAddressMarketplace } from "../config/configMarketplace";

// Ce hook permet de recupérer les nft d'une collection dans la blockchain
export const useMintNFT = (accountAddress: `0x${string}` | undefined, name: string, description: string, imageUrl: string, attributes: string) => {

    console.log("🚀 NFT creation: ", {
        name,
        description,
        imageUrl,
        attributes
    });


    const { writeContract, isSuccess, isError, error } = useWriteContract();

    const request = () => {

        writeContract({
            address: contractAddress,
            abi: abi,
            functionName: "safeMint",
            args: [accountAddress, name, description, imageUrl, attributes, contractAddressMarketplace],
            account: accountAddress
        });

    }

    return { request, isSuccess, isError, error }
}
