# InfinityMint

## Description
InfinityMint est une marketplace NFT innovante permettant aux utilisateurs d'acheter, vendre et échanger des NFT en toute simplicité. Développée avec **Next.js**, **TypeScript** et **shadcn/ui**, la plateforme offre une interface utilisateur moderne et réactive.

## Technologies utilisées
- **Next.js** - Framework React pour le rendu côté serveur et statique.
- **TypeScript** - Langage typé pour améliorer la robustesse du code.
- **shadcn/ui** - Composants UI élégants et performants.
- **Tailwind CSS** - Framework CSS pour un design rapide et réactif.
- **Ethers.js** - Interaction avec la blockchain Ethereum.
- **IPFS / Pinata** - Stockage décentralisé des NFT.
- **WalletConnect / MetaMask** - Authentification et transactions sécurisées.

## Fonctionnalités principales
- 🔹 **Inscription & Connexion** via portefeuille crypto (MetaMask, WalletConnect, etc.).
- 🔹 **Création et Minting** de NFT avec stockage décentralisé.
- 🔹 **Achat & Vente** de NFT sur un marketplace sécurisé.
- 🔹 **Historique des transactions** et gestion des collections.
- 🔹 **Interface fluide et responsive** optimisée avec shadcn/ui et Tailwind CSS.

## Installation et démarrage
### Prérequis
- Node.js (version 16+ recommandée)
- Yarn ou npm
- Un portefeuille crypto (MetaMask ou WalletConnect)

### Installation
```sh
# Cloner le projet
git clone https://github.com/votre-repo/infinitymint.git
cd infinitymint

# Installer les dépendances
yarn install  # ou npm install
```

### Lancer le projet en mode développement
```sh
yarn dev  # ou npm run dev
```
Ouvrez votre navigateur et accédez à `http://localhost:3000`

## Configuration
Créer un fichier `.env.local` à la racine du projet et ajouter vos variables d'environnement :
```env
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_CONTRACT_ADDRESS=your_smart_contract_address
NEXT_PUBLIC_IPFS_GATEWAY=your_ipfs_gateway
```

## Déploiement
Pour déployer l'application sur Vercel :
```sh
yarn build  # ou npm run build
vercel
```

## Contributeurs
Les contributeurs du projet sont :
- Yanis Arab
- Etienne Maillot
- Sylvain Delavacquerie
- Jule Glocko
- Cyril Berche
