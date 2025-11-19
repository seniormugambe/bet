import { useEffect, useState } from 'react';
import { isMiniPay, isMobileDevice } from '@/config/wagmi';
import { MiniPayButton } from './MiniPayButton';
import { ConnectWallet } from './ConnectWallet';

/**
 * Smart wallet button that automatically detects and uses MiniPay when available,
 * otherwise falls back to standard wallet connection
 * 
 * Detection strategy:
 * 1. Check for window.ethereum.isMiniPay flag
 * 2. Check user agent for MiniPay indicators
 * 3. Check for Celo mobile wallet flags
 * 4. Listen for ethereum provider changes
 */
export function SmartWalletButton() {
  const [useMiniPay, setUseMiniPay] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Initial check
    const checkMiniPay = () => {
      const detected = isMiniPay();
      setUseMiniPay(detected);
      setIsChecking(false);
      
      // Log detection for debugging
      if (detected) {
        console.log('✅ MiniPay detected');
      } else if (isMobileDevice()) {
        console.log('📱 Mobile device detected, but not MiniPay');
      } else {
        console.log('💻 Desktop browser detected');
      }
    };

    // Check immediately
    checkMiniPay();

    // Listen for ethereum provider changes (when wallet is injected)
    const handleEthereumChange = () => {
      console.log('🔄 Ethereum provider changed, rechecking...');
      checkMiniPay();
    };

    // Some wallets inject ethereum after page load
    if (typeof window !== 'undefined') {
      window.addEventListener('ethereum#initialized', handleEthereumChange);
      
      // Also check periodically for the first few seconds
      const checkInterval = setInterval(() => {
        if (window.ethereum && !useMiniPay) {
          checkMiniPay();
        }
      }, 500);

      // Clear interval after 3 seconds
      setTimeout(() => clearInterval(checkInterval), 3000);

      return () => {
        window.removeEventListener('ethereum#initialized', handleEthereumChange);
        clearInterval(checkInterval);
      };
    }
  }, [useMiniPay]);

  // Show loading state briefly during initial check
  if (isChecking) {
    return <ConnectWallet />;
  }

  // Use MiniPay button if available, otherwise use standard ConnectWallet
  return useMiniPay ? <MiniPayButton /> : <ConnectWallet />;
}
