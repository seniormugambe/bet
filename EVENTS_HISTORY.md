# Events History Feature

## Overview

The Events History feature on the Dashboard allows users to view and track all betting events they've participated in, organized into active and completed events.

## Location

**Dashboard Page** → **Events History Panel**
- Path: `/dashboard`
- Component: `src/components/dashboard/EventsHistoryPanel.tsx`

## Features

### 📊 Event Tracking

Users can see:
- All events they've placed bets on
- Event status (Active, Closing Soon, Ended, Concluded)
- Event details (title, description, category)
- Time remaining or time since ended
- Total pool size
- Number of participants
- Game rules/bonuses applied

### 💰 Personal Statistics Per Event

For each event, users can view:
- **Number of bets placed** on that event
- **Total amount wagered** on that event
- **Total winnings** from that event (if won)

### 📑 Organized Tabs

Events are organized into two tabs:

1. **Active Events Tab**
   - Shows events that are still accepting bets
   - Includes "Active" and "Closing Soon" events
   - Users can quickly navigate to place more bets

2. **Completed Events Tab**
   - Shows events that have ended or concluded
   - Displays final results
   - Shows user's performance on each event

## Component Structure

### EventsHistoryPanel

Main component that displays the events history.

**Key Features:**
- Tabs for Active/Completed events
- Empty states with helpful messages
- Event cards with detailed information
- Quick navigation to event details

### EventCard (Internal)

Individual event card showing:
- Event header with category and status badges
- Event title and description
- Game rules badges
- Statistics grid (time, pool, participants, user's bets)
- User's participation summary (wagered, won)
- "View Event Details" button

## Data Flow

```
Store (userBets + events)
    ↓
getUserParticipatedEvents() selector
    ↓
EventsHistoryPanel
    ↓
Filter by status (active/completed)
    ↓
Render EventCards
```

## Store Integration

### New Selector

Added `getUserParticipatedEvents()` to the store:

```typescript
getUserParticipatedEvents: () => {
  const { events, userBets } = get();
  const eventAddresses = new Set(userBets.map(bet => bet.eventAddress));
  return events.filter(event => eventAddresses.has(event.address));
}
```

This selector:
- Gets all user bets
- Extracts unique event addresses
- Returns only events the user has bet on

## UI/UX Details

### Status Colors

- **Active**: Green (success)
- **Closing Soon**: Yellow (warning)
- **Ended/Concluded**: Gray (muted)

### Empty States

When no events are found:
- Shows calendar icon
- Displays helpful message
- Encourages user action

### Hover Effects

- Cards have hover animations
- Title changes color on hover
- Smooth transitions

### Responsive Design

- Single column on mobile
- Adapts to different screen sizes
- Stats grid adjusts layout

## User Flow

1. User navigates to Dashboard
2. Scrolls to "Events History" section
3. Sees tabs for Active/Completed events
4. Clicks on a tab to filter events
5. Views event cards with their participation details
6. Clicks "View Event Details" to see full event page

## Statistics Displayed

### Event-Level Stats
- Time remaining/ended
- Total pool size
- Number of participants
- Number of outcomes

### User-Level Stats (Per Event)
- Number of bets placed
- Total CELO wagered
- Total CELO won (if applicable)

## Integration with Other Features

### Links to:
- **Event Detail Page**: Click event title or "View Event Details"
- **My Bets Panel**: Shows individual bets on each event
- **User Stats Widget**: Aggregates data from all events

### Uses:
- **Game Rules Badges**: Shows special bonuses on events
- **Share Event Button**: Can share events from detail page
- **Bet Cards**: Individual bets shown in My Bets panel

## Code Example

```tsx
import EventsHistoryPanel from '@/components/dashboard/EventsHistoryPanel';

// In Dashboard.tsx
<div className="max-w-6xl mx-auto space-y-6">
  <UserStatsWidget />
  <MyBetsPanel />
  <EventsHistoryPanel /> {/* New component */}
</div>
```

## Future Enhancements

Potential improvements:
- [ ] Filter by category
- [ ] Sort by date, pool size, or winnings
- [ ] Search events by title
- [ ] Export event history
- [ ] Performance charts per event
- [ ] Compare events side-by-side
- [ ] Event recommendations based on history
- [ ] Favorite events feature
- [ ] Event notifications/reminders

## Performance Considerations

- Uses `useMemo` to optimize event filtering
- Only re-calculates when dependencies change
- Efficient event lookup using Set for O(1) complexity

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- Screen reader friendly labels
- Color contrast compliance

## Testing

To test the Events History feature:

1. **Setup:**
   - Connect wallet
   - Place bets on multiple events
   - Wait for some events to end

2. **Test Active Tab:**
   - Verify active events appear
   - Check statistics are correct
   - Test navigation to event details

3. **Test Completed Tab:**
   - Verify completed events appear
   - Check win/loss amounts
   - Verify status badges

4. **Test Empty States:**
   - Create new wallet with no bets
   - Verify empty state messages

## Files Modified

- `src/pages/Dashboard.tsx` - Added EventsHistoryPanel
- `src/store/index.ts` - Added getUserParticipatedEvents selector

## Files Created

- `src/components/dashboard/EventsHistoryPanel.tsx` - Main component
- `EVENTS_HISTORY.md` - This documentation

## Dependencies

- `date-fns` - Date formatting
- `viem` - Ethereum utilities (formatEther)
- `react-router-dom` - Navigation
- `@/components/ui/*` - UI components
- `lucide-react` - Icons
