
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
import { Loader2, Image } from 'lucide-react';

// Define the form schema with Zod
const gallerySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  image_url: z.string().url({ message: 'Please enter a valid URL' }),
  category: z.string().min(1, { message: 'Category is required' }),
  featured: z.boolean().default(false),
});

type GalleryFormValues = z.infer<typeof gallerySchema>;

interface GalleryFormProps {
  galleryImage?: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    category: string;
    featured: boolean;
  };
  onSuccess?: () => void;
}

export const GalleryForm: React.FC<GalleryFormProps> = ({
  galleryImage,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState(galleryImage?.image_url || '');

  // Initialize form with default values or existing gallery data
  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: galleryImage ? {
      id: galleryImage.id,
      title: galleryImage.title,
      description: galleryImage.description || '',
      image_url: galleryImage.image_url,
      category: galleryImage.category,
      featured: galleryImage.featured,
    } : {
      title: '',
      description: '',
      image_url: '',
      category: '',
      featured: false,
    },
  });

  // Update image preview when URL changes
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'image_url' && value.image_url) {
        setImagePreview(value.image_url as string);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async (data: GalleryFormValues) => {
    setIsSubmitting(true);
    try {
      if (data.id) {
        // Update existing gallery image
        const { error } = await supabase
          .from('gallery')
          .update({
            title: data.title,
            description: data.description,
            image_url: data.image_url,
            category: data.category,
            featured: data.featured,
            updated_at: new Date().toISOString(),
          })
          .eq('id', data.id);

        if (error) throw error;
        
        toast({
          title: 'Gallery image updated',
          description: 'The gallery image has been updated successfully.',
        });
      } else {
        // Create new gallery image
        const { error } = await supabase
          .from('gallery')
          .insert({
            title: data.title,
            description: data.description,
            image_url: data.image_url,
            category: data.category,
            featured: data.featured,
          });

        if (error) throw error;
        
        toast({
          title: 'Gallery image added',
          description: 'The gallery image has been added successfully.',
        });
      }

      // Reset form and call onSuccess callback
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error saving gallery image:', error);
      toast({
        title: 'Error',
        description: 'Failed to save gallery image. Please try again.',
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
        
        {imagePreview && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">Image Preview:</p>
            <div className="aspect-video relative rounded-md overflow-hidden bg-slate-100">
              <img
                src={imagePreview}
                alt="Preview"
                className="object-contain w-full h-full"
                onError={() => setImagePreview('')}
              />
            </div>
          </div>
        )}
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter image title" {...field} />
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
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter image description" rows={3} {...field} />
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
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <div className="relative">
                  <Image className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="https://example.com/image.jpg" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Events, Masjid, Community" {...field} />
              </FormControl>
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
                <FormLabel>Featured Image</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Featured images will be highlighted in the gallery
                </p>
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {galleryImage ? 'Update Image' : 'Add Image'}
        </Button>
      </form>
    </Form>
  );
};
