import { abi, contractAddress } from '@/blockchain/config/configMarketplace';
import { useEffect, useState } from 'react';
import { useWriteContract } from "wagmi";

export const WriteMarketplaceBlockchain = ({accountAddress, functionName, argsTab}) => {
    
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

        console.log("succes : " + isSuccess + "  isError : " + isError + "  error : " + error )
    };
      
    
    return (
        <div>
            <button onClick={handleWrite} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">Ecrire dans la blockain </button>
            {isSuccess && <p>Transaction réussie !</p>}
            {isError && <p>Erreur : {error?.message}</p>}
        </div>
        
    );
}