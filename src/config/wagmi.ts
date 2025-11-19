import { createConfig, http } from 'wagmi';
import { celo, celoAlfajores } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// Use Celo mainnet as "sepolia" for deployment
const celoSepolia = celo;

// Get environment variables
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id';
const network = import.meta.env.VITE_CELO_NETWORK || 'sepolia';

// Determine which chains to use based on environment
const chains = network === 'mainnet' 
  ? [celo, celoAlfajores, celoSepolia] as const
  : network === 'sepolia'
  ? [celoSepolia, celoAlfajores, celo] as const
  : [celoAlfajores, celo, celoSepolia] as const;

// Configure for Celo blockchain with MiniPay support
export const config = createConfig({
  chains,
  connectors: [
    // Injected wallet connector (supports MiniPay, MetaMask, etc.)
    injected(),
    // WalletConnect for mobile wallets
    walletConnect({ 
      projectId,
      showQrModal: true,
    }),
  ],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
    [celoSepolia.id]: http(),
  },
});

// Export chain info for easy access
export const activeChain = network === 'mainnet' ? celo : network === 'sepolia' ? celoSepolia : celoAlfajores;
export const isMainnet = network === 'mainnet';

// Contract addresses from environment
export const FACTORY_CONTRACT_ADDRESS = import.meta.env.VITE_FACTORY_CONTRACT_ADDRESS as `0x${string}` | undefined;

// Network configuration
export const NETWORK_CONFIG = {
  mainnet: {
    chainId: 42220,
    name: 'Celo Mainnet',
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
  sepolia: {
    chainId: 42220,
    name: 'Celo Mainnet',
    rpcUrl: 'https://1rpc.io/celo',
    blockExplorer: 'https://celoscan.io',
    nativeCurrency: {
      name: 'CELO',
      symbol: 'CELO',
      decimals: 18,
    },
  },
};

export const currentNetwork = NETWORK_CONFIG[network as keyof typeof NETWORK_CONFIG] || NETWORK_CONFIG.sepolia;

// MiniPay detection function with multiple checks
export function isMiniPay(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for MiniPay flag
  if (window.ethereum && (window.ethereum as any).isMiniPay) {
    return true;
  }
  
  // Check user agent for MiniPay indicators
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('minipay')) {
    return true;
  }
  
  // Check for Celo mobile wallet indicators
  if (window.ethereum && (window.ethereum as any).isCelo) {
    return true;
  }
  
  return false;
}

// Check if user is on mobile device
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Get wallet name for display
export function getWalletName(): string {
  if (typeof window === 'undefined') return 'Wallet';
  
  if (isMiniPay()) return 'MiniPay';
  if (window.ethereum?.isMetaMask) return 'MetaMask';
  if ((window.ethereum as any)?.isCoinbaseWallet) return 'Coinbase Wallet';
  if ((window.ethereum as any)?.isValora) return 'Valora';
  
  return 'Wallet';
}
