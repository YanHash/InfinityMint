'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { abi, contractAddress } from '@/app/Marketplace/constants/index';
import { useReadContract, useAccount,useSendTransaction, useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from "wagmi";
import { useState, useEffect } from 'react';
import { config } from './config/config';
import { parseEther } from 'viem/utils';

export default function Home() {


  const { address, isConnected } = useAccount();

  const [nftContract, setNftContract] = useState<string | null>(null);
  const [tokenIdNft, setTokenIdNft] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const [nftContractBuy, setNftContractBuy] = useState<string | null>(null);
  const [tokenIdNftBuy, setTokenIdNftBuy] = useState<string | null>(null);


  // const { data: test, refetch: ok} = useReadContract({
  //   // Ici on va pouvoir lire une valeur dans le contrat
  //   // Ici on va récupérer une collection
  //   address: contractAddress,
  //   abi: abi,
  //   functionName: 'getTenCollections',
  //   args: [],
  //   account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  // })

  // const { data: numberGet, isPending: getIsPending, refetch } = useReadContract({
  //   // Ici on va pouvoir lire une valeur dans le contrat
  //   // Ici on va récupérer une collection
  //   address: contractAddress,
  //   abi: abi,
  //   functionName: 'getCollection',
  //   args: ["33416880536726947815104697765159581695984991734682679673489189624776337849275"],
  //   account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  // })

  


  // useWatchContractEvent({
  //   // Cette fonction va permettre une écoute d'un événement spécifique du contrat
  //   // Ici on va écouter l'événement des collections créées afin de récupérer l'identifiant de la collection
  //   // On pourra ensuite l'enregister
  //   address: contractAddress,
  //   abi,
  //   eventName: 'CollectionCreated',
  //   onLogs(logs) {
  //     logs.forEach((log) => {
  //       // Récupérez les paramètres de l'événement
  //       const collectionId = log.args.collectionId;
  //       const name = log.args.name;
  //       const description = log.args.description;
  //       // console.log("Nouvel événement CollectionCreated :");
  //       // console.log("ID de la collection :", collectionId.toString());
  //       // console.log("Nom :", name);
  //       // console.log("Description :", description);
  //     });
  //   }
  // })

  

  const { data: hash, writeContract } = useWriteContract()

  const { data: hash2, sendTransaction } = useSendTransaction()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash
  })

  // useEffect(() => {
  //   if (isSuccess) {
  //     refetch()
  //   }
  // }, [isSuccess, refetch])


  const listNft = () => {
    console.log("passage listNft")
    console.log(`contract : ${nftContract} token: ${tokenIdNft}  price : ${price}`)
    console.log("test")
    if(price == null) return 
    writeContract({
      address: contractAddress,
      abi: abi,
      functionName: 'listNFT',
      args: [nftContract,tokenIdNft,BigInt(price)],
      account: address
    })
  }

  const buyNft = () => {
    console.log("passage BuyNFT")
    writeContract({
      address: contractAddress,
      abi: abi,
      functionName: 'buyNFT',
      args: [nftContractBuy,tokenIdNftBuy],
      account: address,
      value: parseEther("80")
    })
  }

  const approveNFT = () => {
    writeContract({
      address: contractAddress,
      abi: abi,
      functionName: 'approve',
      args: [contractAddress,tokenIdNft],
      account: address
    })
  }


  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-end mb-8">
          <ConnectButton />
        </div>
        {isConnected ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200/20">
            <h1 className="text-2xl font-bold mb-6 text-center">Marketplace</h1>
            
            <div className="space-y-6">              
              <div className="space-y-4">
                <input 
                  type="text"
                  onChange={(e) => setNftContract(e.target.value)} 
                  placeholder="NFT Contract" 
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />

                <input 
                  type="text"
                  onChange={(e) => setTokenIdNft(e.target.value)} 
                  placeholder="Token Id" 
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />

                <input 
                  type="number"
                  onChange={(e) => setPrice(Number(e.target.value))} 
                  placeholder="Price" 
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                
                <button 
                  onClick={listNft} 
                  disabled={isConfirming}
                  className="w-full px-4 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  lister sur la marketplace
                </button>


                <button 
                  onClick={listNft} 
                  disabled={isConfirming}
                  className="w-full px-4 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  Lister collection
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

      <div className="max-w-2xl mx-auto">
        <div className="flex justify-end mb-8">
          <ConnectButton />
        </div>
        {isConnected ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200/20">
            <h1 className="text-2xl font-bold mb-6 text-center">Buy NFT</h1>
            
            <div className="space-y-6">              
              <div className="space-y-4">
                <input 
                  type="text"
                  onChange={(e) => setNftContractBuy(e.target.value)} 
                  placeholder="NFT Contract" 
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />

                <input 
                  type="text"
                  onChange={(e) => setTokenIdNftBuy(e.target.value)} 
                  placeholder="Token Id" 
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />

                <button 
                  onClick={buyNft} 
                  disabled={isConfirming}
                  className="w-full px-4 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  Acheter le NFT
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