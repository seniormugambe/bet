interface Window {
  ethereum?: {
    // Wallet identification flags
    isMetaMask?: boolean;
    isMiniPay?: boolean;
    isCelo?: boolean;
    isValora?: boolean;
    isCoinbaseWallet?: boolean;
    
    // EIP-1193 provider methods
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on?: (event: string, callback: (...args: any[]) => void) => void;
    removeListener?: (event: string, callback: (...args: any[]) => void) => void;
    
    // Additional provider info
    selectedAddress?: string | null;
    chainId?: string;
    networkVersion?: string;
  };
}
