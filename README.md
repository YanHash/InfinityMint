# InfinityMint

## Description

**InfinityMint** est une marketplace NFT innovante permettant aux utilisateurs d'acheter, vendre et échanger des NFT de manière éclairée et en toute simplicité, même en ayant peu de connaissances en art.

Développée avec **Next.js**, **TypeScript** et **shadcn/ui**, la plateforme offre une interface utilisateur moderne et réactive.

Elle se démarque des marketplaces similaires à travers une innovation majeure : **la mise en relation avec des experts certifiés indépendants**. Assurant un service de retour et d'estimation objectif, elle permet aux vendeurs et achteurs d'obtenir une valeur ajustée de la NFT mise en vente.  
Un objectif commun : _Efficace et rapide : un achat, une vente !_

## Technologies utilisées

- **Next.js** - Framework React pour le rendu côté serveur et statique.
- **WalletConnect / MetaMask** - Authentification et transactions sécurisées.

## Fonctionnalités principales

🔹 **Inscription & Connexion** via portefeuille crypto (MetaMask, WalletConnect, etc.).

🔹 **Création et Minting** de NFT avec stockage décentralisé.

🔹 **Achat & Vente** de NFT sur un marketplace sécurisé.

🔹 **Historique des transactions** et gestion des collections.

🔹 **Interface fluide et responsive** optimisée avec shadcn/ui et Tailwind CSS.

🔹 **Ajout de commentaires et estimation** par des experts certifiés

## Installation et démarrage

### Prérequis

- Node.js (version 22+ recommandée)
- pnpm
- Un portefeuille crypto (MetaMask)

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

## Déploiement

Pour déployer l'application sur Vercel :

```sh
 pnpm build  # ou npm run build
 vercel
```

## Démonstration

Video demo : https://drive.google.com/file/d/1d-LLXAPk24JYVX-gXpORYpVgrdNt1Jwp/view?usp=drive_link

## Contributeurs

Les contributeurs du projet sont :

- Yanis Arab
- Etienne Maillot
- Sylvain Delavacquery
- Jules Glocko
- Cyril Berche

_Mars 2025_
