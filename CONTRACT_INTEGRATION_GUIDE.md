# Smart Contract Integration Guide

This guide will help you integrate the betting smart contracts with the frontend.

## Prerequisites

1. Contracts deployed to Alfajores testnet
2. Contract addresses saved in `.env`
3. Hardhat compiled contracts (ABIs available)

---

## Step 1: Extract Contract ABIs

### 1.1 Compile Contracts
```bash
npx hardhat compile
```

### 1.2 Create ABI Directory
```bash
mkdir -p src/contracts/abis
```

### 1.3 Extract ABIs

Create a script to extract ABIs:

```bash
# scripts/extract-abis.js
const fs = require('fs');
const path = require('path');

const contracts = [
  'BettingFactory',
  'BettingEvent',
  'BinaryBettingEvent',
  'MultipleOutcomeBettingEvent',
];

contracts.forEach(contractName => {
  const artifactPath = path.join(
    __dirname,
    `../artifacts/contracts/${contractName}.sol/${contractName}.json`
  );
  
  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
  const abi = artifact.abi;
  
  const outputPath = path.join(
    __dirname,
    `../src/contracts/abis/${contractName}.json`
  );
  
  fs.writeFileSync(outputPath, JSON.stringify(abi, null, 2));
  console.log(`✅ Extracted ABI for ${contractName}`);
});
```

Run it:
```bash
node scripts/extract-abis.js
```

---

## Step 2: Create Contract Hooks

### 2.1 Create `useBettingFactory` Hook

```typescript
// src/hooks/useBettingFactory.ts
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import BettingFactoryABI from '@/contracts/abis/BettingFactory.json';

const FACTORY_ADDRESS = import.meta.env.VITE_FACTORY_CONTRACT_ADDRESS as `0x${string}`;

export const useBettingFactory = () => {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Read all events
  const { data: allEvents, refetch: refetchEvents } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: BettingFactoryABI,
    functionName: 'getAllEvents',
  } as any);

  // Create binary event
  const createBinaryEvent = async (
    title: string,
    description: string,
    category: string,
    duration: number,
    outcomes: [string, string]
  ) => {
    try {
      writeContract({
        address: FACTORY_ADDRESS,
        abi: BettingFactoryABI,
        functionName: 'createBinaryEvent',
        args: [title, description, category, duration, outcomes],
      } as any);
      return true;
    } catch (error) {
      console.error('Error creating binary event:', error);
      return false;
    }
  };

  // Create multiple outcome event
  const createMultipleOutcomeEvent = async (
    title: string,
    description: string,
    category: string,
    duration: number,
    outcomes: string[]
  ) => {
    try {
      writeContract({
        address: FACTORY_ADDRESS,
        abi: BettingFactoryABI,
        functionName: 'createMultipleOutcomeEvent',
        args: [title, description, category, duration, outcomes],
      } as any);
      return true;
    } catch (error) {
      console.error('Error creating multiple outcome event:', error);
      return false;
    }
  };

  return {
    allEvents: (allEvents as string[]) || [],
    createBinaryEvent,
    createMultipleOutcomeEvent,
    refetchEvents,
    isPending: isPending || isConfirming,
    isSuccess,
    transactionHash: hash,
  };
};
```

### 2.2 Create `useBettingEvent` Hook

```typescript
// src/hooks/useBettingEvent.ts
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import BettingEventABI from '@/contracts/abis/BettingEvent.json';

export const useBettingEvent = (eventAddress: `0x${string}`) => {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Read event details
  const { data: eventDetails } = useReadContract({
    address: eventAddress,
    abi: BettingEventABI,
    functionName: 'getEventDetails',
  } as any);

  // Read outcomes
  const { data: outcomes } = useReadContract({
    address: eventAddress,
    abi: BettingEventABI,
    functionName: 'getOutcomes',
  } as any);

  // Read total pool
  const { data: totalPool } = useReadContract({
    address: eventAddress,
    abi: BettingEventABI,
    functionName: 'totalPool',
  } as any);

  // Place bet
  const placeBet = async (outcomeIndex: number, amount: string) => {
    try {
      const amountWei = parseEther(amount);
      
      writeContract({
        address: eventAddress,
        abi: BettingEventABI,
        functionName: 'placeBet',
        args: [outcomeIndex],
        value: amountWei,
      } as any);
      
      return true;
    } catch (error) {
      console.error('Error placing bet:', error);
      return false;
    }
  };

  // Claim payout
  const claimPayout = async () => {
    try {
      writeContract({
        address: eventAddress,
        abi: BettingEventABI,
        functionName: 'claimPayout',
      } as any);
      
      return true;
    } catch (error) {
      console.error('Error claiming payout:', error);
      return false;
    }
  };

  return {
    eventDetails,
    outcomes,
    totalPool,
    placeBet,
    claimPayout,
    isPending: isPending || isConfirming,
    isSuccess,
    transactionHash: hash,
  };
};
```

---

## Step 3: Update Event Creation Form

Replace mock implementation in `EventCreationForm.tsx`:

```typescript
// Add import
import { useBettingFactory } from '@/hooks/useBettingFactory';
import { useWaitForTransactionReceipt } from 'wagmi';

// Inside component
const { 
  createBinaryEvent, 
  createMultipleOutcomeEvent,
  isPending,
  isSuccess,
  transactionHash 
} = useBettingFactory();

// Update onSubmit
const onSubmit = async (values: FormValues) => {
  setIsCreating(true);
  
  try {
    let success = false;
    
    if (values.eventType === 'binary') {
      success = await createBinaryEvent(
        values.title,
        values.description,
        values.category,
        values.duration * 3600, // Convert hours to seconds
        [values.outcomes[0], values.outcomes[1]]
      );
    } else {
      success = await createMultipleOutcomeEvent(
        values.title,
        values.description,
        values.category,
        values.duration * 3600,
        values.outcomes
      );
    }
    
    if (success && transactionHash) {
      toast.success('Event created successfully!', {
        description: `Transaction: ${transactionHash}`,
      });
      
      // Wait a bit for the transaction to be mined
      setTimeout(() => {
        // Redirect or show success
        setCreatedEvent({
          address: transactionHash, // You'll need to get actual address from event
          title: values.title,
        });
      }, 3000);
    }
  } catch (error) {
    console.error('Error creating event:', error);
    toast.error('Failed to create event');
  } finally {
    setIsCreating(false);
  }
};
```

---

## Step 4: Update Bet Placement Modal

Replace mock implementation in `BetPlacementModal.tsx`:

```typescript
// Add import
import { useBettingEvent } from '@/hooks/useBettingEvent';

// Inside component
const { placeBet, isPending, isSuccess, transactionHash } = useBettingEvent(
  event.address as `0x${string}`
);

// Update handlePlaceBet
const handlePlaceBet = async () => {
  if (!address || betAmountBigInt === BigInt(0)) return;

  if (balance && betAmountBigInt > balance.value) {
    toast.error('Insufficient balance');
    return;
  }

  setIsPlacingBet(true);

  try {
    const success = await placeBet(outcomeIndex, betAmount);
    
    if (success && transactionHash) {
      // Create bet record
      const newBet: UserBet = {
        id: transactionHash,
        eventAddress: event.address,
        eventTitle: event.title,
        outcomeIndex,
        outcomeLabel: outcome.label,
        amount: betAmountBigInt,
        potentialPayout,
        timestamp: Date.now(),
        status: BetStatus.ACTIVE,
        transactionHash,
      };

      addUserBet(newBet);
      setPlacedBet(newBet);

      toast.success('Bet placed successfully!', {
        description: `Transaction: ${transactionHash}`,
      });

      setShowCelebration(true);
    }
  } catch (error) {
    console.error('Error placing bet:', error);
    toast.error('Failed to place bet');
  } finally {
    setIsPlacingBet(false);
  }
};
```

---

## Step 5: Load Real Events

Create a new hook to replace `useMockEvents`:

```typescript
// src/hooks/useLoadEvents.ts
import { useEffect } from 'react';
import { useBettingStore } from '@/store';
import { useBettingFactory } from './useBettingFactory';
import { useBettingEvent } from './useBettingEvent';
import { BettingEvent, EventType, EventStatus } from '@/types';

export const useLoadEvents = () => {
  const { allEvents } = useBettingFactory();
  const { setEvents } = useBettingStore();

  useEffect(() => {
    if (!allEvents || allEvents.length === 0) return;

    // Load details for each event
    const loadEventDetails = async () => {
      const eventPromises = allEvents.map(async (eventAddress) => {
        // Query each event contract for details
        // This is a simplified version - you'll need to implement proper querying
        const eventData: BettingEvent = {
          address: eventAddress,
          // ... fetch other details from contract
        };
        return eventData;
      });

      const events = await Promise.all(eventPromises);
      setEvents(events);
    };

    loadEventDetails();
  }, [allEvents, setEvents]);
};
```

Then use it in your app:

```typescript
// src/App.tsx or main component
import { useLoadEvents } from '@/hooks/useLoadEvents';

function App() {
  useLoadEvents(); // Replace useMockEvents()
  
  return (
    // ... your app
  );
}
```

---

## Step 6: Add Event Listeners

Listen for contract events in real-time:

```typescript
// src/hooks/useEventListeners.ts
import { useWatchContractEvent } from 'wagmi';
import BettingFactoryABI from '@/contracts/abis/BettingFactory.json';
import { useBettingStore } from '@/store';

const FACTORY_ADDRESS = import.meta.env.VITE_FACTORY_CONTRACT_ADDRESS as `0x${string}`;

export const useEventListeners = () => {
  const { addEvent, updateEvent } = useBettingStore();

  // Listen for new events
  useWatchContractEvent({
    address: FACTORY_ADDRESS,
    abi: BettingFactoryABI,
    eventName: 'EventCreated',
    onLogs(logs) {
      logs.forEach((log) => {
        console.log('New event created:', log);
        // Fetch event details and add to store
      });
    },
  } as any);

  // Listen for bets placed
  // Listen for events concluded
  // etc.
};
```

---

## Step 7: Testing Checklist

### Local Testing
- [ ] Compile contracts successfully
- [ ] Extract ABIs correctly
- [ ] Hooks import without errors
- [ ] TypeScript compiles

### Testnet Testing
- [ ] Deploy contracts to Alfajores
- [ ] Update .env with addresses
- [ ] Connect wallet successfully
- [ ] Create binary event
- [ ] Create multiple outcome event
- [ ] Place bet on event
- [ ] View event details
- [ ] Claim payout (after conclusion)

### Error Handling
- [ ] Handle insufficient balance
- [ ] Handle rejected transactions
- [ ] Handle network errors
- [ ] Show loading states
- [ ] Show success messages
- [ ] Show error messages

---

## Common Issues & Solutions

### Issue 1: ABI Type Errors
**Solution:** Use `as any` for now, or generate proper types with `wagmi-cli`

### Issue 2: Transaction Reverts
**Solution:** Check contract requirements (minimum bet, event status, etc.)

### Issue 3: Events Not Loading
**Solution:** Ensure contract addresses are correct in .env

### Issue 4: Gas Estimation Fails
**Solution:** Add more CELO to your wallet for gas

---

## Next Steps

1. Follow this guide step by step
2. Test each component individually
3. Deploy to testnet and test end-to-end
4. Fix any issues that arise
5. Add proper error handling
6. Optimize performance
7. Deploy to mainnet

---

## Resources

- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)
- [Celo Documentation](https://docs.celo.org/)
- [Hardhat Documentation](https://hardhat.org/)

---

## Support

If you encounter issues:
1. Check the console for errors
2. Verify contract addresses
3. Ensure wallet has enough CELO
4. Check network connection
5. Review transaction on Celoscan
