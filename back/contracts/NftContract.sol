// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol"; // Import pour convertir uint256 en string

contract NFTContract is ERC721, ERC721Burnable, ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter = 1;
    uint256 public constant MAX_SUPPLY = 600;

    constructor() ERC721("InfinityMintNFT", "INF") Ownable(msg.sender) {}

    function safeMint(
        address to,
        string memory name,
        string memory description,
        string memory imageUrl,
        string memory attributes,
        address marketplace
    ) public {
        require(_tokenIdCounter <= MAX_SUPPLY, "Plus de tokens disponibles");

        uint256 tokenId = _tokenIdCounter;

        // Mint du NFT
        _safeMint(to, tokenId);

        // Générer et assigner l'URI du NFT
        string memory itemUri = getTokenURI(
            tokenId,
            name,
            description,
            imageUrl,
            attributes
        );
        _setTokenURI(tokenId, itemUri);

        // Approuver le marketplace
        _approve(marketplace, tokenId, to);

        // Incrémentation après mint
        _tokenIdCounter += 1;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

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
            Strings.toString(tokenId),
            '",',
            '"name": "',
            name,
            '",',
            '"description": "',
            description,
            '",',
            '"image": "',
            imageUrl,
            '",',
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
