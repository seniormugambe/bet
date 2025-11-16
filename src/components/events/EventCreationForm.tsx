import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { EventType, EventCategory, EventStatus } from '@/types';
import { useBettingStore } from '@/store';
import { GAME_RULES, GameRuleType } from '@/types/gameRules';
import { useBettingFactory } from '@/hooks/useBettingFactory';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Loader2, Sparkles, CheckCircle, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import ShareEventButton from './ShareEventButton';

const formSchema = z.object({
  eventType: z.enum(['binary', 'multiple']),
  title: z.string().min(10, 'Title must be at least 10 characters').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters').max(500),
  category: z.enum(['Sports', 'Politics', 'Entertainment', 'Crypto', 'Weather', 'Gaming', 'Other']),
  duration: z.number().min(1, 'Duration must be at least 1 hour').max(720, 'Duration cannot exceed 30 days'),
  outcomes: z.array(z.string().min(1, 'Outcome cannot be empty')).min(2).max(10),
  gameRules: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const EventCreationForm = () => {
  const [createdEvent, setCreatedEvent] = useState<{ address: string; title: string } | null>(null);
  const [eventAddress, setEventAddress] = useState<string | null>(null);
  const { addEvent, addNotification } = useBettingStore();
  const navigate = useNavigate();
  
  const {
    createBinaryEvent,
    createMultipleOutcomeEvent,
    isPending,
    isSuccess,
    transactionHash,
    isAdmin,
    factoryAddress,
    useEventCreatedListener,
  } = useBettingFactory();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventType: 'binary',
      title: '',
      description: '',
      category: 'Sports',
      duration: 24,
      outcomes: ['Yes', 'No'],
      gameRules: [],
    },
  });

  // Listen for EventCreated events
  useEventCreatedListener((address, eventType, category, endTime) => {
    if (transactionHash) {
      console.log('Event created:', { address, eventType, category, endTime });
      setEventAddress(address);
    }
  });

  // Handle successful event creation
  useEffect(() => {
    if (isSuccess && eventAddress && form.getValues('title')) {
      const values = form.getValues();
      
      // Add event to store
      const newEvent = {
        address: eventAddress,
        title: values.title,
        description: values.description,
        category: values.category,
        eventType: values.eventType === 'binary' ? EventType.BINARY : EventType.MULTIPLE,
        endTime: Math.floor(Date.now() / 1000) + (values.duration * 3600),
        totalPool: BigInt(0),
        outcomes: values.outcomes.map((label, index) => ({
          index,
          label,
          totalBets: BigInt(0),
          bettorCount: 0,
          odds: 0,
          poolPercentage: 0,
        })),
        status: EventStatus.ACTIVE,
        concluded: false,
        participantCount: 0,
        gameRules: values.gameRules || [],
      };
      
      addEvent(newEvent);
      
      addNotification({
        type: 'success',
        title: 'Event Created!',
        message: `Your event "${values.title}" has been created successfully.`,
      });
      
      toast.success('Event created successfully!', {
        description: `Transaction: ${transactionHash?.slice(0, 10)}...`,
      });
      
      // Show success screen
      setCreatedEvent({
        address: eventAddress,
        title: values.title,
      });
      
      // Reset for next creation
      setEventAddress(null);
    }
  }, [isSuccess, eventAddress, transactionHash, addEvent, addNotification, form]);

  const eventType = form.watch('eventType');
  const outcomes = form.watch('outcomes');

  const addOutcome = () => {
    if (outcomes.length < 10) {
      form.setValue('outcomes', [...outcomes, '']);
    }
  };

  const removeOutcome = (index: number) => {
    if (outcomes.length > 2) {
      const newOutcomes = outcomes.filter((_, i) => i !== index);
      form.setValue('outcomes', newOutcomes);
    }
  };

  const updateOutcome = (index: number, value: string) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = value;
    form.setValue('outcomes', newOutcomes);
  };

  const onSubmit = async (values: FormValues) => {
    // Check if factory is configured
    if (!factoryAddress) {
      toast.error('Contract not configured', {
        description: 'Please deploy the BettingFactory contract and set VITE_FACTORY_CONTRACT_ADDRESS in .env',
      });
      return;
    }

    // Check admin status
    if (!isAdmin) {
      toast.error('Admin access required', {
        description: 'Only admins can create betting events. Please contact the platform owner.',
      });
      return;
    }
    
    try {
      let success = false;
      
      // Convert duration from hours to seconds
      const durationInSeconds = values.duration * 3600;
      
      if (values.eventType === 'binary') {
        // Create binary event
        success = await createBinaryEvent(
          values.title,
          values.description,
          values.category,
          durationInSeconds,
          [values.outcomes[0], values.outcomes[1]]
        ) !== null;
      } else {
        // Create multiple outcome event
        success = await createMultipleOutcomeEvent(
          values.title,
          values.description,
          values.category,
          durationInSeconds,
          values.outcomes
        ) !== null;
      }
      
      if (!success) {
        // Error already shown by the hook
        return;
      }
      
      // Transaction submitted successfully
      toast.info('Transaction submitted', {
        description: 'Waiting for confirmation...',
      });
      
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to create event', {
        description: error instanceof Error ? error.message : 'Please try again or check your wallet connection.',
      });
    }
  };

  // Show success screen if event was created
  if (createdEvent) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="glass-card p-8 rounded-2xl text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-success/10 rounded-full">
              <CheckCircle className="w-16 h-16 text-success" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gradient-primary">
              Event Created Successfully!
            </h2>
            <p className="text-xl text-foreground font-semibold">
              {createdEvent.title}
            </p>
            <p className="text-muted-foreground">
              Your betting event is now live and ready for participants
            </p>
          </div>

          <div className="p-4 bg-surface rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-2">Event Address</p>
            <p className="text-sm font-mono text-foreground break-all">
              {createdEvent.address}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate(`/event/${createdEvent.address}`)}
              className="btn-kahoot-primary gap-2"
              size="lg"
            >
              <ExternalLink className="w-5 h-5" />
              View Event
            </Button>
            
            <ShareEventButton
              eventAddress={createdEvent.address}
              eventTitle={createdEvent.title}
              variant="outline"
              size="lg"
            />
            
            <Button
              onClick={() => {
                setCreatedEvent(null);
                form.reset();
              }}
              variant="outline"
              size="lg"
            >
              Create Another
            </Button>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              💡 Share your event with friends to get more participants!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass-card p-8 rounded-2xl">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gradient-primary mb-2">
            Create Betting Event
          </h2>
          <p className="text-muted-foreground">
            Create your own betting event and invite others to participate
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Event Type */}
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Event Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        // Reset outcomes based on type
                        if (value === 'binary') {
                          form.setValue('outcomes', ['Yes', 'No']);
                        } else {
                          form.setValue('outcomes', ['Option 1', 'Option 2', 'Option 3']);
                        }
                      }}
                      value={field.value}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2 glass-card p-4 rounded-xl flex-1 cursor-pointer hover:border-primary border-2 border-transparent transition-all">
                        <RadioGroupItem value="binary" id="binary" />
                        <label htmlFor="binary" className="cursor-pointer flex-1">
                          <div className="font-semibold">Binary (Yes/No)</div>
                          <div className="text-sm text-muted-foreground">Two outcomes</div>
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 glass-card p-4 rounded-xl flex-1 cursor-pointer hover:border-primary border-2 border-transparent transition-all">
                        <RadioGroupItem value="multiple" id="multiple" />
                        <label htmlFor="multiple" className="cursor-pointer flex-1">
                          <div className="font-semibold">Multiple Choice</div>
                          <div className="text-sm text-muted-foreground">3-10 outcomes</div>
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Event Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Will Bitcoin reach $100k by end of 2024?"
                      className="text-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Make it clear and engaging (10-100 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide details about the event, rules, and how the outcome will be determined..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Explain the event clearly (20-500 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Sports">🏆 Sports</SelectItem>
                      <SelectItem value="Politics">🗳️ Politics</SelectItem>
                      <SelectItem value="Entertainment">🎬 Entertainment</SelectItem>
                      <SelectItem value="Crypto">₿ Crypto</SelectItem>
                      <SelectItem value="Weather">🌤️ Weather</SelectItem>
                      <SelectItem value="Gaming">🎮 Gaming</SelectItem>
                      <SelectItem value="Other">📌 Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Duration (hours)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={720}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    How long until betting closes (1-720 hours / 30 days max)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Game Rules */}
            <FormField
              control={form.control}
              name="gameRules"
              render={() => (
                <FormItem>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Sparkles className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <FormLabel className="text-lg font-semibold">
                        Game Rules (Optional)
                      </FormLabel>
                      <FormDescription>
                        Add special bonuses to make your event more exciting!
                      </FormDescription>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.values(GameRuleType).map((ruleType) => {
                      const rule = GAME_RULES[ruleType];
                      return (
                        <FormField
                          key={ruleType}
                          control={form.control}
                          name="gameRules"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={ruleType}
                                className="flex flex-row items-start space-x-3 space-y-0 p-3 bg-surface rounded-lg border border-border hover:border-warning/50 transition-colors"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(ruleType)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), ruleType])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== ruleType
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <div className="flex-1 space-y-1 leading-none">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xl">{rule.icon}</span>
                                    <FormLabel className="font-semibold cursor-pointer">
                                      {rule.name.replace(/^[^\s]+\s/, '')}
                                    </FormLabel>
                                  </div>
                                  <FormDescription className="text-xs">
                                    {rule.description}
                                  </FormDescription>
                                </div>
                              </FormItem>
                            );
                          }}
                        />
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Outcomes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-lg font-semibold">
                  Outcomes ({outcomes.length})
                </FormLabel>
                {eventType === 'multiple' && outcomes.length < 10 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addOutcome}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Outcome
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={outcome}
                      onChange={(e) => updateOutcome(index, e.target.value)}
                      placeholder={`Outcome ${index + 1}`}
                      className="flex-1"
                    />
                    {eventType === 'multiple' && outcomes.length > 3 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOutcome(index)}
                        className="text-danger hover:text-danger hover:bg-danger/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                    {eventType === 'binary' && outcomes.length === 2 && (
                      <div className="w-10" /> // Spacer for alignment
                    )}
                  </div>
                ))}
              </div>
              <FormDescription>
                {eventType === 'binary'
                  ? 'Binary events have exactly 2 outcomes'
                  : 'Multiple choice events can have 3-10 outcomes'}
              </FormDescription>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending || !factoryAddress}
              className="w-full btn-kahoot-primary text-xl py-6"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {isSuccess ? 'Confirming...' : 'Creating Event...'}
                </>
              ) : !factoryAddress ? (
                'Contract Not Configured'
              ) : !isAdmin ? (
                'Admin Access Required'
              ) : (
                'Create Event'
              )}
            </Button>
            
            {/* Contract Info */}
            {factoryAddress && (
              <div className="text-center space-y-1">
                <p className="text-xs text-muted-foreground">
                  Factory Contract: {factoryAddress.slice(0, 6)}...{factoryAddress.slice(-4)}
                </p>
                {isAdmin ? (
                  <p className="text-xs text-success">✓ Admin Access Granted</p>
                ) : (
                  <p className="text-xs text-warning">⚠ Admin Access Required</p>
                )}
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EventCreationForm;
