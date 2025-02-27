'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { abi, contractAddress } from '@/app/NFT/constants/index';
import { useReadContract, useAccount, useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from "wagmi";
import { useState, useEffect } from 'react';
import { config } from './config/config';

export default function Home() {


  const { address, isConnected } = useAccount();
  const [number, setNumber] = useState<number | null>(null);


  const { data: test, refetch: ok} = useReadContract({
    // Ici on va pouvoir lire une valeur dans le contrat
    // Ici on va récupérer une collection
    address: contractAddress,
    abi: abi,
    functionName: 'getTenCollections',
    args: [],
    account: address,
  })

  const { data: numberGet, isPending: getIsPending, refetch } = useReadContract({
    // Ici on va pouvoir lire une valeur dans le contrat
    // Ici on va récupérer une collection
    address: contractAddress,
    abi: abi,
    functionName: 'getCollection',
    args: ["33416880536726947815104697765159581695984991734682679673489189624776337849275"],
    account: address,
  })

  


  useWatchContractEvent({
    // Cette fonction va permettre une écoute d'un événement spécifique du contrat
    // Ici on va écouter l'événement des collections créées afin de récupérer l'identifiant de la collection
    // On pourra ensuite l'enregister
    address: contractAddress,
    abi,
    eventName: 'CollectionCreated',
    onLogs(logs) {
      logs.forEach((log) => {
        // Récupérez les paramètres de l'événement
        const collectionId = log.args.collectionId;
        const name = log.args.name;
        const description = log.args.description;
        // console.log("Nouvel événement CollectionCreated :");
        // console.log("ID de la collection :", collectionId.toString());
        // console.log("Nom :", name);
        // console.log("Description :", description);
      });
    }
  })

  

  const { data: hash, writeContract } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash
  })

  useEffect(() => {
    console.log("passage use effect")
    if (isSuccess) {
      refetch()
    }
  }, [isSuccess, refetch])

  const setTheNumber = async() => {
    console.log("passage")
    writeContract({
      address: contractAddress,
      abi: abi,
      functionName: 'safeMint',
      args: [address,"name", "description", "image URL","0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"],
      account: address
    })
  }


  const getTheNumber = async() => {
    await refetch()
    console.log(`affichage ${numberGet}`)
  }


  const getTenValue = async() => {
    await ok();
    console.log(`Liste de collections :  ${test}`)

  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-end mb-8">
          <ConnectButton />
        </div>
        
        {isConnected ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200/20">
            <h1 className="text-2xl font-bold mb-6 text-center">Gestion du contrat NFT </h1>
            
            <div className="space-y-6">
              
              <div className="space-y-4">
                <button 
                  onClick={setTheNumber} 
                  className="w-full px-4 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  Mint NFT !
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-20">
            <h2 className="text-xl font-semibold mb-4">Welcome to Simple Storage DApp</h2>
            <p className="text-gray-400">Please connect your wallet to interact with the blockchain.</p>
          </div>
        )}
      </div>
    </main>
  )
}