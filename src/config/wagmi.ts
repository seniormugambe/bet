import { createConfig, http } from 'wagmi';
import { sepolia, mainnet } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// Get environment variables
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id';
const network = import.meta.env.VITE_NETWORK || 'sepolia';

// Determine which chains to use based on environment
const chains = network === 'mainnet' 
  ? [mainnet, sepolia] as const
  : [sepolia, mainnet] as const;

// Configure for Ethereum with Sepolia testnet
export const config = createConfig({
  chains,
  connectors: [
    injected({ target: 'metaMask' }),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

// Export chain info for easy access
export const activeChain = network === 'mainnet' ? mainnet : sepolia;
export const isMainnet = network === 'mainnet';

// Contract addresses from environment
export const FACTORY_CONTRACT_ADDRESS = import.meta.env.VITE_FACTORY_CONTRACT_ADDRESS as `0x${string}` | undefined;

// Network configuration
export const NETWORK_CONFIG = {
  mainnet: {
    chainId: 1,
    name: 'Ethereum',
    rpcUrl: 'https://eth.llamarpc.com',
    blockExplorer: 'https://etherscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  sepolia: {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    rpcUrl: 'https://rpc.sepolia.org',
    blockExplorer: 'https://sepolia.etherscan.io',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
};

export const currentNetwork = NETWORK_CONFIG[network as keyof typeof NETWORK_CONFIG] || NETWORK_CONFIG.sepolia;
