
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
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Heart } from 'lucide-react';

// Define the form schema with Zod
const donationOptionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  amount: z.union([
    z.number().positive({ message: 'Amount must be a positive number' }),
    z.literal(null)
  ]).nullable(),
  custom_amount: z.boolean().default(false),
  payment_info: z.string().optional(),
  featured: z.boolean().default(false),
});

type DonationOptionFormValues = z.infer<typeof donationOptionSchema>;

interface DonationOptionFormProps {
  donationOption?: {
    id: string;
    title: string;
    description: string;
    amount: number | null;
    custom_amount: boolean;
    payment_info: string;
    featured: boolean;
  };
  onSuccess?: () => void;
}

export const DonationOptionForm: React.FC<DonationOptionFormProps> = ({
  donationOption,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Initialize form with default values or existing donation option data
  const form = useForm<DonationOptionFormValues>({
    resolver: zodResolver(donationOptionSchema),
    defaultValues: donationOption ? {
      id: donationOption.id,
      title: donationOption.title,
      description: donationOption.description,
      amount: donationOption.amount,
      custom_amount: donationOption.custom_amount,
      payment_info: donationOption.payment_info || '',
      featured: donationOption.featured,
    } : {
      title: '',
      description: '',
      amount: null,
      custom_amount: false,
      payment_info: '',
      featured: false,
    },
  });

  // Watch for custom_amount changes to disable amount field
  const customAmount = form.watch('custom_amount');

  const onSubmit = async (data: DonationOptionFormValues) => {
    setIsSubmitting(true);
    try {
      // If custom amount is set, set amount to null
      if (data.custom_amount) {
        data.amount = null;
      }
      
      if (data.id) {
        // Update existing donation option
        const { error } = await supabase
          .from('donation_options')
          .update({
            title: data.title,
            description: data.description,
            amount: data.amount,
            custom_amount: data.custom_amount,
            payment_info: data.payment_info || null,
            featured: data.featured,
            updated_at: new Date().toISOString(),
          })
          .eq('id', data.id);

        if (error) throw error;
        
        toast({
          title: 'Donation option updated',
          description: `"${data.title}" has been updated successfully.`,
        });
      } else {
        // Create new donation option
        const { error } = await supabase
          .from('donation_options')
          .insert({
            title: data.title,
            description: data.description,
            amount: data.amount,
            custom_amount: data.custom_amount,
            payment_info: data.payment_info || null,
            featured: data.featured,
          });

        if (error) throw error;
        
        toast({
          title: 'Donation option added',
          description: `"${data.title}" has been added successfully.`,
        });
      }

      // Reset form and call onSuccess callback
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error saving donation option:', error);
      toast({
        title: 'Error',
        description: 'Failed to save donation option. Please try again.',
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
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., General Donation, Zakat, Building Fund" {...field} />
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
                <Textarea placeholder="Enter a description for this donation option" rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="custom_amount"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Allow Custom Amount</FormLabel>
                  <FormDescription>
                    Donors can specify their own donation amount
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount ($)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="Enter amount" 
                      className="pl-8" 
                      disabled={customAmount}
                      value={field.value === null ? '' : field.value}
                      onChange={(e) => {
                        const value = e.target.value === '' ? null : parseFloat(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </div>
                </FormControl>
                {customAmount && <FormDescription>Amount field is disabled when custom amount is allowed</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="payment_info"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Information (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter additional payment details or instructions" 
                  rows={2} 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Additional information about payment methods or instructions for donors
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
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
                <FormLabel>Featured Donation Option</FormLabel>
                <FormDescription>
                  Featured options will be highlighted on the donation page
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {donationOption ? 'Update Donation Option' : 'Add Donation Option'}
        </Button>
      </form>
    </Form>
  );
};
