import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from 'wagmi';
import { toast } from 'sonner';
import BettingFactoryABI from '@/contracts/abis/BettingFactory.json';

const FACTORY_ADDRESS = import.meta.env.VITE_FACTORY_CONTRACT_ADDRESS as `0x${string}` | undefined;

export const useBettingFactory = () => {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Check if user is admin
  const { data: isAdmin } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: BettingFactoryABI,
    functionName: 'checkIsAdmin',
    args: address ? [address] : undefined,
  } as any);

  // Read all events
  const { data: allEvents, refetch: refetchEvents } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: BettingFactoryABI,
    functionName: 'getAllEvents',
  } as any);

  // Read event count
  const { data: eventCount } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: BettingFactoryABI,
    functionName: 'getEventCount',
  } as any);

  // Create binary event
  const createBinaryEvent = async (
    title: string,
    description: string,
    category: string,
    duration: number,
    outcomes: [string, string]
  ) => {
    if (!FACTORY_ADDRESS) {
      toast.error('Factory contract not configured', {
        description: 'Please set VITE_FACTORY_CONTRACT_ADDRESS in .env',
      });
      return null;
    }

    if (!address) {
      toast.error('Wallet not connected');
      return null;
    }

    if (!isAdmin) {
      toast.error('Admin access required', {
        description: 'Only admins can create events',
      });
      return null;
    }

    try {
      writeContract({
        address: FACTORY_ADDRESS,
        abi: BettingFactoryABI,
        functionName: 'createBinaryEvent',
        args: [title, description, category, BigInt(duration), outcomes],
      } as any);

      return true;
    } catch (error) {
      console.error('Error creating binary event:', error);
      toast.error('Failed to create event', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
      return null;
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
    if (!FACTORY_ADDRESS) {
      toast.error('Factory contract not configured', {
        description: 'Please set VITE_FACTORY_CONTRACT_ADDRESS in .env',
      });
      return null;
    }

    if (!address) {
      toast.error('Wallet not connected');
      return null;
    }

    if (!isAdmin) {
      toast.error('Admin access required', {
        description: 'Only admins can create events',
      });
      return null;
    }

    if (outcomes.length < 3 || outcomes.length > 10) {
      toast.error('Invalid outcome count', {
        description: 'Multiple outcome events must have 3-10 outcomes',
      });
      return null;
    }

    try {
      writeContract({
        address: FACTORY_ADDRESS,
        abi: BettingFactoryABI,
        functionName: 'createMultipleOutcomeEvent',
        args: [title, description, category, BigInt(duration), outcomes],
      } as any);

      return true;
    } catch (error) {
      console.error('Error creating multiple outcome event:', error);
      toast.error('Failed to create event', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
      return null;
    }
  };

  // Listen for EventCreated events
  const useEventCreatedListener = (onEventCreated: (eventAddress: string, eventType: string, category: string, endTime: bigint) => void) => {
    useWatchContractEvent({
      address: FACTORY_ADDRESS,
      abi: BettingFactoryABI,
      eventName: 'EventCreated',
      onLogs(logs) {
        logs.forEach((log: any) => {
          const { eventAddress, eventType, category, endTime } = log.args;
          onEventCreated(eventAddress, eventType, category, endTime);
        });
      },
    } as any);
  };

  return {
    // State
    isAdmin: Boolean(isAdmin),
    allEvents: (allEvents as string[]) || [],
    eventCount: eventCount ? Number(eventCount) : 0,
    factoryAddress: FACTORY_ADDRESS,
    
    // Actions
    createBinaryEvent,
    createMultipleOutcomeEvent,
    refetchEvents,
    
    // Transaction state
    isPending: isPending || isConfirming,
    isSuccess,
    transactionHash: hash,
    error: writeError,
    
    // Listeners
    useEventCreatedListener,
  };
};
