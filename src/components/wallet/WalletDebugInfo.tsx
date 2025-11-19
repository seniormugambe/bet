import { useEffect, useState } from 'react';
import { isMiniPay, isMobileDevice, getWalletName } from '@/config/wagmi';
import { useAccount } from 'wagmi';

/**
 * Debug component to show wallet detection information
 * Only visible in development mode
 */
export function WalletDebugInfo() {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const { isConnected, connector } = useAccount();

  useEffect(() => {
    const info = {
      isMiniPay: isMiniPay(),
      isMobile: isMobileDevice(),
      walletName: getWalletName(),
      hasEthereum: typeof window !== 'undefined' && !!window.ethereum,
      ethereumFlags: typeof window !== 'undefined' && window.ethereum ? {
        isMetaMask: window.ethereum.isMetaMask,
        isMiniPay: (window.ethereum as any).isMiniPay,
        isCelo: (window.ethereum as any).isCelo,
        isValora: (window.ethereum as any).isValora,
        isCoinbaseWallet: (window.ethereum as any).isCoinbaseWallet,
      } : null,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
      isConnected,
      connectorName: connector?.name,
      connectorId: connector?.id,
    };
    setDebugInfo(info);
  }, [isConnected, connector]);

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-md p-4 bg-black/90 text-white text-xs rounded-lg shadow-lg z-50 max-h-96 overflow-auto">
      <div className="font-bold mb-2 text-primary">🔍 Wallet Detection Debug</div>
      <pre className="whitespace-pre-wrap break-words">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
}
