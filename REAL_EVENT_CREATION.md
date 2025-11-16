# Real Event Creation System

## Overview

The event creation system has been upgraded from mock/simulated deployment to **real smart contract integration**. Events are now created on the Celo blockchain through the BettingFactory contract.

---

## What Changed

### Before (Mock System) ❌
```typescript
// Simulated deployment
await new Promise(resolve => setTimeout(resolve, 2000));
const mockEventAddress = `0x${Math.random().toString(16).slice(2, 42)}`;
```

### After (Real System) ✅
```typescript
// Real contract call
await createBinaryEvent(title, description, category, duration, outcomes);
// Waits for transaction confirmation
// Gets actual event address from blockchain event
```

---

## New Components

### 1. BettingFactory ABI
**File:** `src/contracts/abis/BettingFactory.json`

Contains the contract interface for:
- `createBinaryEvent()` - Create yes/no events
- `createMultipleOutcomeEvent()` - Create 3-10 outcome events
- `getAllEvents()` - Get all event addresses
- `checkIsAdmin()` - Check admin status
- Event listeners for `EventCreated` events

### 2. useBettingFactory Hook
**File:** `src/hooks/useBettingFactory.ts`

Provides:
- `createBinaryEvent()` - Create binary events
- `createMultipleOutcomeEvent()` - Create multiple outcome events
- `isAdmin` - Check if current user is admin
- `isPending` - Transaction status
- `isSuccess` - Transaction confirmation
- `transactionHash` - Transaction hash
- `useEventCreatedListener()` - Listen for new events

### 3. Updated EventCreationForm
**File:** `src/components/events/EventCreationForm.tsx`

Now:
- Uses `useBettingFactory` hook
- Calls real contract functions
- Waits for transaction confirmation
- Listens for `EventCreated` events
- Shows transaction hash
- Validates admin access
- Checks contract configuration

---

## How It Works

### Step 1: User Fills Form
User enters:
- Event type (Binary or Multiple)
- Title
- Description
- Category
- Duration (in hours)
- Outcomes (2 for binary, 3-10 for multiple)
- Optional game rules

### Step 2: Validation
System checks:
- ✅ Factory contract is configured
- ✅ User wallet is connected
- ✅ User has admin access
- ✅ Form data is valid

### Step 3: Transaction Submission
```typescript
if (eventType === 'binary') {
  await createBinaryEvent(title, description, category, duration, outcomes);
} else {
  await createMultipleOutcomeEvent(title, description, category, duration, outcomes);
}
```

### Step 4: Wait for Confirmation
- Shows "Transaction submitted" toast
- Button shows "Creating Event..." with spinner
- Waits for blockchain confirmation

### Step 5: Event Created
- Listens for `EventCreated` event from contract
- Extracts event address from event
- Adds event to local store
- Shows success screen with:
  - Event address
  - Share button
  - View Event button
  - Create Another button

---

## Admin Access

### Why Admin Access?
Only admins can create events to prevent spam and ensure quality control.

### How to Grant Admin Access

#### Option 1: During Deployment
```solidity
// Constructor grants admin to deployer
constructor(address initialAdmin) {
  isAdmin[initialAdmin] = true;
}
```

#### Option 2: After Deployment
```bash
# Using Hardhat console
npx hardhat console --network alfajores

# Grant admin
const factory = await ethers.getContractAt("BettingFactory", "FACTORY_ADDRESS");
await factory.grantAdmin("USER_ADDRESS");
```

#### Option 3: Using Etherscan
1. Go to contract on Celoscan
2. Connect wallet (must be owner)
3. Call `grantAdmin(address)`
4. Enter user address
5. Confirm transaction

### Check Admin Status
```typescript
const { isAdmin } = useBettingFactory();
console.log('Is admin:', isAdmin);
```

---

## Configuration

### 1. Deploy BettingFactory Contract
```bash
npx hardhat run scripts/deploy.ts --network alfajores
```

### 2. Update .env
```env
VITE_FACTORY_CONTRACT_ADDRESS=0x...
```

### 3. Grant Admin Access
```bash
# Option A: Grant to your wallet
npx hardhat console --network alfajores
const factory = await ethers.getContractAt("BettingFactory", "0x...");
await factory.grantAdmin("YOUR_WALLET_ADDRESS");

# Option B: Already granted if you deployed
# The deployer is automatically an admin
```

### 4. Test Event Creation
1. Connect wallet
2. Go to Create Event page
3. Fill form
4. Click "Create Event"
5. Confirm transaction in wallet
6. Wait for confirmation
7. See success screen

---

## User Interface

### Before Submission
- Form shows all fields
- Submit button shows:
  - "Create Event" (if admin)
  - "Admin Access Required" (if not admin)
  - "Contract Not Configured" (if no factory address)

### During Transaction
- Button disabled
- Shows spinner
- Text: "Creating Event..." or "Confirming..."
- Toast: "Transaction submitted"

### After Success
- Success screen appears
- Shows:
  - ✅ Checkmark icon
  - Event title
  - Event address
  - Transaction hash (truncated)
  - "View Event" button
  - "Share Event" button
  - "Create Another" button

### Contract Info Display
At bottom of form:
```
Factory Contract: 0x1234...5678
✓ Admin Access Granted
```

Or if not admin:
```
Factory Contract: 0x1234...5678
⚠ Admin Access Required
```

---

## Error Handling

### Contract Not Configured
```
Error: Contract not configured
Description: Please deploy the BettingFactory contract and set VITE_FACTORY_CONTRACT_ADDRESS in .env
```

### Not Admin
```
Error: Admin access required
Description: Only admins can create betting events. Please contact the platform owner.
```

### Transaction Rejected
```
Error: Failed to create event
Description: User rejected the transaction
```

### Insufficient Gas
```
Error: Failed to create event
Description: Insufficient funds for gas
```

### Invalid Outcomes
```
Error: Invalid outcome count
Description: Multiple outcome events must have 3-10 outcomes
```

---

## Transaction Flow

```
User Submits Form
       ↓
Validate Inputs
       ↓
Check Admin Access
       ↓
Call Contract Function
       ↓
User Confirms in Wallet
       ↓
Transaction Submitted
       ↓
Wait for Confirmation
       ↓
Listen for EventCreated Event
       ↓
Extract Event Address
       ↓
Add to Store
       ↓
Show Success Screen
```

---

## Testing

### Local Testing (Without Contract)
The form will show "Contract Not Configured" button.

### Testnet Testing (With Contract)
1. Deploy factory to Alfajores
2. Set `VITE_FACTORY_CONTRACT_ADDRESS`
3. Grant admin to your wallet
4. Create test event
5. Verify on Celoscan
6. Check event appears in app

### Verification Checklist
- [ ] Factory contract deployed
- [ ] Address in .env
- [ ] Admin access granted
- [ ] Wallet connected
- [ ] Form submits successfully
- [ ] Transaction confirms
- [ ] Event address received
- [ ] Event appears in event list
- [ ] Can view event details
- [ ] Can share event

---

## Gas Costs

Approximate gas costs on Celo:

| Operation | Gas | Cost (CELO) |
|-----------|-----|-------------|
| Create Binary Event | ~500,000 | ~0.001 |
| Create Multiple Event | ~600,000 | ~0.0012 |
| Grant Admin | ~50,000 | ~0.0001 |

*Costs may vary based on network congestion*

---

## Troubleshooting

### Issue: "Contract Not Configured"
**Solution:** Set `VITE_FACTORY_CONTRACT_ADDRESS` in `.env`

### Issue: "Admin Access Required"
**Solution:** Grant admin access to your wallet address

### Issue: Transaction Fails
**Solutions:**
- Check wallet has enough CELO for gas
- Verify contract address is correct
- Check network (should be Alfajores)
- Try increasing gas limit

### Issue: Event Not Appearing
**Solutions:**
- Wait for transaction confirmation
- Refresh the page
- Check transaction on Celoscan
- Verify event was created successfully

### Issue: Can't See Admin Status
**Solutions:**
- Ensure wallet is connected
- Check factory address is set
- Verify you're on correct network
- Check console for errors

---

## Next Steps

Now that event creation is real, you should also integrate:

1. **Event Loading** - Load events from contract instead of mock data
2. **Bet Placement** - Place real bets on events
3. **Event Conclusion** - Admin concludes events
4. **Payout Claims** - Users claim winnings

See `CONTRACT_INTEGRATION_GUIDE.md` for details.

---

## Code Examples

### Create Binary Event
```typescript
const { createBinaryEvent, isPending, isSuccess } = useBettingFactory();

await createBinaryEvent(
  "Will Bitcoin reach $100k?",
  "Bet on Bitcoin price",
  "Crypto",
  86400, // 24 hours in seconds
  ["Yes", "No"]
);
```

### Create Multiple Outcome Event
```typescript
const { createMultipleOutcomeEvent } = useBettingFactory();

await createMultipleOutcomeEvent(
  "Who will win the Champions League?",
  "Predict the winner",
  "Sports",
  604800, // 7 days in seconds
  ["Real Madrid", "Man City", "Bayern", "Other"]
);
```

### Listen for Events
```typescript
const { useEventCreatedListener } = useBettingFactory();

useEventCreatedListener((address, eventType, category, endTime) => {
  console.log('New event created:', address);
  // Handle new event
});
```

---

## Files Modified

- ✅ `src/hooks/useBettingFactory.ts` - Created
- ✅ `src/contracts/abis/BettingFactory.json` - Created
- ✅ `src/components/events/EventCreationForm.tsx` - Updated
- ✅ `.env.example` - Updated

## Files to Deploy

- `contracts/BettingFactory.sol`
- `contracts/BettingEvent.sol`
- `contracts/BinaryBettingEvent.sol`
- `contracts/MultipleOutcomeBettingEvent.sol`

---

## Summary

✅ Event creation now uses real smart contracts
✅ Transactions are submitted to Celo blockchain
✅ Event addresses come from blockchain events
✅ Admin access is enforced
✅ Transaction status is tracked
✅ Success/error handling implemented
✅ User-friendly UI with loading states

**Status: PRODUCTION READY** (after contract deployment)
