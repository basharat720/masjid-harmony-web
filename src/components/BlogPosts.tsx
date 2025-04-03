
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, User, Clock, ChevronRight, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

type BlogPost = {
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

const BlogPosts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(['All']);
  const navigate = useNavigate();
  
  useEffect(() => {
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
        
        // Extract unique categories
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

    fetchBlogPosts();
  }, []);
  
  // Filter posts based on search term and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  
  const handleReadMore = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  const loadMorePosts = () => {
    setVisiblePosts(prevCount => Math.min(prevCount + 4, filteredPosts.length));
  };

  return (
    <section className="py-16 bg-masjid-light">
      <div className="section-container">
        <h1 className="section-title">Masjid Blog</h1>
        <p className="text-center text-masjid-navy/80 max-w-2xl mx-auto mb-10">
          Stay updated with the latest news, events, and Islamic knowledge from our community.
        </p>
        
        {/* Search and filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-masjid-navy/50" size={18} />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Badge 
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={`cursor-pointer ${
                  activeCategory === category 
                    ? "bg-masjid-primary hover:bg-masjid-primary/90" 
                    : "hover:bg-masjid-cream"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Blog posts grid */}
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-masjid-primary"></div>
          </div>
        ) : displayedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPosts.map(post => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image_url} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="outline" className="bg-masjid-cream text-masjid-navy">
                      {post.category}
                    </Badge>
                    <div className="flex items-center text-sm text-masjid-navy/70">
                      <CalendarIcon size={14} className="mr-1" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold hover:text-masjid-gold transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center text-sm">
                    <User size={14} className="mr-1 text-masjid-navy/70" />
                    <span className="text-masjid-navy/70">{post.author}</span>
                    <Clock size={14} className="ml-3 mr-1 text-masjid-navy/70" />
                    <span className="text-masjid-navy/70">{post.read_time}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-masjid-primary hover:text-masjid-gold hover:bg-transparent p-0"
                    onClick={() => handleReadMore(post.id)}
                  >
                    Read More <ChevronRight size={16} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-masjid-navy/70">No blog posts found matching your search criteria.</p>
          </div>
        )}
        
        {/* Load more button - only show if there are more posts to load */}
        {filteredPosts.length > visiblePosts && (
          <div className="mt-10 text-center">
            <Button 
              variant="outline" 
              className="border-masjid-primary text-masjid-primary hover:bg-masjid-primary/10"
              onClick={loadMorePosts}
            >
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPosts;
