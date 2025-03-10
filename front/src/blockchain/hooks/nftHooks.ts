import { useEffect, useState } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import { abi,contractAddress } from "../config/configNft";

import { contractAddress as contractAddressMarketplace} from "../config/configMarketplace";

// // Ce hook permet de recupérer les nft d'une collection dans la blockchain
// export const useBuyNFT = (accountAddress : `0x${string}`, tokenId:string) => {

//     const { writeContract, isSuccess, isError, error } = useWriteContract();
    

//     writeContract({
//         address: contractAddress,
//         abi: abi,
//         functionName: "buyNFT",
//         args: [],
//         account:accountAddress
//     });

//     const base64Modif = (valeur:String) => {
//         const base64String = valeur.split(",")[1];
        
//         // Décoder la chaîne Base64
//         const decodedString = atob(base64String);

//         // Convertir la chaîne JSON en objet JavaScript
//         const jsonObject = JSON.parse(decodedString);


//         return decodedString
//     }

//     useEffect(()=>{

//         let nftListNew: Listing[] = [];
//         if (Array.isArray(dataNFTFromBlockchain)) {
//             dataNFTFromBlockchain.forEach(item => {
//                 nftListNew.push(item)
//             });

//             nftListNew.map((value)=>{
//                 value.tokenUri = base64Modif(value.tokenUri)
//             })

//             setNftList(nftListNew)

//             console.log("hook récupere la valeur : " +  nftList.length)
//         }

        
//     },[dataNFTFromBlockchain])

//     return {nftList, error, isPending, refetch}
// }


// argsTab={[
//     address,
//     "name",
//     "description",
//     "image URL",
//     "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
//   ]

// address to, string memory name, string memory description, string memory imageUrl, string memory attributes, address marketplace

// Ce hook permet de recupérer les nft d'une collection dans la blockchain
export const useMintNFT = (accountAddress : `0x${string}` | undefined, name:string, description:string, imageUrl:string, attributes:string) => {

    const { writeContract, isSuccess, isError, error } = useWriteContract();
    
    const request = () => {

        writeContract({
            address: contractAddress,
            abi: abi,
            functionName: "safeMint",
            args: [accountAddress, name, description, imageUrl, attributes, contractAddressMarketplace ],
            account:accountAddress
        });

    }

    return {request, isSuccess, isError, error}
}
