
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';

// Define the form schema with Zod
const eventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
  time: z.string().min(1, { message: 'Time is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  image_url: z.string().optional(),
  category: z.string().min(1, { message: 'Category is required' }),
  featured: z.boolean().default(false),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface EventFormProps {
  event?: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image_url?: string;
    category: string;
    featured: boolean;
  };
  onSuccess?: () => void;
}

export const EventForm: React.FC<EventFormProps> = ({
  event,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Format date string for form input (yyyy-MM-dd)
  const formatDateForInput = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return format(date, 'yyyy-MM-dd');
    } catch (error) {
      return dateStr;
    }
  };

  // Initialize form with default values or existing event data
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: event ? {
      id: event.id,
      title: event.title,
      description: event.description,
      date: formatDateForInput(event.date),
      time: event.time,
      location: event.location,
      image_url: event.image_url || '',
      category: event.category,
      featured: event.featured,
    } : {
      title: '',
      description: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '',
      location: '',
      image_url: '',
      category: '',
      featured: false,
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    setIsSubmitting(true);
    try {
      if (data.id) {
        // Update existing event
        const { error } = await supabase
          .from('events')
          .update({
            title: data.title,
            description: data.description,
            date: data.date,
            time: data.time,
            location: data.location,
            image_url: data.image_url || null,
            category: data.category,
            featured: data.featured,
            updated_at: new Date().toISOString(),
          })
          .eq('id', data.id);

        if (error) throw error;
        
        toast({
          title: 'Event updated',
          description: `"${data.title}" has been updated successfully.`,
        });
      } else {
        // Create new event
        const { error } = await supabase
          .from('events')
          .insert({
            title: data.title,
            description: data.description,
            date: data.date,
            time: data.time,
            location: data.location,
            image_url: data.image_url || null,
            category: data.category,
            featured: data.featured,
          });

        if (error) throw error;
        
        toast({
          title: 'Event added',
          description: `"${data.title}" has been added successfully.`,
        });
      }

      // Reset form and call onSuccess callback
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: 'Error',
        description: 'Failed to save event. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <input type="hidden" {...form.register('id')} />
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter event title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter event description" rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="date" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="e.g., 7:00 PM - 9:00 PM" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Enter event location" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Religious, Educational" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Featured Event</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Featured events will be highlighted on the website
                </p>
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {event ? 'Update Event' : 'Add Event'}
        </Button>
      </form>
    </Form>
  );
};
