import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTContract = buildModule("NFTContract", (m) => {

  const nFTContract = m.contract("NFTContract");

  return { nFTContract };
});

export default NFTContract;