import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { EventStatus, BettingEvent } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format wallet address to shortened version
 * @param address - Full wallet address
 * @param startChars - Number of characters to show at start (default: 6)
 * @param endChars - Number of characters to show at end (default: 4)
 */
export function formatAddress(
  address: string,
  startChars: number = 6,
  endChars: number = 4
): string {
  if (!address) return "";
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Format CELO amount from wei to human-readable format
 * @param amount - Amount in wei (bigint)
 * @param decimals - Number of decimal places to show (default: 4)
 */
export function formatCelo(amount: bigint, decimals: number = 4): string {
  const celoAmount = Number(amount) / 1e18;
  return celoAmount.toFixed(decimals);
}

/**
 * Format large numbers with K, M, B suffixes
 * @param num - Number to format
 */
export function formatNumber(num: number): string {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toString();
}

/**
 * Format timestamp to relative time (e.g., "2 hours ago")
 * @param timestamp - Unix timestamp in milliseconds
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
}

/**
 * Format countdown timer
 * @param endTime - Unix timestamp in seconds
 */
export function formatCountdown(endTime: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isUrgent: boolean;
  formatted: string;
} {
  const now = Math.floor(Date.now() / 1000);
  const diff = endTime - now;
  
  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isUrgent: false,
      formatted: "Ended",
    };
  }
  
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;
  
  const isUrgent = diff < 3600; // Less than 1 hour
  
  let formatted = "";
  if (days > 0) formatted += `${days}d `;
  if (hours > 0 || days > 0) formatted += `${hours}h `;
  if (minutes > 0 || hours > 0 || days > 0) formatted += `${minutes}m `;
  formatted += `${seconds}s`;
  
  return { days, hours, minutes, seconds, isUrgent, formatted: formatted.trim() };
}

/**
 * Calculate event status based on end time and concluded state
 * @param endTime - Unix timestamp in seconds
 * @param concluded - Whether event has been concluded
 */
export function getEventStatus(endTime: number, concluded: boolean): EventStatus {
  if (concluded) return EventStatus.CONCLUDED;
  
  const now = Math.floor(Date.now() / 1000);
  const timeRemaining = endTime - now;
  
  if (timeRemaining <= 0) return EventStatus.ENDED;
  if (timeRemaining < 3600) return EventStatus.CLOSING_SOON; // Less than 1 hour
  return EventStatus.ACTIVE;
}

/**
 * Calculate odds for an outcome
 * @param outcomeBets - Total bets on this outcome
 * @param totalPool - Total pool for all outcomes
 */
export function calculateOdds(outcomeBets: bigint, totalPool: bigint): number {
  if (totalPool === BigInt(0)) return 0;
  const outcomeAmount = Number(outcomeBets);
  const poolAmount = Number(totalPool);
  
  if (outcomeAmount === 0) return 0;
  
  // Odds = Total Pool / Outcome Bets
  return poolAmount / outcomeAmount;
}

/**
 * Calculate pool percentage for an outcome
 * @param outcomeBets - Total bets on this outcome
 * @param totalPool - Total pool for all outcomes
 */
export function calculatePoolPercentage(outcomeBets: bigint, totalPool: bigint): number {
  if (totalPool === BigInt(0)) return 0;
  const outcomeAmount = Number(outcomeBets);
  const poolAmount = Number(totalPool);
  
  return (outcomeAmount / poolAmount) * 100;
}

/**
 * Calculate potential payout for a bet
 * @param betAmount - Amount being bet
 * @param outcomeBets - Total bets on this outcome
 * @param totalPool - Total pool for all outcomes
 */
export function calculatePayout(
  betAmount: bigint,
  outcomeBets: bigint,
  totalPool: bigint
): bigint {
  if (outcomeBets === BigInt(0)) return betAmount;
  
  // Payout = (BetAmount / (OutcomeBets + BetAmount)) * (TotalPool + BetAmount)
  const newOutcomeBets = outcomeBets + betAmount;
  const newTotalPool = totalPool + betAmount;
  
  return (betAmount * newTotalPool) / newOutcomeBets;
}

/**
 * Generate Celoscan URL for transaction or address
 * @param hashOrAddress - Transaction hash or wallet address
 * @param type - Type of link ('tx' or 'address')
 * @param network - Network ('mainnet' or 'alfajores')
 */
export function getCeloscanUrl(
  hashOrAddress: string,
  type: "tx" | "address" = "tx",
  network: "mainnet" | "alfajores" = "alfajores"
): string {
  const baseUrl =
    network === "mainnet"
      ? "https://celoscan.io"
      : "https://alfajores.celoscan.io";
  
  return `${baseUrl}/${type}/${hashOrAddress}`;
}

/**
 * Validate Ethereum address
 * @param address - Address to validate
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Calculate win rate percentage
 * @param wonBets - Number of won bets
 * @param totalBets - Total number of bets
 */
export function calculateWinRate(wonBets: number, totalBets: number): number {
  if (totalBets === 0) return 0;
  return (wonBets / totalBets) * 100;
}

/**
 * Get user level based on total bets
 * @param totalBets - Total number of bets placed
 */
export function getUserLevel(totalBets: number): string {
  if (totalBets >= 201) return "Expert";
  if (totalBets >= 51) return "Advanced";
  if (totalBets >= 11) return "Intermediate";
  return "Beginner";
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

/**
 * Debounce function
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generate random color for confetti
 */
export function getRandomColor(): string {
  const colors = [
    "#7C3AED", // Purple
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Yellow
    "#EF4444", // Red
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
