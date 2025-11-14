// Wallet Types
export interface WalletState {
  address: string | null;
  balance: bigint;
  chainId: number;
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;
}

// Event Types
export enum EventType {
  BINARY = 'binary',
  MULTIPLE = 'multiple'
}

export enum EventStatus {
  ACTIVE = 'active',
  CLOSING_SOON = 'closing_soon',
  ENDED = 'ended',
  CONCLUDED = 'concluded'
}

export interface Outcome {
  index: number;
  label: string;
  totalBets: bigint;
  bettorCount: number;
  odds: number; // Calculated on frontend
  poolPercentage: number; // Calculated on frontend
}

export interface BettingEvent {
  address: string;
  title: string;
  description: string;
  category: string;
  eventType: EventType;
  endTime: number; // Unix timestamp
  totalPool: bigint;
  outcomes: Outcome[];
  status: EventStatus;
  concluded: boolean;
  winningOutcome?: number;
  participantCount: number;
}

// Bet Types
export enum BetStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  WON = 'won',
  LOST = 'lost'
}

export interface UserBet {
  id: string; // Transaction hash
  eventAddress: string;
  eventTitle: string;
  outcomeIndex: number;
  outcomeLabel: string;
  amount: bigint;
  potentialPayout: bigint;
  actualPayout?: bigint;
  timestamp: number;
  status: BetStatus;
  transactionHash: string;
}

// User Stats Types
export interface UserStats {
  totalBets: number;
  activeBets: number;
  wonBets: number;
  lostBets: number;
  totalWagered: bigint;
  totalWinnings: bigint;
  winRate: number; // Percentage
  rank?: number;
}

// Transaction Types
export interface Transaction {
  hash: string;
  type: 'bet' | 'payout' | 'create_event';
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
  amount?: bigint;
  eventAddress?: string;
}

// Category Types
export type EventCategory = 
  | 'Sports'
  | 'Politics'
  | 'Entertainment'
  | 'Crypto'
  | 'Weather'
  | 'Gaming'
  | 'Other';

// Form Types
export interface CreateEventFormData {
  eventType: EventType;
  title: string;
  description: string;
  category: EventCategory;
  duration: number; // in seconds
  outcomes: string[];
}

// Achievement Types
export enum UserLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface UserProfile {
  address: string;
  level: UserLevel;
  stats: UserStats;
  badges: Badge[];
}

// UI State Types
export interface UIState {
  isSoundEnabled: boolean;
  selectedCategory: EventCategory | 'All';
  isLoading: boolean;
  error: string | null;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}
