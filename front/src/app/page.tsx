"use client"

import React, {useEffect, useState} from "react";
import {LoadingSpinner} from "@/components/ui/spinner";
import Products from "@/app/products/products";

const Home = () => {
    const [nfts, setNfts] = useState(null);

    useEffect(() => {
        fetch("/data.json").then(
            res => res.json()).then(
            (data) => {
                setNfts(data.nfts)
            })
    }, []);


    return (
        nfts != null ?
            <Products nfts={nfts}/> :
            <LoadingSpinner/>

    )
}
export default Home;
