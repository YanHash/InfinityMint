import { http, createConfig } from '@wagmi/core'
import { hardhat, sepolia } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [hardhat, sepolia],
  transports: {
    [hardhat.id]: http(),
    [sepolia.id]: http(),
  },
})