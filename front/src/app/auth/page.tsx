// app/page.tsx
'use client';
import {MenubarAuth} from "@/components/shared/authHeader";
import {NoAuth} from "@/components/shared/noAuthContext";
import {useAccount} from 'wagmi'
import {useEffect} from "react";

const AuthPage = () => {
    const {address, isConnected} = useAccount();

    useEffect(() => {
        localStorage.setItem("userIsConnected", isConnected.toString())
    }, [isConnected])

    return (
        <div>
            {isConnected ? (
                <>
                    <MenubarAuth address={address ?? ''} isConnected={isConnected}/>
                </>
            ) : (
                <>
                    {NoAuth()}
                </>
            )}
        </div>
    );
}
export default AuthPage;