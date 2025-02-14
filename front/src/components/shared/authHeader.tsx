import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { config } from "@/provider/CustomRainbowKitProvider";
import { useSwitchChain, useChainId, useBalance, useDisconnect } from "wagmi";

export function MenubarAuth({ address, isConnected }: { address: string; isConnected: boolean; }) {
    const { switchChain } = useSwitchChain();
    const chainId = useChainId(); // ✅ Récupération de l'ID de la chaîne courante
    const { data: balance, isLoading } = useBalance({
        address: address as `0x${string}`,
        chainId,
    });
    const { disconnect } = useDisconnect();

    return (
        <Menubar>
            {/* Wallet Address */}
            <MenubarMenu>
                <MenubarTrigger className="flex items-center space-x-2 px-2 py-2 text-white rounded-lg">
                    <span className="font-bold text-sm text-black">Your Wallet @ :</span>
                    <span className="text-green-400 text-sm truncate">{address}</span>
                </MenubarTrigger>
            </MenubarMenu>


            {/* Account Balance */}
            <MenubarMenu>
                <MenubarTrigger className="flex items-center space-x-2 px-4 py-2 text-black rounded-lg">
                    <span className="font-bold text-sm">Balance :</span>
                    <span className="text-yellow-400 text-sm">
                        {isLoading ? "Loading..." : `${balance?.formatted} ${balance?.symbol}`}
                    </span>
                </MenubarTrigger>
            </MenubarMenu>


            {/* Chain Selection */}
            <MenubarMenu>
                <MenubarTrigger className="flex items-center space-x-2 px-4 py-2 text-black rounded-lg">
                    <span className="font-bold text-sm">Chain :</span>
                    <span className="text-blue-400 text-sm">
                        {config.chains.find((chain) => chain.id === chainId)?.name || "Unknown"}
                    </span>
                </MenubarTrigger>
                <MenubarContent>
                    {config.chains.map((chain) => (
                        <MenubarItem
                            key={chain.id}
                            onClick={() => switchChain({ chainId: chain.id })}
                            className={`cursor-pointer px-4 py-2 ${chain.id === chainId ? "bg-gray-100 text-green-500" : "hover:bg-gray-200"
                                }`}
                        >
                            {chain.name}
                        </MenubarItem>
                    ))}
                </MenubarContent>
            </MenubarMenu>

            {/* 🔴 Logout Button */}

            <MenubarMenu>
                <MenubarTrigger
                    onClick={() => disconnect()}
                    className={"m-8 space-x-2 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer"}>
                    <span className={"font-bold text-sm"}>Disconnect</span>
                </MenubarTrigger>
            </MenubarMenu>
        </Menubar>
    );
}
