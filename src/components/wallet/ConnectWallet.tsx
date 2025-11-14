import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { Wallet, LogOut, AlertCircle } from 'lucide-react';
import { formatAddress } from '@/lib/utils';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function ConnectWallet() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });

  useEffect(() => {
    if (error) {
      toast.error('Connection failed', {
        description: error.message,
      });
    }
  }, [error]);

  const handleConnect = () => {
    const connector = connectors[0];
    if (connector) {
      connect({ connector });
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col gap-2">
        <button
          onClick={handleConnect}
          disabled={isPending}
          className="btn-kahoot-primary flex items-center gap-2"
        >
          <Wallet className="w-5 h-5" />
          {isPending ? 'Connecting...' : 'Connect Wallet'}
        </button>
        {error && (
          <div className="text-xs text-danger flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>Connection failed</span>
          </div>
        )}
      </div>
    );
  }

  // Check if on wrong network
  const isWrongNetwork = chain && ![42220, 44787].includes(chain.id);

  return (
    <div className="flex items-center gap-3">
      {isWrongNetwork && (
        <div className="glass-card px-3 py-2 rounded-xl bg-danger/20 border-danger/50">
          <span className="text-xs text-danger font-medium">Wrong Network</span>
        </div>
      )}
      
      <div className="glass-card px-4 py-2 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium">
            {formatAddress(address || '')}
          </span>
          {balance && (
            <span className="text-sm text-muted-foreground">
              {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
            </span>
          )}
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
