
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
import { Loader2 } from 'lucide-react';

// Define the form schema with Zod
const prayerTimeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: 'Prayer name is required' }),
  arabic_name: z.string().min(1, { message: 'Arabic name is required' }),
  adhan_time: z.string().min(1, { message: 'Adhan time is required' }),
  iqamah_time: z.string().min(1, { message: 'Iqamah time is required' }),
  fiqa_type: z.string().default('Jafferia'),
});

type PrayerTimeFormValues = z.infer<typeof prayerTimeSchema>;

interface PrayerTimeFormProps {
  prayerTime?: {
    id: string;
    name: string;
    arabic_name: string;
    adhan_time: string;
    iqamah_time: string;
    fiqa_type: string;
  };
  onSuccess?: () => void;
}

export const PrayerTimeForm: React.FC<PrayerTimeFormProps> = ({
  prayerTime,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Initialize form with default values or existing prayer time data
  const form = useForm<PrayerTimeFormValues>({
    resolver: zodResolver(prayerTimeSchema),
    defaultValues: prayerTime ? {
      id: prayerTime.id,
      name: prayerTime.name,
      arabic_name: prayerTime.arabic_name,
      adhan_time: prayerTime.adhan_time,
      iqamah_time: prayerTime.iqamah_time,
      fiqa_type: prayerTime.fiqa_type || 'Jafferia',
    } : {
      name: '',
      arabic_name: '',
      adhan_time: '',
      iqamah_time: '',
      fiqa_type: 'Jafferia',
    },
  });

  const onSubmit = async (data: PrayerTimeFormValues) => {
    setIsSubmitting(true);
    try {
      if (data.id) {
        // Update existing prayer time
        const { error } = await supabase
          .from('prayer_times')
          .update({
            name: data.name,
            arabic_name: data.arabic_name,
            adhan_time: data.adhan_time,
            iqamah_time: data.iqamah_time,
            fiqa_type: data.fiqa_type,
            updated_at: new Date().toISOString(),
          })
          .eq('id', data.id);

        if (error) throw error;
        
        toast({
          title: 'Prayer time updated',
          description: `${data.name} prayer time has been updated successfully.`,
        });
      } else {
        // Create new prayer time
        const { error } = await supabase
          .from('prayer_times')
          .insert({
            name: data.name,
            arabic_name: data.arabic_name,
            adhan_time: data.adhan_time,
            iqamah_time: data.iqamah_time,
            fiqa_type: data.fiqa_type,
          });

        if (error) throw error;
        
        toast({
          title: 'Prayer time added',
          description: `${data.name} prayer time has been added successfully.`,
        });
      }

      // Reset form and call onSuccess callback
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error saving prayer time:', error);
      toast({
        title: 'Error',
        description: 'Failed to save prayer time. Please try again.',
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prayer Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Fajr" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="arabic_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Arabic Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., الفجر" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="adhan_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adhan Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="iqamah_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Iqamah Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="fiqa_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fiqa Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Jafferia" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {prayerTime ? 'Update Prayer Time' : 'Add Prayer Time'}
        </Button>
      </form>
    </Form>
  );
};
