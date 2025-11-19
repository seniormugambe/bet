# MiniPay Integration Guide

## Overview

BetCelo now supports **Celo MiniPay**, the mobile-first wallet designed for the Celo ecosystem. The integration automatically detects when users access the platform through MiniPay and provides an optimized experience.

## What is MiniPay?

MiniPay is Celo's lightweight, mobile-first wallet that makes it easy for users to interact with dApps directly from their mobile browser. It's designed for:
- Fast onboarding
- Low friction transactions
- Mobile-optimized UX
- Built-in Celo support

## Features

### Automatic Detection
The platform automatically detects when a user is accessing through MiniPay and:
- Shows "Connect MiniPay" button instead of generic "Connect Wallet"
- Prioritizes MiniPay connector over other wallet options
- Provides optimized mobile experience

### Smart Wallet Button
The `SmartWalletButton` component intelligently switches between:
- **MiniPayButton** - When MiniPay is detected
- **ConnectWallet** - For standard wallet connections (MetaMask, WalletConnect, etc.)

## Technical Implementation

### 1. MiniPay Detection

```typescript
// src/config/wagmi.ts
export function isMiniPay(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(window.ethereum && (window.ethereum as any).isMiniPay);
}
```

### 2. Wagmi Configuration

The wagmi config includes a dedicated MiniPay connector that's prioritized:

```typescript
export const config = createConfig({
  chains,
  connectors: [
    // MiniPay connector (prioritized)
    injected({ 
      target: () => {
        if (typeof window !== 'undefined' && window.ethereum && (window.ethereum as any).isMiniPay) {
          return {
            id: 'minipay',
            name: 'MiniPay',
            provider: window.ethereum,
          };
        }
        return null;
      },
    }),
    // Standard injected wallet (MetaMask, etc.)
    injected({ target: 'metaMask' }),
    // WalletConnect for mobile wallets
    walletConnect({ projectId }),
  ],
  // ...
});
```

### 3. Component Structure

```
src/components/wallet/
├── SmartWalletButton.tsx    # Auto-detects and switches
├── MiniPayButton.tsx         # MiniPay-specific UI
└── ConnectWallet.tsx         # Standard wallet connection
```

## Usage

### In Your Components

Simply import and use the `SmartWalletButton`:

```tsx
import { SmartWalletButton } from '@/components/wallet/SmartWalletButton';

function MyComponent() {
  return (
    <header>
      <SmartWalletButton />
    </header>
  );
}
```

The button will automatically:
1. Detect if MiniPay is available
2. Show appropriate UI and text
3. Connect to the right wallet provider

## Testing

### Test on MiniPay

1. **Install MiniPay** on your mobile device
2. **Open the app** and navigate to the dApp browser
3. **Enter your dApp URL** (e.g., https://betcelo.com)
4. **Click "Connect MiniPay"** button
5. **Approve the connection** in MiniPay

### Test on Desktop

1. Open the app in a standard browser
2. Should show "Connect Wallet" button
3. Should connect to MetaMask or WalletConnect

## Browser Support

| Platform | Wallet | Status |
|----------|--------|--------|
| MiniPay Mobile | MiniPay | ✅ Fully Supported |
| Mobile Browser | WalletConnect | ✅ Supported |
| Desktop | MetaMask | ✅ Supported |
| Desktop | WalletConnect | ✅ Supported |

## User Experience

### MiniPay Flow
1. User opens dApp in MiniPay browser
2. Sees "Connect MiniPay" button
3. Clicks to connect
4. MiniPay prompts for approval
5. Connected and ready to bet!

### Standard Wallet Flow
1. User opens dApp in regular browser
2. Sees "Connect Wallet" button
3. Clicks to connect
4. Chooses wallet (MetaMask, WalletConnect, etc.)
5. Approves connection
6. Connected and ready to bet!

## Benefits

### For Users
- **Seamless mobile experience** with MiniPay
- **No wallet switching** - automatic detection
- **Faster onboarding** on mobile
- **Native Celo support** out of the box

### For Developers
- **Single component** handles all wallet types
- **Automatic detection** - no manual configuration
- **Type-safe** with TypeScript
- **Easy to maintain** and extend

## Configuration

### Environment Variables

No additional environment variables needed for MiniPay. The existing configuration works:

```env
VITE_CELO_NETWORK=alfajores
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

### Network Support

MiniPay works on both:
- **Celo Mainnet** (Chain ID: 42220)
- **Celo Alfajores Testnet** (Chain ID: 44787)

## Troubleshooting

### MiniPay Not Detected

**Problem**: Button shows "Connect Wallet" instead of "Connect MiniPay"

**Solutions**:
1. Ensure you're accessing through MiniPay browser
2. Check that MiniPay is up to date
3. Clear browser cache and reload

### Connection Fails

**Problem**: Connection request fails or times out

**Solutions**:
1. Check network connection
2. Ensure you're on the correct network (Alfajores/Mainnet)
3. Try disconnecting and reconnecting
4. Restart MiniPay app

### Balance Not Showing

**Problem**: CELO balance shows as 0 or doesn't load

**Solutions**:
1. Ensure wallet has CELO tokens
2. Check you're on the correct network
3. Wait a few seconds for balance to load
4. Refresh the page

## Future Enhancements

- [ ] MiniPay-specific UI optimizations
- [ ] Deep linking support
- [ ] Push notifications for bet results
- [ ] QR code sharing for events
- [ ] Social features integration

## Resources

- [MiniPay Documentation](https://docs.celo.org/developer/minipay)
- [Celo Developer Docs](https://docs.celo.org/)
- [Wagmi Documentation](https://wagmi.sh/)
- [BetCelo Documentation](./README.md)

## Support

For issues or questions:
- Open an issue on GitHub
- Join our Discord community
- Email: support@betcelo.com

---

**Built with ❤️ for the Celo ecosystem**
