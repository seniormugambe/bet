import { useBettingStore } from '@/store';
import { EventCategory } from '@/types';
import EventCard from './EventCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const EventGrid = () => {
  const { events, ui, setSelectedCategory, getActiveEvents, getEventsByCategory } = useBettingStore();
  const { selectedCategory, isLoading } = ui;

  const categories: (EventCategory | 'All')[] = [
    'All',
    'Sports',
    'Politics',
    'Entertainment',
    'Crypto',
    'Weather',
    'Gaming',
    'Other',
  ];

  const displayedEvents =
    selectedCategory === 'All'
      ? getActiveEvents()
      : getEventsByCategory(selectedCategory as EventCategory);

  return (
    <div className="w-full space-y-6">
      {/* Header with Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Active Events</h2>
          <p className="text-muted-foreground mt-1">
            {displayedEvents.length} {displayedEvents.length === 1 ? 'event' : 'events'} available
          </p>
        </div>

        {/* Category Filter */}
        <Select
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value as EventCategory | 'All')}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-80 bg-card rounded-2xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && displayedEvents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-surface rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground">No Events Found</h3>
            <p className="text-muted-foreground max-w-md">
              {selectedCategory === 'All'
                ? 'There are no active betting events at the moment. Check back soon or create your own!'
                : `No events found in the ${selectedCategory} category. Try selecting a different category.`}
            </p>
          </div>
        </div>
      )}

      {/* Events Grid */}
      {!isLoading && displayedEvents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedEvents.map((event) => (
            <EventCard key={event.address} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventGrid;
