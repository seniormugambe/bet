# MiniPay Auto-Detection Testing Guide

## Overview

This guide helps you test and verify the MiniPay auto-detection feature.

## Detection Strategy

The app uses a multi-layered detection approach:

### 1. Primary Detection
```typescript
window.ethereum.isMiniPay === true
```

### 2. User Agent Detection
```typescript
navigator.userAgent.includes('minipay')
```

### 3. Celo Wallet Detection
```typescript
window.ethereum.isCelo === true
```

### 4. Mobile Device Detection
```typescript
/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
```

## Debug Mode

In development mode, a debug panel appears in the bottom-right corner showing:

- ✅ MiniPay detection status
- 📱 Mobile device detection
- 🔌 Available wallet flags
- 🌐 User agent string
- 🔗 Connection status
- 📊 Connector information

## Testing Scenarios

### Scenario 1: Test on MiniPay Mobile App

**Steps:**
1. Install MiniPay on your mobile device
2. Open MiniPay app
3. Navigate to dApp browser
4. Enter your app URL (e.g., `http://localhost:5173` or production URL)
5. Check debug panel (bottom-right)

**Expected Results:**
```json
{
  "isMiniPay": true,
  "isMobile": true,
  "walletName": "MiniPay",
  "hasEthereum": true,
  "ethereumFlags": {
    "isMiniPay": true
  }
}
```

**UI Should Show:**
- Button text: "Connect MiniPay"
- MiniPay-optimized interface

---

### Scenario 2: Test on Desktop Browser (MetaMask)

**Steps:**
1. Open app in Chrome/Firefox/Brave
2. Ensure MetaMask extension is installed
3. Check debug panel

**Expected Results:**
```json
{
  "isMiniPay": false,
  "isMobile": false,
  "walletName": "MetaMask",
  "hasEthereum": true,
  "ethereumFlags": {
    "isMetaMask": true
  }
}
```

**UI Should Show:**
- Button text: "Connect Wallet"
- Standard wallet interface

---

### Scenario 3: Test on Mobile Browser (No MiniPay)

**Steps:**
1. Open app in mobile Safari/Chrome
2. No wallet app installed
3. Check debug panel

**Expected Results:**
```json
{
  "isMiniPay": false,
  "isMobile": true,
  "walletName": "Wallet",
  "hasEthereum": false
}
```

**UI Should Show:**
- Button text: "Connect Wallet"
- WalletConnect option available

---

### Scenario 4: Test Valora Wallet

**Steps:**
1. Open Valora wallet app
2. Navigate to dApp browser
3. Open your app
4. Check debug panel

**Expected Results:**
```json
{
  "isMiniPay": false,
  "isMobile": true,
  "walletName": "Valora",
  "hasEthereum": true,
  "ethereumFlags": {
    "isValora": true
  }
}
```

**UI Should Show:**
- Button text: "Connect Wallet"
- Valora connection

---

## Manual Testing Checklist

### Pre-Connection Tests
- [ ] Debug panel appears in development mode
- [ ] Correct wallet name detected
- [ ] Mobile/desktop correctly identified
- [ ] Button shows appropriate text
- [ ] No console errors

### Connection Tests
- [ ] Click connect button
- [ ] Wallet prompt appears
- [ ] Connection succeeds
- [ ] Address displays correctly
- [ ] Balance loads correctly
- [ ] Network is correct (Alfajores/Mainnet)

### Post-Connection Tests
- [ ] Can place bets
- [ ] Can create events
- [ ] Can stake tokens
- [ ] Transactions work
- [ ] Can disconnect
- [ ] Can reconnect

### Edge Cases
- [ ] Refresh page while connected
- [ ] Switch accounts in wallet
- [ ] Switch networks
- [ ] Disconnect from wallet side
- [ ] Multiple wallets installed

---

## Debugging Tips

### MiniPay Not Detected

**Check:**
1. Open browser console
2. Type: `window.ethereum`
3. Look for `isMiniPay` property

**If missing:**
- You're not in MiniPay browser
- MiniPay version might be outdated
- Try updating MiniPay app

### Connection Fails

**Check:**
1. Console logs for errors
2. Network connection
3. Correct network (Alfajores/Mainnet)
4. Wallet has CELO tokens

**Common Issues:**
- Wrong network selected
- No gas for transactions
- Wallet locked
- Popup blocked

### Debug Panel Not Showing

**Check:**
1. Running in development mode: `npm run dev`
2. Not in production build
3. Browser console for errors

**Fix:**
```bash
# Ensure dev mode
npm run dev

# Check environment
echo $NODE_ENV
```

---

## Console Commands for Testing

Open browser console and try these:

### Check Ethereum Provider
```javascript
console.log('Ethereum:', window.ethereum);
console.log('Is MiniPay:', window.ethereum?.isMiniPay);
console.log('Is MetaMask:', window.ethereum?.isMetaMask);
console.log('Is Valora:', window.ethereum?.isValora);
```

### Check User Agent
```javascript
console.log('User Agent:', navigator.userAgent);
console.log('Is Mobile:', /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent));
```

### Test Detection Function
```javascript
// Import detection function
import { isMiniPay } from './src/config/wagmi';
console.log('MiniPay Detected:', isMiniPay());
```

---

## Automated Testing

### Unit Tests (Future)

```typescript
describe('MiniPay Detection', () => {
  it('should detect MiniPay when flag is set', () => {
    window.ethereum = { isMiniPay: true };
    expect(isMiniPay()).toBe(true);
  });

  it('should detect mobile device', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      configurable: true,
    });
    expect(isMobileDevice()).toBe(true);
  });

  it('should return correct wallet name', () => {
    window.ethereum = { isMiniPay: true };
    expect(getWalletName()).toBe('MiniPay');
  });
});
```

---

## Environment Variables

No special environment variables needed for detection.

Standard variables:
```env
VITE_CELO_NETWORK=alfajores
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

---

## Troubleshooting

### Issue: Button shows wrong text

**Solution:**
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R)
3. Check debug panel
4. Verify wallet is injecting ethereum

### Issue: Connection hangs

**Solution:**
1. Check network connection
2. Verify wallet is unlocked
3. Check correct network selected
4. Try different connector

### Issue: Debug panel shows wrong info

**Solution:**
1. Refresh page
2. Check console for errors
3. Verify ethereum provider loaded
4. Wait 3 seconds for detection

---

## Performance Monitoring

The detection runs:
- **Immediately** on component mount
- **Every 500ms** for first 3 seconds
- **On ethereum provider change** events

This ensures detection even if wallet injects late.

---

## Browser Compatibility

| Browser | Desktop | Mobile | MiniPay |
|---------|---------|--------|---------|
| Chrome | ✅ | ✅ | N/A |
| Firefox | ✅ | ✅ | N/A |
| Safari | ✅ | ✅ | N/A |
| Brave | ✅ | ✅ | N/A |
| MiniPay | N/A | N/A | ✅ |
| Valora | N/A | ✅ | N/A |

---

## Next Steps

After testing:
1. Document any issues found
2. Test on real devices
3. Gather user feedback
4. Optimize detection timing
5. Add analytics tracking

---

## Support

If you encounter issues:
1. Check debug panel first
2. Review console logs
3. Test in different browsers
4. Open GitHub issue with debug info

---

**Happy Testing! 🚀**
