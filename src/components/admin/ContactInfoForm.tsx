
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from 'lucide-react';

// Define the form schema with Zod
const contactInfoSchema = z.object({
  id: z.string().optional(),
  type: z.string().min(1, { message: 'Type is required' }),
  value: z.string().min(1, { message: 'Value is required' }),
  icon: z.string().optional(),
  display_order: z.number().int().positive(),
});

type ContactInfoFormValues = z.infer<typeof contactInfoSchema>;

interface ContactInfoFormProps {
  contactInfo?: {
    id: string;
    type: string;
    value: string;
    icon: string;
    display_order: number;
  };
  onSuccess?: () => void;
  nextOrder?: number;
}

export const ContactInfoForm: React.FC<ContactInfoFormProps> = ({
  contactInfo,
  onSuccess,
  nextOrder = 1,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Initialize form with default values or existing contact info data
  const form = useForm<ContactInfoFormValues>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: contactInfo ? {
      id: contactInfo.id,
      type: contactInfo.type,
      value: contactInfo.value,
      icon: contactInfo.icon || '',
      display_order: contactInfo.display_order,
    } : {
      type: '',
      value: '',
      icon: '',
      display_order: nextOrder,
    },
  });

  const onSubmit = async (data: ContactInfoFormValues) => {
    setIsSubmitting(true);
    try {
      if (data.id) {
        // Update existing contact info
        const { error } = await supabase
          .from('contact_info')
          .update({
            type: data.type,
            value: data.value,
            icon: data.icon || null,
            display_order: data.display_order,
            updated_at: new Date().toISOString(),
          })
          .eq('id', data.id);

        if (error) throw error;
        
        toast({
          title: 'Contact info updated',
          description: 'The contact information has been updated successfully.',
        });
      } else {
        // Create new contact info
        const { error } = await supabase
          .from('contact_info')
          .insert({
            type: data.type,
            value: data.value,
            icon: data.icon || null,
            display_order: data.display_order,
          });

        if (error) throw error;
        
        toast({
          title: 'Contact info added',
          description: 'The contact information has been added successfully.',
        });
      }

      // Reset form and call onSuccess callback
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error saving contact info:', error);
      toast({
        title: 'Error',
        description: 'Failed to save contact information. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Define contact info types
  const contactTypes = [
    { value: 'address', label: 'Address' },
    { value: 'phone', label: 'Phone Number' },
    { value: 'email', label: 'Email Address' },
    { value: 'hours', label: 'Office Hours' },
    { value: 'social', label: 'Social Media' },
    { value: 'other', label: 'Other' },
  ];

  // Define icon options
  const iconOptions = [
    { value: '', label: 'None' },
    { value: 'mapPin', label: 'Map Pin' },
    { value: 'phone', label: 'Phone' },
    { value: 'mail', label: 'Mail/Email' },
    { value: 'clock', label: 'Clock' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'youtube', label: 'YouTube' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <input type="hidden" {...form.register('id')} />
        <input type="hidden" {...form.register('display_order', { valueAsNumber: true })} />
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contact type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {contactTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input placeholder="Enter contact details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon (Optional)</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      {icon.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {contactInfo ? 'Update Contact Info' : 'Add Contact Info'}
        </Button>
      </form>
    </Form>
  );
};
