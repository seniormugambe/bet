import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  BettingEvent,
  UserBet,
  UserStats,
  UIState,
  Notification,
  EventCategory,
  UserProfile,
  Badge,
  UserLevel,
  StakeInfo,
  StakingStats,
} from '@/types';

interface BettingStore {
  // Events State
  events: BettingEvent[];
  selectedEvent: BettingEvent | null;
  
  // User Bets State
  userBets: UserBet[];
  
  // User Profile State
  userProfile: UserProfile | null;
  
  // Staking State
  userStake: StakeInfo | null;
  stakingStats: StakingStats | null;
  
  // UI State
  ui: UIState;
  
  // Notifications State
  notifications: Notification[];
  
  // Events Actions
  setEvents: (events: BettingEvent[]) => void;
  addEvent: (event: BettingEvent) => void;
  updateEvent: (address: string, updates: Partial<BettingEvent>) => void;
  setSelectedEvent: (event: BettingEvent | null) => void;
  
  // User Bets Actions
  addUserBet: (bet: UserBet) => void;
  updateUserBet: (id: string, updates: Partial<UserBet>) => void;
  setUserBets: (bets: UserBet[]) => void;
  
  // User Profile Actions
  setUserProfile: (profile: UserProfile) => void;
  updateUserStats: (stats: Partial<UserStats>) => void;
  unlockBadge: (badgeId: string) => void;
  
  // Staking Actions
  setUserStake: (stake: StakeInfo | null) => void;
  setStakingStats: (stats: StakingStats) => void;
  
  // UI Actions
  setSelectedCategory: (category: EventCategory | 'All') => void;
  setSoundEnabled: (enabled: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Notifications Actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  
  // Selectors
  getActiveEvents: () => BettingEvent[];
  getEventsByCategory: (category: EventCategory) => BettingEvent[];
  getActiveBets: () => UserBet[];
  getCompletedBets: () => UserBet[];
  getUserStats: () => UserStats;
  getUserParticipatedEvents: () => BettingEvent[];
}

export const useBettingStore = create<BettingStore>()(
  persist(
    (set, get) => ({
      // Initial State
      events: [],
      selectedEvent: null,
      userBets: [],
      userProfile: null,
      userStake: null,
      stakingStats: null,
      ui: {
        isSoundEnabled: false,
        selectedCategory: 'All',
        isLoading: false,
        error: null,
      },
      notifications: [],

      // Events Actions
      setEvents: (events) => set({ events }),
      
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, event],
        })),
      
      updateEvent: (address, updates) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.address === address ? { ...event, ...updates } : event
          ),
        })),
      
      setSelectedEvent: (event) => set({ selectedEvent: event }),

      // User Bets Actions
      addUserBet: (bet) =>
        set((state) => ({
          userBets: [...state.userBets, bet],
        })),
      
      updateUserBet: (id, updates) =>
        set((state) => ({
          userBets: state.userBets.map((bet) =>
            bet.id === id ? { ...bet, ...updates } : bet
          ),
        })),
      
      setUserBets: (bets) => set({ userBets: bets }),

      // User Profile Actions
      setUserProfile: (profile) => set({ userProfile: profile }),
      
      updateUserStats: (stats) =>
        set((state) => ({
          userProfile: state.userProfile
            ? {
                ...state.userProfile,
                stats: { ...state.userProfile.stats, ...stats },
              }
            : null,
        })),
      
      unlockBadge: (badgeId) =>
        set((state) => ({
          userProfile: state.userProfile
            ? {
                ...state.userProfile,
                badges: state.userProfile.badges.map((badge) =>
                  badge.id === badgeId
                    ? { ...badge, unlocked: true, unlockedAt: Date.now() }
                    : badge
                ),
              }
            : null,
        })),

      // Staking Actions
      setUserStake: (stake) => set({ userStake: stake }),
      
      setStakingStats: (stats) => set({ stakingStats: stats }),

      // UI Actions
      setSelectedCategory: (category) =>
        set((state) => ({
          ui: { ...state.ui, selectedCategory: category },
        })),
      
      setSoundEnabled: (enabled) =>
        set((state) => ({
          ui: { ...state.ui, isSoundEnabled: enabled },
        })),
      
      setLoading: (loading) =>
        set((state) => ({
          ui: { ...state.ui, isLoading: loading },
        })),
      
      setError: (error) =>
        set((state) => ({
          ui: { ...state.ui, error },
        })),

      // Notifications Actions
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: `${Date.now()}-${Math.random()}`,
              timestamp: Date.now(),
              read: false,
            },
            ...state.notifications,
          ],
        })),
      
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((notif) =>
            notif.id === id ? { ...notif, read: true } : notif
          ),
        })),
      
      clearNotifications: () => set({ notifications: [] }),

      // Selectors
      getActiveEvents: () => {
        const { events } = get();
        return events.filter(
          (event) => event.status === 'active' || event.status === 'closing_soon'
        );
      },
      
      getEventsByCategory: (category) => {
        const { events } = get();
        return events.filter((event) => event.category === category);
      },
      
      getActiveBets: () => {
        const { userBets } = get();
        return userBets.filter(
          (bet) => bet.status === 'active' || bet.status === 'pending'
        );
      },
      
      getCompletedBets: () => {
        const { userBets } = get();
        return userBets.filter(
          (bet) => bet.status === 'won' || bet.status === 'lost'
        );
      },
      
      getUserStats: () => {
        const { userProfile } = get();
        if (!userProfile) {
          return {
            totalBets: 0,
            activeBets: 0,
            wonBets: 0,
            lostBets: 0,
            totalWagered: BigInt(0),
            totalWinnings: BigInt(0),
            winRate: 0,
          };
        }
        return userProfile.stats;
      },
      
      getUserParticipatedEvents: () => {
        const { events, userBets } = get();
        const eventAddresses = new Set(userBets.map(bet => bet.eventAddress));
        return events.filter(event => eventAddresses.has(event.address));
      },
    }),
    {
      name: 'betting-store',
      partialize: (state) => ({
        ui: {
          isSoundEnabled: state.ui.isSoundEnabled,
          selectedCategory: state.ui.selectedCategory,
        },
        userBets: state.userBets,
      }),
    }
  )
);
