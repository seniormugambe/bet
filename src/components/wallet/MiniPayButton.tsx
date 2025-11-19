import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, LogOut } from 'lucide-react';
import { formatAddress } from '@/lib/utils';
import { isMiniPay } from '@/config/wagmi';
import { useEffect, useState } from 'react';

export function MiniPayButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [balance, setBalance] = useState<string>('0');
  const [isMiniPayAvailable, setIsMiniPayAvailable] = useState(false);

  useEffect(() => {
    setIsMiniPayAvailable(isMiniPay());
  }, []);

  useEffect(() => {
    if (address && isConnected) {
      // Fetch balance
      const fetchBalance = async () => {
        try {
          if (window.ethereum) {
            const balanceHex = await window.ethereum.request({
              method: 'eth_getBalance',
              params: [address, 'latest'],
            });
            const balanceWei = parseInt(balanceHex, 16);
            const balanceCelo = (balanceWei / 1e18).toFixed(4);
            setBalance(balanceCelo);
          }
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      };
      fetchBalance();
    }
  }, [address, isConnected]);

  const handleConnect = () => {
    // Use the first available connector (injected wallet)
    // This will automatically use MiniPay if it's the injected provider
    const connector = connectors[0];
    
    if (connector) {
      console.log('🔌 Connecting with connector:', connector.name);
      connect({ connector });
    } else {
      console.error('❌ No connectors available');
    }
  };

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        className="btn-kahoot-primary flex items-center gap-2"
      >
        <Wallet className="w-5 h-5" />
        {isMiniPayAvailable ? 'Connect MiniPay' : 'Connect Wallet'}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="glass-card px-4 py-2 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium">
            {formatAddress(address || '')}
          </span>
          <span className="text-sm text-muted-foreground">
            {balance} CELO
          </span>
        </div>
      </div>
      <button
        onClick={() => disconnect()}
        className="glass-card px-3 py-2 rounded-xl hover:bg-surface-elevated transition-colors"
        title="Disconnect"
      >
        <LogOut className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  );
}
