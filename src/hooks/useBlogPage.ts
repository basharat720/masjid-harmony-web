
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from './useBlogPostsDisplay';

export function useBlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);
  
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  async function fetchBlogPosts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        console.error('Error fetching blog posts:', error);
        return;
      }
      
      if (data && data.length > 0) {
        // Set the first post as featured
        setFeaturedPost(data[0]);
        setBlogPosts(data.slice(1) || []);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(data.map(post => post.category))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return {
    blogPosts,
    featuredPost,
    loading,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    categories,
    filteredPosts
  };
}
