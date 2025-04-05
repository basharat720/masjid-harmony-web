
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  read_time: string;
  category: string;
  image_url: string;
};

export function useBlogPostsDisplay() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
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
      
      setBlogPosts(data || []);
      
      if (data) {
        const uniqueCategories = ['All', ...new Set(data.map(post => post.category))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
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
  
  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  const loadMorePosts = () => {
    setVisiblePosts(prevCount => Math.min(prevCount + 4, filteredPosts.length));
  };

  return {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    visiblePosts,
    loading,
    blogPosts,
    filteredPosts,
    displayedPosts,
    categories,
    loadMorePosts
  };
}
