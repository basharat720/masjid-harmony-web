
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, User, Clock, ChevronRight, Search, FileText, ArrowRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';

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

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
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

    fetchBlogPosts();
  }, []);
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  const handleReadPost = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-8 pb-16 bg-masjid-light">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold text-masjid-primary text-center mb-4">Masjid Blog</h1>
          <p className="text-center text-masjid-navy/80 max-w-2xl mx-auto mb-10">
            Insights, stories, and updates from our community.
          </p>
          
          {/* Featured post */}
          {!loading && featuredPost && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-masjid-primary mb-6 flex items-center">
                <span className="mr-2">Featured Post</span>
                <div className="flex-grow h-px bg-masjid-gold/30"></div>
              </h2>
              <Card className="overflow-hidden border-none shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={featuredPost.image_url} 
                      alt={featuredPost.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6">
                    <Badge className="w-fit mb-2 bg-masjid-gold text-white">
                      {featuredPost.category}
                    </Badge>
                    <h3 className="text-2xl md:text-3xl font-bold text-masjid-primary mb-3">
                      {featuredPost.title}
                    </h3>
                    <p className="text-masjid-navy/80 mb-4 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-masjid-navy/70 mb-6">
                      <User size={16} className="mr-1" />
                      <span className="mr-4">{featuredPost.author}</span>
                      <CalendarIcon size={16} className="mr-1" />
                      <span className="mr-4">
                        {new Date(featuredPost.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <Clock size={16} className="mr-1" />
                      <span>{featuredPost.read_time}</span>
                    </div>
                    <Button 
                      className="cta-button w-fit"
                      onClick={() => handleReadPost(featuredPost.id)}
                    >
                      Read Article <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
          
          {/* Search and filters */}
          <div className="mb-10 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-masjid-navy/50" size={18} />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center mt-4">
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
          
          {/* All blog posts */}
          <h2 className="text-2xl font-bold text-masjid-primary mb-6 flex items-center">
            <span className="mr-2">All Posts</span>
            <div className="flex-grow h-px bg-masjid-primary/30"></div>
          </h2>
          
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-masjid-primary"></div>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-masjid-cream/50 group">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image_url} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <CardHeader className="pb-2">
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
                    <CardTitle className="text-xl font-bold text-masjid-primary group-hover:text-masjid-gold transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between pt-0">
                    <div className="flex items-center text-sm">
                      <User size={14} className="mr-1 text-masjid-navy/70" />
                      <span className="text-masjid-navy/70">{post.author}</span>
                      <Clock size={14} className="ml-3 mr-1 text-masjid-navy/70" />
                      <span className="text-masjid-navy/70">{post.read_time}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-masjid-primary hover:text-masjid-gold hover:bg-transparent p-0"
                      onClick={() => handleReadPost(post.id)}
                    >
                      Read More <ChevronRight size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <FileText className="mx-auto h-16 w-16 text-masjid-navy/30 mb-4" />
              <h3 className="text-xl font-semibold text-masjid-navy">No Posts Found</h3>
              <p className="text-masjid-navy/70 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
