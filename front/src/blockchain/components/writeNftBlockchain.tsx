import { useMintNFT } from '../hooks/nftHooks';

interface PropsT {
    address: `0x${string}`
    name: string
    description: string
    imageUrl: string
    attributes: string
}
export const WriteNFTBlockchain = ({ address, name, description, imageUrl, attributes }: PropsT) => {
    const { request, isSuccess, isError, error } = useMintNFT(address, name, description, imageUrl, attributes)

    return (
        <div>
            <button onClick={request} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">Ecrire dans la blockain </button>
            {isSuccess && <p>Transaction réussie !</p>}
            {isError && <p>Erreur : {error?.message}</p>}
        </div>
    );
}