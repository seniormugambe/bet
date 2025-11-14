import { useEffect } from 'react';
import { useBettingStore } from '@/store';
import { BettingEvent, EventType, EventStatus } from '@/types';

// Mock events for testing
const mockEvents: BettingEvent[] = [
  {
    address: '0x1234567890123456789012345678901234567890',
    title: 'Will Bitcoin reach $100k by end of 2024?',
    description: 'Place your bets on whether Bitcoin will hit the $100,000 mark before December 31, 2024.',
    category: 'Crypto',
    eventType: EventType.BINARY,
    endTime: Math.floor(Date.now() / 1000) + 86400 * 30, // 30 days from now
    totalPool: BigInt('5000000000000000000'), // 5 CELO
    outcomes: [
      {
        index: 0,
        label: 'Yes',
        totalBets: BigInt('3000000000000000000'), // 3 CELO
        bettorCount: 15,
        odds: 1.67,
        poolPercentage: 60,
      },
      {
        index: 1,
        label: 'No',
        totalBets: BigInt('2000000000000000000'), // 2 CELO
        bettorCount: 10,
        odds: 2.5,
        poolPercentage: 40,
      },
    ],
    status: EventStatus.ACTIVE,
    concluded: false,
    participantCount: 25,
  },
  {
    address: '0x2345678901234567890123456789012345678901',
    title: 'Who will win the Champions League?',
    description: 'Predict the winner of this year\'s UEFA Champions League tournament.',
    category: 'Sports',
    eventType: EventType.MULTIPLE,
    endTime: Math.floor(Date.now() / 1000) + 86400 * 7, // 7 days from now
    totalPool: BigInt('10000000000000000000'), // 10 CELO
    outcomes: [
      {
        index: 0,
        label: 'Real Madrid',
        totalBets: BigInt('4000000000000000000'),
        bettorCount: 20,
        odds: 2.5,
        poolPercentage: 40,
      },
      {
        index: 1,
        label: 'Manchester City',
        totalBets: BigInt('3000000000000000000'),
        bettorCount: 15,
        odds: 3.33,
        poolPercentage: 30,
      },
      {
        index: 2,
        label: 'Bayern Munich',
        totalBets: BigInt('2000000000000000000'),
        bettorCount: 10,
        odds: 5,
        poolPercentage: 20,
      },
      {
        index: 3,
        label: 'Other',
        totalBets: BigInt('1000000000000000000'),
        bettorCount: 5,
        odds: 10,
        poolPercentage: 10,
      },
    ],
    status: EventStatus.CLOSING_SOON,
    concluded: false,
    participantCount: 50,
  },
  {
    address: '0x3456789012345678901234567890123456789012',
    title: 'Will it rain tomorrow in San Francisco?',
    description: 'Bet on whether there will be measurable rainfall in San Francisco tomorrow.',
    category: 'Weather',
    eventType: EventType.BINARY,
    endTime: Math.floor(Date.now() / 1000) + 86400, // 1 day from now
    totalPool: BigInt('2000000000000000000'), // 2 CELO
    outcomes: [
      {
        index: 0,
        label: 'Yes',
        totalBets: BigInt('800000000000000000'),
        bettorCount: 8,
        odds: 2.5,
        poolPercentage: 40,
      },
      {
        index: 1,
        label: 'No',
        totalBets: BigInt('1200000000000000000'),
        bettorCount: 12,
        odds: 1.67,
        poolPercentage: 60,
      },
    ],
    status: EventStatus.ACTIVE,
    concluded: false,
    participantCount: 20,
  },
  {
    address: '0x4567890123456789012345678901234567890123',
    title: 'Next US President 2024',
    description: 'Who will win the 2024 US Presidential Election?',
    category: 'Politics',
    eventType: EventType.MULTIPLE,
    endTime: Math.floor(Date.now() / 1000) + 86400 * 60, // 60 days from now
    totalPool: BigInt('15000000000000000000'), // 15 CELO
    outcomes: [
      {
        index: 0,
        label: 'Candidate A',
        totalBets: BigInt('7000000000000000000'),
        bettorCount: 35,
        odds: 2.14,
        poolPercentage: 47,
      },
      {
        index: 1,
        label: 'Candidate B',
        totalBets: BigInt('6000000000000000000'),
        bettorCount: 30,
        odds: 2.5,
        poolPercentage: 40,
      },
      {
        index: 2,
        label: 'Other',
        totalBets: BigInt('2000000000000000000'),
        bettorCount: 10,
        odds: 7.5,
        poolPercentage: 13,
      },
    ],
    status: EventStatus.ACTIVE,
    concluded: false,
    participantCount: 75,
  },
  {
    address: '0x5678901234567890123456789012345678901234',
    title: 'Will GTA 6 release in 2025?',
    description: 'Bet on whether Grand Theft Auto 6 will be released before the end of 2025.',
    category: 'Gaming',
    eventType: EventType.BINARY,
    endTime: Math.floor(Date.now() / 1000) + 86400 * 90, // 90 days from now
    totalPool: BigInt('8000000000000000000'), // 8 CELO
    outcomes: [
      {
        index: 0,
        label: 'Yes',
        totalBets: BigInt('5000000000000000000'),
        bettorCount: 40,
        odds: 1.6,
        poolPercentage: 62.5,
      },
      {
        index: 1,
        label: 'No',
        totalBets: BigInt('3000000000000000000'),
        bettorCount: 20,
        odds: 2.67,
        poolPercentage: 37.5,
      },
    ],
    status: EventStatus.ACTIVE,
    concluded: false,
    participantCount: 60,
  },
];

export const useMockEvents = () => {
  const { setEvents, events } = useBettingStore();

  useEffect(() => {
    // Only load mock events if store is empty
    if (events.length === 0) {
      setEvents(mockEvents);
    }
  }, [setEvents, events.length]);
};
