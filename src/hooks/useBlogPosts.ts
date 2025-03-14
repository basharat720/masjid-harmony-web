
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image_url: string;
  read_time: string;
  created_at: string;
  updated_at: string;
};

export function useBlogPosts() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editBlogPost, setEditBlogPost] = useState<BlogPost | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBlogPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load blog posts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const handleEdit = (post: BlogPost) => {
    setEditBlogPost(post);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBlogPosts(blogPosts.filter(post => post.id !== id));
      toast({
        title: 'Blog post deleted',
        description: 'The blog post has been deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete blog post',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handleAddSuccess = () => {
    setIsAddDialogOpen(false);
    fetchBlogPosts();
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setEditBlogPost(null);
    fetchBlogPosts();
  };

  return {
    blogPosts,
    loading,
    editBlogPost,
    isAddDialogOpen,
    isEditDialogOpen,
    deleteId,
    setIsAddDialogOpen,
    setIsEditDialogOpen,
    setDeleteId,
    fetchBlogPosts,
    handleEdit,
    handleDelete,
    handleAddSuccess,
    handleEditSuccess
  };
}
