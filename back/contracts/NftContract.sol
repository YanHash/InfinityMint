// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

// , ERC721Burnable, Ownable

contract NFTContract is ERC721, ERC721Burnable, ERC721URIStorage, Ownable {
    //using Counters for Counters.Counter;
    uint256 private _tokenIdCounter = 1;

    constructor() ERC721("InfinityMintNFT", "INF") Ownable(msg.sender) {}

    uint256 MAX_SUPPLY = 600;

    // Cette focntion va permettre de minter un NFT.
    // Elle va permettre de mettre un token sur le wallet de l'utilisateur avec l'adresse en paramètre to
    function safeMint(
        address to,
        string memory name,
        string memory description,
        string memory imageUrl,
        string memory attributes,
        address marketplace
    ) public {
        //public onlyOwner{
        // Le compteur vérifie le numéro de jeton actuel
        // On récupére le numéro de token suivant
        uint256 tokenId = _tokenIdCounter;

        // On vérifie que le token ne depasse pas 6, donc ici on bride le nombre de token à 6 pour ce contrat
        // Il faudra par la suite ne pas utiliser cela
        require(tokenId <= MAX_SUPPLY, "Plus de tokens disponibles");

        // On l'incrémente pour le prochain jeton
        _tokenIdCounter = _tokenIdCounter + 1;

        // Il créé le token, en appelant la fonction _safeMint
        _safeMint(msg.sender, tokenId);

        // On va créer l'uri du NFT
        string memory itemUri = getTokenURI(
            tokenId,
            name,
            description,
            imageUrl,
            attributes
        );

        //On va ajouter l'uri personalisé au NFT minté
        _setTokenURI(tokenId, itemUri);

        _approve(marketplace, tokenId, to);

        // Une fois ici, le NFT est minté, il appartient à la personne
    }

    // Cette fonction va permettre de supprimer un NFT
    // function _burn(uint256 tokenId) internal override(ERC721) {
    //     super._burn(tokenId);
    // }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Cette fonction va servir à récuperer le token URI du NFT
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    // Cette fonction permet de générer le token URI pour avoir les informations personalisé du NFT
    function getTokenURI(
        uint256 tokenId,
        string memory name,
        string memory description,
        string memory imageUrl,
        string memory attributes
    ) public pure returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"tokenId": "',
            tokenId,
            '",',
            '"name": "',
            name,
            '",',
            '"description": "',
            description,
            '",',
            '"image": "',
            imageUrl,
            '"',
            '"attributes": "',
            attributes,
            '"',
            "}"
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }
}
