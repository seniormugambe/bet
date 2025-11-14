import { createConfig, http } from 'wagmi';
import { celo, celoAlfajores } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// Get environment variables
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id';
const network = import.meta.env.VITE_CELO_NETWORK || 'alfajores';

// Determine which chains to use based on environment
const chains = network === 'mainnet' 
  ? [celo, celoAlfajores] as const
  : [celoAlfajores, celo] as const;

// Configure for Celo with MiniPay support
export const config = createConfig({
  chains,
  connectors: [
    injected({ target: 'metaMask' }),
    walletConnect({ projectId }),
  ],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
});

// Export chain info for easy access
export const activeChain = network === 'mainnet' ? celo : celoAlfajores;
export const isMainnet = network === 'mainnet';

// MiniPay detection
export const isMiniPay = () => {
  if (typeof window === 'undefined') return false;
  return window.ethereum?.isMiniPay === true;
};

// Contract addresses from environment
export const FACTORY_CONTRACT_ADDRESS = import.meta.env.VITE_FACTORY_CONTRACT_ADDRESS as `0x${string}` | undefined;
export const ACCESS_CONTROL_CONTRACT_ADDRESS = import.meta.env.VITE_ACCESS_CONTROL_CONTRACT_ADDRESS as `0x${string}` | undefined;

// Celo-specific configuration
export const CELO_CONFIG = {
  mainnet: {
    chainId: 42220,
    name: 'Celo',
    rpcUrl: 'https://forno.celo.org',
    blockExplorer: 'https://celoscan.io',
    nativeCurrency: {
      name: 'CELO',
      symbol: 'CELO',
      decimals: 18,
    },
  },
  alfajores: {
    chainId: 44787,
    name: 'Celo Alfajores Testnet',
    rpcUrl: 'https://alfajores-forno.celo-testnet.org',
    blockExplorer: 'https://alfajores.celoscan.io',
    nativeCurrency: {
      name: 'CELO',
      symbol: 'CELO',
      decimals: 18,
    },
  },
};

export const currentNetwork = CELO_CONFIG[network as keyof typeof CELO_CONFIG] || CELO_CONFIG.alfajores;
