# Share Features Documentation

## Overview

The BetCelo platform includes comprehensive sharing features that allow users to share both betting events and their individual bets across multiple platforms.

## Share Components

### 1. ShareEventButton (`src/components/events/ShareEventButton.tsx`)

Allows users to share betting events with others.

**Features:**
- Copy event link to clipboard
- Share on Twitter/X
- Share on WhatsApp
- Share on Telegram
- Customizable button variants and sizes

**Props:**
```typescript
interface ShareEventButtonProps {
  eventAddress: string;
  eventTitle: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}
```

### 2. ShareBetButton (`src/components/betting/ShareBetButton.tsx`)

Allows users to share their betting activity and results.

**Features:**
- Dynamic share text based on bet status (won/active/lost)
- Copy bet details to clipboard
- Share on Twitter/X with hashtags
- Share on WhatsApp
- Share on Telegram
- Status-specific emojis and messaging

**Props:**
```typescript
interface ShareBetButtonProps {
  bet: UserBet;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}
```

## Where Share Features Are Used

### ShareEventButton Locations:

1. **Event Detail Page** (`src/pages/EventDetail.tsx`)
   - Location: Top right of event header
   - Variant: `outline`
   - Size: `icon`
   - Purpose: Share event from detail view

2. **Event Creation Success** (`src/components/events/EventCreationForm.tsx`)
   - Location: Success screen after creating event
   - Variant: `outline`
   - Size: `lg`
   - Purpose: Share newly created event immediately

3. **Event Card** (`src/components/events/EventCard.tsx`)
   - Location: Top right corner (appears on hover)
   - Variant: `ghost`
   - Size: `icon`
   - Purpose: Quick share from event list

### ShareBetButton Locations:

1. **Bet Card** (`src/components/dashboard/BetCard.tsx`)
   - Location: Footer section, next to "View Transaction"
   - Variant: `ghost`
   - Size: `sm`
   - Purpose: Share individual bets from dashboard

## Share Text Examples

### Event Sharing:
```
Check out this betting event: [Event Title]
[Event URL]
```

### Bet Sharing:

**Won Bet:**
```
🎉 I just won 5.2 CELO on BetCelo! Bet 2 CELO on "Yes" and made 3.2 CELO profit! 💰
[Event URL]
```

**Active Bet:**
```
🎲 I just placed a bet on BetCelo! 2 CELO on "Yes" for "Will Bitcoin reach $100k?". Potential payout: 5.2 CELO! 🚀
[Event URL]
```

**Lost Bet:**
```
😅 Took a shot on BetCelo! Bet 2 CELO on "Yes". Better luck next time! 🎯
[Event URL]
```

## Social Media Integration

### Twitter/X
- Includes event/bet details
- Adds hashtags: `#BetCelo`, `#CeloBlockchain`, `#Web3Betting`
- Opens in popup window (550x420)

### WhatsApp
- Includes full text and URL
- Opens WhatsApp web or app

### Telegram
- Includes text and URL
- Opens Telegram web or app

## User Flow

### Sharing an Event:

1. User finds an event they want to share
2. Clicks the share button (appears on hover in event cards)
3. Popover opens with sharing options
4. User can:
   - Copy the link directly
   - Share on social media platforms
5. Toast notification confirms action

### Sharing a Bet:

1. User navigates to Dashboard
2. Views their bets in "My Bets" section
3. Clicks "Share Bet" button on any bet card
4. Popover shows:
   - Preview of share text (customized by bet status)
   - Copy button
   - Social media share buttons
5. User shares their betting activity

## Implementation Details

### Copy to Clipboard
Uses the Clipboard API:
```typescript
await navigator.clipboard.writeText(textToCopy);
```

### Social Media URLs

**Twitter:**
```typescript
const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`;
```

**WhatsApp:**
```typescript
const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
```

**Telegram:**
```typescript
const url = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
```

## Customization

### Button Variants
- `default`: Solid background
- `outline`: Border with transparent background
- `ghost`: No border, transparent background

### Button Sizes
- `icon`: Icon only (circular)
- `sm`: Small with optional label
- `default`: Standard size
- `lg`: Large with label

### Example Usage:

```tsx
// Icon only (for compact spaces)
<ShareEventButton
  eventAddress={event.address}
  eventTitle={event.title}
  variant="ghost"
  size="icon"
/>

// Full button with label
<ShareEventButton
  eventAddress={event.address}
  eventTitle={event.title}
  variant="outline"
  size="lg"
/>
```

## Toast Notifications

All share actions provide user feedback via toast notifications:

- **Success**: "Link copied!" / "Bet details copied!"
- **Error**: "Failed to copy link" / "Failed to copy"

## Future Enhancements

Potential improvements:
- [ ] Share to Discord
- [ ] Share to Reddit
- [ ] Generate share images with bet details
- [ ] Track share analytics
- [ ] Referral rewards for sharing
- [ ] Custom share messages
- [ ] Share to email
- [ ] QR code generation for events

## Testing

To test share features:

1. **Event Sharing:**
   - Create or view an event
   - Click share button
   - Verify link is correct
   - Test each social platform

2. **Bet Sharing:**
   - Place a bet
   - Go to Dashboard
   - Click "Share Bet"
   - Verify text matches bet status
   - Test social sharing

## Browser Compatibility

- Clipboard API requires HTTPS (except localhost)
- Social media sharing works in all modern browsers
- Popup blockers may prevent social share windows
