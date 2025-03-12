#!/bin/bash

# Activer le mode strict pour arrêter le script en cas d'erreur
set -e

# Démarrer le backend dans un terminal séparé
echo "🚀 Démarrage du backend..."
(cd back && \
    pnpm i \
    npx hardhat compile && \
    npx hardhat node) &

# Attendre quelques secondes pour s'assurer que Hardhat Node est bien lancé
echo "⏳ Attente du démarrage de Hardhat Node..."
sleep 5

# Déployer les contrats
echo "📜 Déploiement des contrats..."
(cd back && \
    npx hardhat ignition deploy ./ignition/modules/NftContract.ts --network localhost && \
    npx hardhat ignition deploy ./ignition/modules/NftMarketplace.ts --network localhost)

# Démarrer le front dans un autre terminal
echo "🎨 Lancement du front-end..."
(cd front && pnpm i && pnpm run dev) &

# Garder le script en vie pour voir les logs
wait
