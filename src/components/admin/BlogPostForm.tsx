
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
import { Loader2, Calendar, Image, User, Clock } from 'lucide-react';
import { format } from 'date-fns';

// Define the form schema with Zod
const blogPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: 'Title is required' }),
  excerpt: z.string().min(1, { message: 'Excerpt is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  author: z.string().min(1, { message: 'Author is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  image_url: z.string().url({ message: 'Please enter a valid URL' }),
  read_time: z.string().min(1, { message: 'Read time is required' }),
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

interface BlogPostFormProps {
  blogPost?: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: string;
    image_url: string;
    read_time: string;
  };
  onSuccess?: () => void;
}

export const BlogPostForm: React.FC<BlogPostFormProps> = ({
  blogPost,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState(blogPost?.image_url || '');

  // Format date string for form input (yyyy-MM-dd)
  const formatDateForInput = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return format(date, 'yyyy-MM-dd');
    } catch (error) {
      return dateStr;
    }
  };

  // Initialize form with default values or existing blog post data
  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: blogPost ? {
      id: blogPost.id,
      title: blogPost.title,
      excerpt: blogPost.excerpt,
      content: blogPost.content,
      author: blogPost.author,
      date: formatDateForInput(blogPost.date),
      category: blogPost.category,
      image_url: blogPost.image_url,
      read_time: blogPost.read_time,
    } : {
      title: '',
      excerpt: '',
      content: '',
      author: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      category: '',
      image_url: '',
      read_time: '5 min read',
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

  const onSubmit = async (data: BlogPostFormValues) => {
    setIsSubmitting(true);
    try {
      if (data.id) {
        // Update existing blog post
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            author: data.author,
            date: data.date,
            category: data.category,
            image_url: data.image_url,
            read_time: data.read_time,
            updated_at: new Date().toISOString(),
          })
          .eq('id', data.id);

        if (error) throw error;
        
        toast({
          title: 'Blog post updated',
          description: `"${data.title}" has been updated successfully.`,
        });
      } else {
        // Create new blog post
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            author: data.author,
            date: data.date,
            category: data.category,
            image_url: data.image_url,
            read_time: data.read_time,
          });

        if (error) throw error;
        
        toast({
          title: 'Blog post added',
          description: `"${data.title}" has been added successfully.`,
        });
      }

      // Reset form and call onSuccess callback
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: 'Error',
        description: 'Failed to save blog post. Please try again.',
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
            <p className="text-sm text-muted-foreground mb-2">Featured Image Preview:</p>
            <div className="aspect-video relative rounded-md overflow-hidden bg-slate-100">
              <img
                src={imagePreview}
                alt="Preview"
                className="object-cover w-full h-full"
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
                <Input placeholder="Enter blog post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Author name" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Community, Religious Studies" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Featured Image URL</FormLabel>
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
            name="read_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Read Time</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="e.g., 5 min read" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief summary of the blog post" rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Full blog post content" rows={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {blogPost ? 'Update Blog Post' : 'Add Blog Post'}
        </Button>
      </form>
    </Form>
  );
};
