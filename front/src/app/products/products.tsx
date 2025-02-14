import React from "react";
import Image from "next/image";

const Products = (props: any) => {

    //todo récupérer les nfts des artistes ayant payés, et non les 3 premières trouvées
    // props.nfts[indexDeLaCollection].collectionNfts[indexDuNft]
    // props.nfts[0].collectionNfts[0] pour la première nft de la première collection


    //todo redirection page id produit

    //fixme warn sur l'utilisation des layout (deprecated)
    return (
        <div className={"horizontally-centered flex "}>
            <div className="w-1/2 h-screen relative">
                <Image
                    src={props.nfts[0].collectionNfts[0].imageUrl}
                    alt={props.nfts[0].collectionNfts[0].name}
                    layout="fill"
                    onClick={() => { window.location.href = "/product/" + props.nfts[0].collectionNfts[0].id}}
                />
            </div>
            <div className="w-1/2 h-screen relative">
                <div className="h-1/2 relative">
                    <Image
                        src={props.nfts[0].collectionNfts[1].imageUrl}
                        alt={props.nfts[0].collectionNfts[1].name}
                        layout="fill"
                        onClick={() => { window.location.href = "/product/" + props.nfts[0].collectionNfts[1].id}}
                    />
                </div>
                <div className="h-1/2 relative">
                    <Image
                        src={props.nfts[1].collectionNfts[0].imageUrl}
                        alt={props.nfts[1].collectionNfts[0].name}
                        layout="fill"
                        onClick={() => { window.location.href = "/product/" + props.nfts[1].collectionNfts[0].id}}
                    />
                </div>
            </div>
        </div>
    )
}
export default Products;