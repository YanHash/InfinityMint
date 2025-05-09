// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

// , ERC721Burnable, Ownable

import "hardhat/console.sol";

contract NFTMarketplace is Initializable{

    address public owner;

    // Ajout du NFT 
    constructor() {
        _disableInitializers();
        owner = msg.sender;
    }

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
        string tokenUri;
        bool listed;
    }

    struct User {
        address owner;
        bool created;
        Collection[] collections;
    }

    // ------------------------------------------------------------------------
    // ----------------------- VARIABLES COLLECTION ---------------------------
    // ------------------------------------------------------------------------

    // ------ VOIR POUR MODIFIER listeCollections afin de stocker que les id de collextion pour ensuite aller les chercher dans colletions 
    // Evite de stocker 2 fois les infos, et on a juste à modifier une fois

    // Récuperer une collection en fonction de son id
    mapping(uint256 => Collection) public collections;  // collectionId => Collection
    // Liste contenant toutes les collections
    Collection[] public listeCollections;
    // Mapping permettant de savoir si une collection existe 
    mapping(uint256 => bool) public listeIdCollectionExists;


    mapping(address => User) public usersList; // address => collection proprio

    // ------------------------------------------------------------------------
    // ------------------------- VARIABLES LISTING ----------------------------
    // ------------------------------------------------------------------------


    mapping(address => mapping(uint256 => Listing)) public listings;  // (NFT contract => (Token ID => Listing))
    mapping(uint256 => Listing[]) public collectionToNFTs; // (Collection ID => list of Token IDs)

    Listing[] public horsCollection;


    // ------------------------------------------------------------------------
    // ------------------------ EVENEMENT BLOCKCHAIN --------------------------
    // ------------------------------------------------------------------------

    // Evénements pour suivre les actions
    event CollectionCreated(Collection col);
    event NFTListed(address indexed nftContract, uint256 indexed tokenId, address seller, uint256 price);
    event NFTSold(address indexed nftContract, uint256 indexed tokenId, address buyer, uint256 price);
    event ListingCanceled(address indexed nftContract, uint256 indexed tokenId, address seller);
    event NFTMinted(address indexed nftContract, uint256 tokenId, uint256 collectionId, address owner);


    // Ajouter une collection
    function addCollection(Collection memory col) internal {

        // On ajoute au mapping la collection pour la trouver en fonction de l'id

        if(listeIdCollectionExists[col.collectionId] == false){
            // Ici, la collection n'existe pas, on peut l'ajouter à la liste
            listeIdCollectionExists[col.collectionId] == true;
            // On va creer une collection de la manière suivante : idCollection, adresse proprio, nom de la collection, description de la collection, nombre de NFT (0 au début)
            collections[col.collectionId] = col;
            // On l'ajoute à la liste des collections
            listeCollections.push(col);

            emit CollectionCreated(col);
        }
    }

    // Fonction pour obtenir les informations d'une collection
    function getCollection(uint256 collectionId) external view returns (string memory, string memory, uint256) {
        Collection memory collection = collections[collectionId];
        return (collection.name, collection.description, collection.totalSupply);
    }

    // Fonction pour obtenir les 10 premières id collections NFT du contrat
    function getTenCollections(uint256 skipCollections) external view returns (Collection[] memory) {
        // Cette fonction permet de récupérer les collections 
        uint256 start = skipCollections;
        uint256 nbRestant = listeCollections.length - skipCollections; 

        uint256 length = nbRestant > 10 ? 10 : nbRestant;
        Collection[] memory retour = new Collection[](length); // Initialisation du tableau

        uint256 indexStart = start;

        if(indexStart > 0){
            indexStart = indexStart-1;
        }

        console.log("nombre de skip :" , start);
        console.log("nbRestants :" , nbRestant);
        console.log("combien on recup :" , length);
        console.log("on commence a :" , indexStart);

        for (uint i = indexStart; i < length; i++) {
            retour[i] = collections[listeCollections[i].collectionId]; // Affectation directe. On recupere la valeur du mapping car elle est à jour
        }

        return retour;
    }


    function removeListing( Listing memory listingToRemove) public {
        int256 index = findListingIndex(listingToRemove.collectionId, listingToRemove);
        require(index >= 0, "Listing not found");

        uint256 idx = uint256(index); // Convertir en uint256

        // Remplace l'élément à supprimer par le dernier élément (swap & pop)
        collectionToNFTs[listingToRemove.collectionId][idx] = collectionToNFTs[listingToRemove.collectionId][collectionToNFTs[listingToRemove.collectionId].length - 1];

        // Supprime le dernier élément du tableau
        collectionToNFTs[listingToRemove.collectionId].pop();
    }


    function removeListingHorsSerie( Listing memory listingToRemove) public {
        int256 index = findListingHorsSerieIndex(listingToRemove);
        require(index >= 0, "Listing not found");

        uint256 idx = uint256(index); // Convertir en uint256

        // Remplace l'élément à supprimer par le dernier élément (swap & pop)
        horsCollection[idx] = horsCollection[horsCollection.length - 1];

        // Supprime le dernier élément du tableau
        horsCollection.pop();
    }

    function findListingIndex(uint256 collectionId ,Listing memory listingToFind) internal view returns (int256) {
        for (uint256 i = 0; i < collectionToNFTs[collectionId].length; i++) {
            if (
                collectionToNFTs[collectionId][i].collectionId == listingToFind.collectionId &&
                collectionToNFTs[collectionId][i].seller == listingToFind.seller &&
                collectionToNFTs[collectionId][i].price == listingToFind.price &&
                keccak256(abi.encodePacked(collectionToNFTs[collectionId][i].tokenUri)) == keccak256(abi.encodePacked(listingToFind.tokenUri))
            ) {
                return int256(i); // Retourne l'index si trouvé
            }
        }
        return -1; // Retourne -1 si non trouvé
    }

    // Cette fonction pemret de trouver l'indice du listing correspondant au NFT hors serie qui vient d'être vendu
    function findListingHorsSerieIndex(Listing memory listingToFind) internal view returns (int256) {
        for (uint256 i = 0; i < horsCollection.length; i++) {
            if (
                horsCollection[i].collectionId == listingToFind.collectionId &&
                horsCollection[i].seller == listingToFind.seller &&
                horsCollection[i].price == listingToFind.price &&
                keccak256(abi.encodePacked(horsCollection[i].tokenUri)) == keccak256(abi.encodePacked(listingToFind.tokenUri))
            ) {
                return int256(i); // Retourne l'index si trouvé
            }
        }
        return -1; // Retourne -1 si non trouvé
    }

    // Fonction pour créer une collection
    // Chaque collection pourra être éditée uniquement par son propriétaire
    function createCollection(string memory name, string memory description) external {
        // On va générer un id de collection avec l'abi
        uint256 collectionId = uint256(keccak256(abi.encodePacked(name, block.timestamp)));

        // On va réserver le numéro 0 pour la collection par défaut
        // Si il vaut 0, on ajoute 1
        if(collectionId == 0){ collectionId = collectionId+1;}

        Collection memory newCollection = Collection(collectionId, msg.sender, name, description, 0);

        addCollection(newCollection);

        if(!usersList[msg.sender].created){
            // L'utilisateur n'existe pas on va le creer et l'ajouter 
            usersList[msg.sender].owner = msg.sender;
            usersList[msg.sender].created = true;
        }

        usersList[msg.sender].collections.push(newCollection);

    }

    // Cette fonction permet de récupérer les informations de l'utilisateur
    function getUserInformations() external view returns (User memory) {
        return usersList[msg.sender];
    }

    function createCollectionDefault() internal {
        Collection memory newCollection = Collection(0, address(this), "InfinityMint", "InfinityMint", 0);
        addCollection(newCollection);
    }

    // Fonction pour lister un NFT sur le marketplace
    function listNFT(address nftContract, uint256 tokenId, uint256 price, uint256 collectionId) external{
        // On va vérifier que le prix soit supérieur à 0
        require(price > 0, "Price must be greater than zero");

        //On va recupérer l'adresse du propriétaire du NFT
        IERC721 token = IERC721(nftContract);
        address ownerToken = token.ownerOf(tokenId);

        // On verifie que c'est bien le propriétaire qui fait la demande
        require(ownerToken == msg.sender, "Not the owner");
        // On vérifie que la marketplace est approvée à utiliser le NFT
        require(token.getApproved(tokenId) == address(this), "Marketplace not approved");

        // On récupére le TokenURI avec les métadonnées
        string memory tokenUri = ERC721URIStorage(nftContract).tokenURI(tokenId);

        // On ajoute le NFT au listing
        Listing memory valeur = Listing(collectionId,msg.sender, price,tokenUri, true);
        require(!listings[nftContract][tokenId].listed, "NFT already listed");
        listings[nftContract][tokenId] = valeur;

        // On ajoute également à la collection si l'id != 0
        if(collectionId != 0){
            require(collections[collectionId].owner == msg.sender, "You are not the owner of the collection");
            collectionToNFTs[collectionId].push(valeur);
        }
        else {
            // on l'ajoute à la liste hors série
            horsCollection.push(valeur);
        }
        
        // On envoie un evenement sur la blockchain pour indiquer qu'une nouvelle collection est en ligne
        emit NFTListed(nftContract, tokenId, msg.sender, price);
    }

    // Cette fonction permet de recupérer les NFT d'une collection spécifique en fonction de son ID
    function getNFTFromCollectionId(uint256 collectionId) external view returns (Listing[] memory){
        return collectionToNFTs[collectionId];
    }

    // Cette fonction permet de retourner tous les NFT de la plateforme qui sont hors série par lot de 10
    function getNFTHorsSerie(uint256 skipNFT) external view returns (Listing[] memory){
        // Cette fonction permet de récupérer les collections 
        uint256 start = skipNFT;
        uint256 nbRestant = horsCollection.length - skipNFT; 

        uint256 length = nbRestant > 10 ? 10 : nbRestant;
        Listing[] memory retour = new Listing[](length); // Initialisation du tableau

        uint256 indexStart = start;

        if(indexStart > 0){
            indexStart = indexStart-1;
        }

        console.log("nombre de skip :" , start);
        console.log("nbRestants :" , nbRestant);
        console.log("combien on recup :" , length);
        console.log("on commence a :" , indexStart);

        for (uint i = indexStart; i < length; i++) {
            retour[i] = horsCollection[i]; // Affectation directe
        }

        return retour;
    }

    // --------------------------------- NOT CHECK FOR NOW -------------------------------------------------
    // Fonction pour acheter un NFT
    function buyNFT(address nftContract, uint256 tokenId) external payable {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.price > 0, "NFT not for sale");
        require(msg.value >= listing.price, "Insufficient payment");
        uint256 price = listing.price * 10**18;
        uint256 fee = (price * 10) / 100 ;
        uint256 amountForSeller = (price * 90) / 100;

        console.log("prix de base : ", msg.value);
        console.log("fee :", fee);
        console.log("amountForSeller :", amountForSeller);

        
        

        //payable(listing.seller).transfer(amountForSeller);
        // payable(address(this)).transfer(fee);

        payable(listing.seller).transfer(amountForSeller);
        payable(owner).transfer(fee);

        // Transférer les fonds au destinataire (90 %)
        // (bool successSeller, ) = payable(listing.seller).call{value: amountForSeller}("");
        // require(successSeller, "Transfert au vendeur a echoue");

        // // Transférer les frais au contrat (10 %)
        // (bool successFee, ) = payable(owner).call{value: fee}("");
        // require(successFee, "Transfert des frais au contrat a echoue");

        delete listings[nftContract][tokenId];

        console.log("Listing supprime");
        console.log("Tranfert fond ok");

        IERC721(nftContract).safeTransferFrom(listing.seller, msg.sender, tokenId);

        if(listing.collectionId != 0){
            // on le supprime de la collection  

            removeListing(listing);

            // On augmente le volume de d'argent depensé pour la collection
            collections[listing.collectionId].totalSupply = collections[listing.collectionId].totalSupply + listing.price;
        } 
        else {
            // ************** TODO ******************
            // On doit l'éffacer des hors série
            findListingHorsSerieIndex(listing);
            
        }

        console.log("Argent du contrat : ",getBalance());

        emit NFTSold(nftContract, tokenId, msg.sender, listing.price);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Fonction pour annuler une liste de vente
    function cancelListing(address nftContract, uint256 tokenId) external {

        // On recupere le listing
        Listing memory listing = listings[nftContract][tokenId];
        // On verfie que c'est bien initié par le proprio
        require(listing.seller == msg.sender, "Not the seller");
        // On efface le listing
        delete listings[nftContract][tokenId];

        // On emet un evenement sur la blockchain
        emit ListingCanceled(nftContract, tokenId, msg.sender);
    }

    // Cette fonction va permettre de récupérer l'uri d'un NFT Spéifique
    function getTokenUriNFT(address nftContract, uint256 tokenId) external view returns (string memory) {
        IERC721Metadata token = IERC721Metadata(nftContract);
        return token.tokenURI(tokenId);
    }


}
