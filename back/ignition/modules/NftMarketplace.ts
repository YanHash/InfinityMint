import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTMarketplace = buildModule("NFTMarketplace", (m) => {

  const nFTMarketplace = m.contract("NFTMarketplace");

  return { nFTMarketplace };
});

export default NFTMarketplace;