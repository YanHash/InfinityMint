**Compile les smart contract**

```
npx hardhat compile
```

**Lancer la blockchain locale**

```
npx hardhat node
```

**Déployer les contrats**

```
npx hardhat ignition deploy ./ignition/modules/NftContract.ts --network localhost
npx hardhat ignition deploy ./ignition/modules/NftMarketplace.ts --network localhost
```
