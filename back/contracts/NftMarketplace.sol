// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// , ERC721Burnable, Ownable

contract NFTMarketplace {

    constructor() {}

    // Structure pour une collection
    struct Collection {
        uint256 collectionId;
        address owner;
        string name;
        string description;
        uint256 totalSupply;
    }

    // Structure pour une annonce de vente
    struct Listing {
        uint256 collectionId;
        address seller;
        uint256 price;
    }

    uint256[] public listeIdCollectionValue;
    mapping(uint256 => bool) public listeIdCollectionKeys;

    // Mappings pour gérer les collections et les NFTs
    mapping(uint256 => Collection) public collections;  // collectionId => Collection
    mapping(address => mapping(uint256 => Listing)) public listings;  // (NFT contract => (Token ID => Listing))
    mapping(uint256 => uint256) public tokenIdToCollection; // (Token ID => Collection ID)
    mapping(uint256 => uint256[]) public collectionToNFTs; // (Collection ID => list of Token IDs)

    // Evénements pour suivre les actions
    event CollectionCreated(uint256 collectionId, string name, string description);
    event NFTListed(address indexed nftContract, uint256 indexed tokenId, address seller, uint256 price);
    event NFTSold(address indexed nftContract, uint256 indexed tokenId, address buyer, uint256 price);
    event ListingCanceled(address indexed nftContract, uint256 indexed tokenId, address seller);
    event NFTMinted(address indexed nftContract, uint256 tokenId, uint256 collectionId, address owner);


    // Fonction pour créer une collection
    function createCollection(string memory name, string memory description) external {
        uint256 collectionId = uint256(keccak256(abi.encodePacked(name, block.timestamp)));
        if(listeIdCollectionKeys[collectionId] == false){
            // Ici, la collection n'existe pas, on peut l'ajouter à la liste
            listeIdCollectionValue.push(collectionId);
            listeIdCollectionKeys[collectionId] == true;
            collections[collectionId] = Collection(collectionId, msg.sender, name, description, 0);
            emit CollectionCreated(collectionId, name, description);
        }
    }

    // // Fonction pour mint un NFT dans une collection spécifique
    // function mintNFT(address nftContract, uint256 collectionId, uint256 tokenId) external {
    //     require(bytes(collections[collectionId].name).length > 0, "Collection does not exist");

    //     IERC721 token = IERC721(nftContract);
    //     token.safeTransferFrom(address(this), msg.sender, tokenId);

    //     // Associer ce NFT à la collection
    //     tokenIdToCollection[tokenId] = collectionId;
    //     collectionToNFTs[collectionId].push(tokenId);

    //     emit NFTMinted(nftContract, tokenId, collectionId, msg.sender);
    // }

    // Fonction pour lister un NFT sur le marketplace
    function listNFT(address nftContract, uint256 tokenId, uint256 price) external {
        require(price > 0, "Price must be greater than zero");
        IERC721 token = IERC721(nftContract);
        address owner = token.ownerOf(tokenId);
        require(owner == msg.sender, "Not the owner");
        //token.approve(address(this), tokenId);  // Autorise la marketplace à transférer ce NFT
        require(token.getApproved(tokenId) == address(this), "Marketplace not approved");
        //token.safeTransferFrom(msg.sender, address(this), tokenId);
        listings[nftContract][tokenId] = Listing(0,msg.sender, price);
        emit NFTListed(nftContract, tokenId, msg.sender, price);
    }

    // Fonction pour acheter un NFT
    function buyNFT(address nftContract, uint256 tokenId) external payable {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.price > 0, "NFT not for sale");
        require(msg.value >= listing.price, "Insufficient payment");

        
        delete listings[nftContract][tokenId];

        payable(listing.seller).transfer(msg.value);

        IERC721(nftContract).safeTransferFrom(listing.seller, msg.sender, tokenId);

        if(listing.collectionId != 0){
          // on le supprime de la collection  
          removeNumberByValue(collectionToNFTs[listing.collectionId], tokenId);
        } 

        emit NFTSold(nftContract, tokenId, msg.sender, listing.price);
    }

    // Fonction pour annuler une liste de vente
    function cancelListing(address nftContract, uint256 tokenId) external {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.seller == msg.sender, "Not the seller");

        delete listings[nftContract][tokenId];
        // Il faudrait retirer le approve de la marketplace
        emit ListingCanceled(nftContract, tokenId, msg.sender);
    }

    // Fonction pour obtenir les NFTs dans une collection
    function getNFTsInCollection(uint256 collectionId) external view returns (uint256[] memory) {
        return collectionToNFTs[collectionId];
    }

    // Cette fonction va permettre de récupérer l'uri d'un NFT Spéifique
    function getTokenUriNFT(address nftContract, uint256 tokenId) external view returns (string memory) {
        IERC721Metadata token = IERC721Metadata(nftContract);
        return token.tokenURI(tokenId);
    }

    // Fonction pour obtenir les informations d'une collection
    function getCollection(uint256 collectionId) external view returns (string memory, string memory, uint256) {
        Collection memory collection = collections[collectionId];
        return (collection.name, collection.description, collection.totalSupply);
    }

    // Fonction pour obtenir les 10 premières collections NFT du contrat
    function getTenCollections() external view returns (uint256[] memory) {
        // Cette fonction permet de récupérer les collections 
        uint256 length = listeIdCollectionValue.length < 10 ? listeIdCollectionValue.length : 10;
        uint256[] memory retour = new uint256[](length); // Initialisation du tableau

        for (uint i = 0; i < length; i++) {
            retour[i] = listeIdCollectionValue[i]; // Affectation directe
        }

        return retour;
    }

    // UTILS :

    // Trouver l'index d'une valeur
    function findIndex(unint256[] liste, uint256 _value) public view returns (int256) {
        for (uint256 i = 0; i < liste.length; i++) {
            if (liste[i] == _value) {
                return int256(i);
            }
        }
        return -1; // Retourne -1 si la valeur n'est pas trouvée
    }

    // Supprimer un élément par valeur
    function removeNumberByValue(unint256[] liste, uint256 _value) public {
        int256 index = findIndex(liste, _value);
        require(index >= 0, "Value not found");
        removeNumber(liste, uint256(index));
    }

    // Supprimer un élément par index
    function removeNumber(unint256[] liste, uint256 _index) public {
        require(_index < liste.length, "Index out of bounds");

        // Déplacer les éléments suivants vers la gauche
        for (uint256 i = _index; i < liste.length - 1; i++) {
            liste[i] = liste[i + 1];
        }

        // Réduire la taille du tableau
        liste.pop();
    }

    // Obtenir la taille du tableau
    function getLength(unint256[] liste) public view returns (uint256) {
        return liste.length;
    }

    // Obtenir un élément du tableau
    function getNumber(unint256[] liste, uint256 _index) public view returns (uint256) {
        require(_index < liste.length, "Index out of bounds");
        return liste[_index];
    }
}
