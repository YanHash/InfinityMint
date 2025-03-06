// Librairie permettant de contacter le smart contract Marketplace
// On va pouvoir récupérer des NFTS 

import { abi, contractAddress } from '@/blockchain/config/configMarketplace';
import { useEffect, useState } from 'react';
import { useReadContract, useAccount, useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from "wagmi";



// export const listNft = (address: `0x${string}`|undefined, nftContract: string, tokenIdNft: string|null, price: number|null  ) : Promise<any> => {

//     return new Promise((resolve, reject)=> {
//         // Cette fonction va nous permettre de lister un NFT sur la marketplace 
        
//         console.log(`Try to list NFT : contract : ${nftContract} token: ${tokenIdNft}  price : ${price}`)
//         if(price == null) return 

//         const { data: getData, writeContract } = useWriteContract()

//         // On va écouter l'évenement : NFTListed
//         //resolve(log)

//         useWatchContractEvent({
//            // Cette fonction va permettre une écoute d'un événement spécifique du contrat
//            // Ici on va écouter l'événement des collections créées afin de récupérer l'identifiant de la collection
//            // On pourra ensuite l'enregister
//            address: contractAddress,
//            abi,
//            eventName: 'CollectionCreated',
//            onLogs(logs) {
//              console.log(logs);
//            }
//         })

//         try {
//             writeContract({
//                 address: contractAddress,
//                 abi: abi,
//                 functionName: 'listNFT',
//                 args: [nftContract,tokenIdNft,BigInt(price)],
//                 account: address,
//             })
//         }
//         catch(error) {
//             console.log(error)
//         }
//     });
// }

export function App() {
  const result = useReadContract({
    abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    functionName: 'balanceOf',
    args: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
    account: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  })
}


export const WriteContractBlockain = ({accountAddress, functionName, argsTab}) => {
    const { writeContract, isSuccess, isError, error } = useWriteContract();
  
    const handleWrite = async () => {
      try {
        writeContract({
          address: contractAddress,
          abi: abi,
          functionName: functionName,
          args: argsTab,
          account:accountAddress
        });
      } catch (err) {
        console.error('Erreur lors de l\'écriture du contrat:', err);
      }
    };
  
    console.log("succes : " + isSuccess + "  isError : " + isError + "  error : " + error )

    return (
        <div>
          <button onClick={handleWrite} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">Exécuter la transaction</button>
          {isSuccess && <p>Transaction réussie !</p>}
          {isError && <p>Erreur : {error?.message}</p>}
        </div>
    );

}




export const useListNft2 = () => {

    

    const { data, error, isPending,writeContract } = useWriteContract()
  
    // useEffect(() => {
    //     if (error) {
    //       //console.error("Wagmi error:", error);
    //     }
    //   }, [error]);

    // Écouter l'événement "CollectionCreated"
    useWatchContractEvent({
      address: contractAddress,
      abi,
      eventName: 'NFTListed',
      onLogs(logs) {
        console.log('Événement reçu :', logs)
      },
    })
  
    const listNft = async (
      address: `0x${string}` | undefined,
      nftContract: string,
      tokenIdNft: string | null,
      price: number | null
    ): Promise<any> => {
      return new Promise((resolve, reject) => {
        console.log(`Try to list NFT: contract: ${nftContract}, token: ${tokenIdNft}, price: ${price}`)
        
        if (!price || !tokenIdNft || !address) return reject('Paramètres invalides')
  
        writeContract({
            address: contractAddress,
            abi,
            functionName: 'listNFT',
            args: [nftContract, tokenIdNft, BigInt(price)],
            account: address,
        })
        //console.log(`NFT listé avec succès ! ${error}`)

        //console.log(error);

        if(error!= null){
            return true;
        }
        return false;

      })
    }

    
  
    return { listNft }
  }



  export const useListNft = () => {
    const [result, setResult] = useState(null);
    const [transactionHash, setTransactionHash] = useState<`0x${string}` | undefined>(`0x`);
    

    const { data, error, isPending,writeContract } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: transactionHash, // On surveille le hash de la transaction
    });


    const handleWriteContract = () => {
        // Appel de la fonction writeContract
        writeContract(
            {
                address: contractAddress,
                abi,
                functionName: 'listNFT',
                args: ["nftContract", "tokenIdNft", BigInt(10)],
                account: null,
            },
          {
            onSuccess: (hash) => {
              // On récupère le hash de la transaction
              setTransactionHash(hash);
              console.log('Transaction envoyée, en attente de confirmation...');
            },
            onError: (error) => {
              // Gestion des erreurs
              console.log(`Erreur lors de l'envoi de la transaction : ${error.message}`);
            },
          }
        );
    };



    
  
    return { handleWriteContract }
  }