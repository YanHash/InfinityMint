"use client"

import React, {useEffect, useState} from "react";
import {LoadingSpinner} from "@/components/ui/spinner";
import Image from "next/image";

const Home = () => {
    //todo definir interface Nfts
    const [nfts, setNfts] = useState<Nfts>(null);

    useEffect(() => {
        fetch("/data.json").then(
            res => res.json()).then(
            (data) => {
                setNfts(data.nfts)
            })
    }, []);


    return (
        nfts != null ?
            //todo récupérer les nfts des artistes ayant payés, et non les 3 premières trouvées
            // props.nfts[indexDeLaCollection].collectionNfts[indexDuNft]
            // props.nfts[0].collectionNfts[0] pour la première nft de la première collection

            //fixme warn sur l'utilisation des layout (deprecated)
            <div className={"horizontally-centered flex "}>
                <div className="w-1/2 h-screen relative">
                    <Image
                        src={nfts[0].collectionNfts[0].imageUrl}
                        alt={nfts[0].collectionNfts[0].name}
                        layout="fill"
                        onClick={() => {
                            window.location.href = "/product/" + nfts[0].collectionNfts[0].id
                        }}
                    />
                </div>
                <div className="w-1/2 h-screen relative">
                    <div className="h-1/2 relative">
                        <Image
                            src={nfts[0].collectionNfts[1].imageUrl}
                            alt={nfts[0].collectionNfts[1].name}
                            layout="fill"
                            onClick={() => {
                                window.location.href = "/product/" + nfts[0].collectionNfts[1].id
                            }}
                        />
                    </div>
                    <div className="h-1/2 relative">
                        <Image
                            src={nfts[1].collectionNfts[0].imageUrl}
                            alt={nfts[1].collectionNfts[0].name}
                            layout="fill"
                            onClick={() => {
                                window.location.href = "/product/" + nfts[1].collectionNfts[0].id
                            }}
                        />
                    </div>
                </div>
            </div> :
            <LoadingSpinner/>
    )
}
export default Home;
