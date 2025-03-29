import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, coinbaseWallet, metaMask, safe } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia],
  //   connectors: [injected(), coinbaseWallet(), metaMask(), safe()],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
