# InfinityMint

## Description
InfinityMint est une marketplace NFT innovante permettant aux utilisateurs d'acheter, vendre et échanger des NFT en toute simplicité. Développée avec **Next.js**, **TypeScript** et **shadcn/ui**, la plateforme offre une interface utilisateur moderne et réactive.
**InfinityMint** est une marketplace NFT innovante permettant aux utilisateurs d'acheter, vendre et échanger des NFT de manière éclairée et en toute simplicité, même en ayant peu de connaissances en art.

Développée avec **Next.js**, **TypeScript** et **shadcn/ui**, la plateforme offre une interface utilisateur moderne et réactive.

Elle se démarque des marketplaces similaires à travers une innovation majeure : **la mise en relation avec des experts certifiés indépendants**. Assurant un service de retour et d'estimation objectif, elle permet aux vendeurs et achteurs d'obtenir une valeur ajustée de la NFT mise en vente.  
Un objectif commun : *Efficace et rapide : un achat, une vente !*

## Technologies utilisées
- **Next.js** - Framework React pour le rendu côté serveur et statique.
  @@ -13,11 +18,17 @@ InfinityMint est une marketplace NFT innovante permettant aux utilisateurs d'ach
- **WalletConnect / MetaMask** - Authentification et transactions sécurisées.

## Fonctionnalités principales
- 🔹 **Inscription & Connexion** via portefeuille crypto (MetaMask, WalletConnect, etc.).
- 🔹 **Création et Minting** de NFT avec stockage décentralisé.
- 🔹 **Achat & Vente** de NFT sur un marketplace sécurisé.
- 🔹 **Historique des transactions** et gestion des collections.
- 🔹 **Interface fluide et responsive** optimisée avec shadcn/ui et Tailwind CSS.
  🔹 **Inscription & Connexion** via portefeuille crypto (MetaMask, WalletConnect, etc.).

🔹 **Création et Minting** de NFT avec stockage décentralisé.

🔹 **Achat & Vente** de NFT sur un marketplace sécurisé.

🔹 **Historique des transactions** et gestion des collections.

🔹 **Interface fluide et responsive** optimisée avec shadcn/ui et Tailwind CSS.

🔹**Ajout de commentaires et estimation** par des experts certifiés

## Installation et démarrage
### Prérequis
@@ -27,17 +38,39 @@ InfinityMint est une marketplace NFT innovante permettant aux utilisateurs d'ach

### Installation
  ```sh
  # Cloner le projet
  #Cloner le projet
  git clone https://github.com/votre-repo/infinitymint.git
  cd infinitymint
 
  # Installer les dépendances
  pnpm install  # ou npm install
  #Installer les dépendances du back-end
  cd back
  pnpm install
  
  #Compiler les smart contracts
  npx hardhat compile
 
  #Lancer la blockchain locale
  npx hardhat node
 
  #Déployer les contrats
  npx hardhat ignition deploy ./ignition/modules/NftContract.ts --network localhost
  npx hardhat ignition deploy ./ignition/modules/NftMarketplace.ts --network localhost
 
  #Installer les dépendances du front-end
  cd front 
  pnpm install
  ```

### Lancer le projet en mode développement
  ```sh
  pnpm dev  # ou npm run dev
  cd front
  pnpm run dev
  
  cd ../back
  npx hardhat node
  npx hardhat ignition deploy ./ignition/modules/NftContract.ts --network localhost
  npx hardhat ignition deploy ./ignition/modules/NftMarketplace.ts --network localhost
 
  ```
Ouvrez votre navigateur et accédez à `http://localhost:3000`

@@ -50,8 +83,11 @@ Pour déployer l'application sur Vercel :

## Contributeurs
Les contributeurs du projet sont :
- Yanis Arab
- Etienne Maillot
- Sylvain Delavacquery
- Jules Glocko
- Cyril Berche
- ARAB Yanis
- MAILLOT Etienne
- DELAVACQUERY Sylvain
- GLOCKO Jules
- BERCHE Cyril


*Mars 2025*