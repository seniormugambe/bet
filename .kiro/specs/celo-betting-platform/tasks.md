# Implementation Plan

- [x] 1. Set up Hardhat and smart contract development environment
  - Install Hardhat and required dependencies (@nomicfoundation/hardhat-toolbox, @openzeppelin/contracts)
  - Configure hardhat.config.ts for Celo networks (local, Alfajores testnet, mainnet)
  - Set up deployment scripts directory structure
  - Create .env.example with required environment variables
  - _Requirements: 10.1, 10.5_

- [ ] 2. Implement base BettingEvent smart contract
  - [x] 2.1 Create BettingEvent.sol with core data structures (Bet, Outcome, EventInfo)
    - Define state variables (title, description, category, endTime, totalPool, concluded, outcomes, bets)
    - Implement constructor to initialize event parameters
    - _Requirements: 2.3, 3.1, 4.1, 10.4_
  
  - [x] 2.2 Implement bet placement functionality
    - Write placeBet() function with payable modifier
    - Add validation for event timing and outcome index
    - Emit BetPlaced event
    - Update outcome totals and user bet indices
    - _Requirements: 3.2, 3.3, 4.2, 4.3, 10.2_
  
  - [ ] 2.3 Update event conclusion logic to use creator instead of admin
    - Update concludeEvent() function to use onlyCreator modifier instead of onlyAdmin
    - Add creator state variable to store event creator address
    - Update constructor to accept and store creator address
    - Add getCreator() view function
    - _Requirements: 11.5_
  
  - [x] 2.4 Add view functions for event and bet data
    - Implement getEventDetails() to return event information
    - Create getOutcomeDetails() for outcome-specific data
    - Write getUserBets() to retrieve user's bets on the event
    - _Requirements: 2.3, 2.4, 7.1, 7.2, 7.5_

- [ ] 3. Update specialized betting event contracts
  - [ ] 3.1 Update BinaryBettingEvent.sol constructor
    - Update constructor to accept creator address instead of admin
    - Pass creator to parent BettingEvent constructor
    - _Requirements: 3.1, 5.2, 5.6_
  
  - [ ] 3.2 Update MultipleOutcomeBettingEvent.sol constructor
    - Update constructor to accept creator address instead of admin
    - Pass creator to parent BettingEvent constructor
    - _Requirements: 4.1, 5.3, 5.6_

- [ ] 4. Update BettingFactory smart contract for user-created events
  - [ ] 4.1 Update BettingFactory.sol to allow any user to create events
    - Update state variables (remove admin address, add eventCreators mapping)
    - Remove onlyAdmin modifier from createBinaryEvent() and createMultipleOutcomeEvent()
    - Store event creator address in eventCreators mapping
    - Update EventCreated event to include creator address
    - Add getEventCreator() function to retrieve creator of an event
    - _Requirements: 5.1, 5.4, 5.5, 5.6_
  
  - [ ] 4.2 Add event query functions
    - Implement getAllActiveEvents() to return all event addresses
    - Create getEventsByCategory() for category-filtered events
    - Add getEventsByCreator() to return events created by a specific user
    - Add helper functions to check event validity
    - _Requirements: 2.1, 2.2, 6.4_

- [ ] 5. Write smart contract tests
  - [ ] 5.1 Create unit tests for BettingEvent contract
    - Test bet placement with valid and invalid inputs
    - Test event conclusion and payout calculation
    - Test creator-only access control
    - Test event emissions
    - _Requirements: 3.3, 4.3, 9.1, 9.2, 11.5_
  
  - [ ] 5.2 Create unit tests for BinaryBettingEvent and MultipleOutcomeBettingEvent
    - Test outcome count validation
    - Test outcome index validation
    - Test inheritance behavior
    - Test creator address storage
    - _Requirements: 3.1, 4.1, 5.2, 5.3, 5.6_
  
  - [ ] 5.3 Create integration tests for BettingFactory
    - Test event creation by any user (not just admin)
    - Test event querying functions including getEventsByCreator
    - Test multiple users creating and betting on events
    - Test full lifecycle: create → bet → conclude → payout
    - Test creator-only event conclusion
    - _Requirements: 5.1, 5.4, 5.5, 5.6, 9.3, 11.5_

- [ ] 6. Create deployment scripts
  - Write deploy script for BettingFactory contract
  - Create script to verify contracts on Celoscan
  - Add deployment configuration for local, Alfajores, and mainnet
  - _Requirements: 11.1_

- [ ] 7. Set up wagmi and viem for Celo blockchain integration
  - [x] 7.1 Configure wagmi with Celo network settings
    - Install @rainbow-me/rainbowkit, wagmi, and viem packages
    - Create wagmi config with Celo mainnet and Alfajores testnet
    - Set up RainbowKit or custom wallet connection UI
    - Configure supported wallets (MetaMask, Valora, WalletConnect)
    - _Requirements: 1.1, 1.2_
  
  - [ ] 7.2 Create contract interaction hooks
    - Generate TypeScript types from contract ABIs using wagmi CLI
    - Create custom hooks for reading contract data (useEventDetails, useOutcomeDetails, useUserBets, useEventCreator)
    - Create custom hooks for writing to contracts (usePlaceBet, useCreateEvent, useConcludeEvent)
    - Set up contract event listeners for real-time updates
    - _Requirements: 2.5, 5.6, 6.4, 10.1, 10.2, 10.5_

- [x] 8. Implement TypeScript types and interfaces
  - Create types.ts with all frontend interfaces (WalletState, BettingEvent, Outcome, UserBet, UserStats, Transaction)
  - Define enums (EventType, EventStatus, BetStatus)
  - Export types for use across the application
  - _Requirements: All requirements_

- [x] 9. Create Zustand store for global state management
  - Set up Zustand store with slices for wallet state, events, user bets, and UI state
  - Implement actions for updating state (setWalletConnected, addEvent, updateEvent, addUserBet)
  - Add selectors for derived state (active events, user stats, filtered events)
  - Integrate with localStorage for persistence
  - _Requirements: 1.5, 2.5, 7.4, 10.1_

- [ ] 10. Build wallet connection components
  - [x] 10.1 Create WalletProvider component
    - Wrap application with RainbowKit and wagmi providers
    - Configure Celo network settings
    - Handle network switching to Celo
    - Provide wallet state to child components
    - _Requirements: 1.1, 1.2, 1.5_
  
  - [x] 10.2 Create WalletConnectButton component
    - Display "Connect Wallet" button when disconnected
    - Show wallet address (truncated) and balance when connected
    - Handle wallet provider selection
    - Display connection errors with troubleshooting guidance
    - Add disconnect functionality
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 11. Implement event display components
  - [x] 11.1 Create EventCard component
    - Display event title, category, and description
    - Show time remaining with countdown
    - Display total pool and participant count
    - Add animated hover effects
    - Show event status indicator (active, closing soon, ended)
    - Display event creator address
    - Handle click to navigate to event details
    - _Requirements: 2.3, 5.6, 6.4, 8.1_
  
  - [ ] 11.2 Create EventGrid component
    - Display all active events in responsive grid layout
    - Implement category filter dropdown
    - Add real-time updates via contract event listeners
    - Show loading states and empty states
    - Implement infinite scroll or pagination
    - _Requirements: 2.1, 2.2, 2.5_
  
  - [ ] 11.3 Create EventDetails component
    - Display full event information
    - Show all outcome options with current odds
    - Add pool distribution visualization (pie chart using recharts)
    - Display participant count per outcome
    - Include countdown timer with animations
    - Integrate bet placement interface
    - _Requirements: 2.3, 2.4, 9.3, 9.4_

- [ ] 12. Build betting interface components
  - [ ] 12.1 Create OutcomeSelector component
    - For binary bets: Two large, colorful Kahoot-style buttons
    - For multiple outcomes: Grid of outcome cards
    - Display current odds for each outcome
    - Show percentage of pool on each outcome
    - Add visual feedback on selection
    - _Requirements: 3.1, 4.1, 9.3_
  
  - [ ] 12.2 Create BetAmountInput component
    - Numeric input with increment/decrement buttons
    - Quick amount buttons (1, 5, 10, 25 CELO)
    - Max button to bet entire balance
    - Real-time potential payout calculation
    - Balance validation with error messages
    - _Requirements: 3.2, 4.2_
  
  - [ ] 12.3 Create BetPlacementModal component
    - Integrate OutcomeSelector and BetAmountInput
    - Display wallet balance check
    - Show transaction confirmation flow
    - Add loading states during blockchain transaction
    - Display success/error feedback with animations
    - Trigger celebration overlay on success
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 4.2, 4.3, 4.4, 4.5_

- [ ] 13. Implement user dashboard components
  - [ ] 13.1 Create BetCard component
    - Display event name and chosen outcome
    - Show bet amount and potential/actual payout
    - Add status badge (pending, active, won, lost)
    - Display time placed and time remaining/concluded
    - Include transaction hash link to blockchain explorer
    - _Requirements: 6.2, 6.3, 10.3_
  
  - [ ] 13.2 Create MyBetsPanel component
    - Add tabs for "Active Bets" and "Bet History"
    - Display list of user's bets using BetCard components
    - Implement automatic status updates when events conclude
    - Show empty states for no bets
    - Add filtering and sorting options
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  
  - [ ] 13.3 Create UserStatsWidget component
    - Display total bets placed, win rate, and total winnings
    - Show current ranking (if leaderboard exists)
    - Add visual progress indicators and badges
    - Implement animated counters for stats
    - Display user level based on bet count
    - _Requirements: 8.5_

- [ ] 14. Build event creation and sharing components
  - [ ] 14.1 Create EventCreationForm component
    - Add event type selector (binary/multiple)
    - Include event title and description inputs
    - Add category selector dropdown
    - Implement duration picker
    - Create outcome configuration UI (2 for binary, 3-10 for multiple)
    - Add smart contract deployment trigger
    - Display transaction status feedback
    - Generate shareable link on successful creation
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 6.1_
  
  - [ ] 14.2 Create ShareEventButton component
    - Implement copy link to clipboard functionality
    - Add social media share options (Twitter, WhatsApp, Telegram)
    - Generate QR code for mobile sharing
    - Display share preview with event title and description
    - Track share count
    - _Requirements: 6.1, 6.2, 6.3, 6.5_
  
  - [ ] 14.3 Create MyEventsPanel component
    - Display list of events created by connected user
    - Show event status (active, ended, concluded)
    - Display participant count and total pool for each event
    - Add quick access to conclude event (creator only)
    - Include share button for each event
    - Show event statistics and performance metrics
    - _Requirements: 5.6, 6.4, 11.5_

- [ ] 15. Implement gamification components
  - [ ] 15.1 Create AnimatedTransitions component
    - Set up Framer Motion page transitions
    - Implement slide, fade, and scale effects
    - Configure 300ms duration with ease-in-out easing
    - Apply to route changes
    - _Requirements: 7.1_
  
  - [ ] 15.2 Create CelebrationOverlay component
    - Implement confetti animation using canvas or library
    - Add success message with bet details
    - Include checkmark animation
    - Add optional sound effects with mute toggle
    - Set 2-second duration
    - _Requirements: 7.2_
  
  - [ ] 15.3 Create LeaderboardDisplay component
    - Display animated list of top winners
    - Show user rankings with wallet addresses
    - Display total winnings for each user
    - Highlight current user's position with glow effect
    - Add trophy icons for top 3
    - Implement staggered entry animations
    - _Requirements: 7.4_
  
  - [ ] 15.4 Create ProgressIndicators component
    - Implement circular progress for time remaining
    - Add linear progress for pool filling
    - Create animated stat counters
    - Design achievement badges
    - Add pulse animations for urgent states
    - _Requirements: 7.3, 7.5_

- [ ] 16. Implement odds calculation and real-time updates
  - Create utility functions to calculate odds from pool data
  - Implement percentage calculation for pool distribution
  - Set up contract event listeners for bet placement
  - Update odds display within 5 seconds of new bets
  - Add visual indicators for significant odds changes (>10%)
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 17. Add payout notification system
  - Set up event listeners for PayoutDistributed events
  - Create toast notifications for successful payouts
  - Display payout amount in notification
  - Add payout transactions to user's transaction history
  - Update user stats after payout
  - _Requirements: 8.4, 8.5_

- [ ] 18. Implement error handling and user feedback
  - Create error boundary components for crash recovery
  - Add toast notifications for non-critical errors
  - Implement modal dialogs for critical errors
  - Add inline validation messages for forms
  - Create retry mechanisms with exponential backoff
  - Display clear error messages for wallet and transaction errors
  - _Requirements: 1.3, 3.4, 4.4_

- [x] 19. Style application with Kahoot-inspired design
  - Configure Tailwind with custom color palette (purple, blue, green, yellow, red)
  - Create large, rounded button styles with hover effects
  - Implement vibrant gradient backgrounds
  - Add glow and shadow effects
  - Set up responsive typography (bold headings, clear body text)
  - Apply animations to interactive elements
  - _Requirements: 7.3_

- [ ] 20. Create main application pages and routing
  - [ ] 20.1 Update Index page as landing/home page
    - Display featured events
    - Add wallet connection prompt
    - Show platform statistics
    - Include call-to-action buttons
    - _Requirements: 2.1_
  
  - [ ] 20.2 Create Events page
    - Display EventGrid component
    - Add category filters
    - Include search functionality
    - _Requirements: 2.1, 2.2_
  
  - [ ] 20.3 Create EventDetail page
    - Display EventDetails component
    - Include BetPlacementModal
    - Show real-time updates
    - _Requirements: 2.3, 2.4, 3.1, 4.1_
  
  - [ ] 20.4 Create Dashboard page
    - Display MyBetsPanel component
    - Include UserStatsWidget
    - Show transaction history
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [ ] 20.5 Create MyEvents page
    - Display EventCreationForm
    - Include MyEventsPanel
    - Show user's created events with management options
    - _Requirements: 5.1, 5.6, 6.4_

- [ ] 21. Integrate blockchain explorer links
  - Add utility function to generate Celoscan URLs
  - Include transaction hash links in BetCard components
  - Add event contract address links in EventDetails
  - Display "View on Celoscan" buttons for all transactions
  - _Requirements: 10.3_

- [ ] 22. Implement local storage for user preferences
  - Store wallet connection preference
  - Save sound effects mute setting
  - Cache user's bet history for faster loading
  - Store category filter preferences
  - _Requirements: 1.5_

- [ ] 23. Add loading states and skeleton screens
  - Create skeleton components for EventCard, BetCard, and EventDetails
  - Add loading spinners for transaction processing
  - Implement progressive loading for event lists
  - Show loading states during wallet connection
  - _Requirements: All requirements_

- [ ] 24. Optimize performance and bundle size
  - Implement code splitting for routes
  - Lazy load heavy components (charts, animations)
  - Optimize images and assets
  - Minimize bundle size by tree-shaking unused code
  - Add service worker for caching (optional)
  - _Requirements: All requirements_

- [ ] 25. Deploy contracts to Celo Alfajores testnet
  - Run deployment scripts on Alfajores
  - Verify contracts on Celoscan
  - Update .env with deployed contract addresses
  - Test all contract functions on testnet
  - _Requirements: 10.1_

- [ ] 26. Configure frontend for testnet deployment
  - Update wagmi config to use Alfajores testnet
  - Set environment variables for contract addresses
  - Build and deploy frontend to hosting platform (Vercel/Netlify)
  - Test full application flow on testnet
  - _Requirements: All requirements_
