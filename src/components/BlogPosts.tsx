
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, User, Clock, ChevronRight, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "Eid Al-Fitr Celebration Highlights",
    excerpt: "Recap of our community's joyous Eid Al-Fitr celebration with photos and memorable moments.",
    date: "2023-04-22",
    author: "Imam Abdullah",
    readTime: "5 min read",
    category: "Events",
    image: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWlkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a augue eget nunc volutpat tincidunt vel nec nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras ultrices metus id justo tristique, vel finibus nibh venenatis. Curabitur eget ex vel sapien pellentesque tempus. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Nullam tempus feugiat mi, id fermentum turpis interdum ac. Praesent ultrices, est in aliquam volutpat, nulla sapien aliquam augue, vel dapibus velit nisi non mauris. Vivamus auctor, est in aliquam aliquam, magna velit aliquam magna, vel dapibus velit nisi non mauris. Integer felis massa, congue sed fringilla et, faucibus at purus. Praesent et ante vel sapien volutpat tincidunt vel nec nulla."
  },
  {
    id: 2,
    title: "Understanding the Five Pillars of Islam",
    excerpt: "A comprehensive guide to the fundamental aspects of Islam that form the foundation of a Muslim's faith and practice.",
    date: "2023-03-15",
    author: "Shaykh Muhammad",
    readTime: "8 min read",
    category: "Education",
    image: "https://images.unsplash.com/photo-1597535973747-951442d5dbc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aXNsYW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a augue eget nunc volutpat tincidunt vel nec nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras ultrices metus id justo tristique, vel finibus nibh venenatis. Curabitur eget ex vel sapien pellentesque tempus. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Nullam tempus feugiat mi, id fermentum turpis interdum ac. Praesent ultrices, est in aliquam volutpat, nulla sapien aliquam augue, vel dapibus velit nisi non mauris. Vivamus auctor, est in aliquam aliquam, magna velit aliquam magna, vel dapibus velit nisi non mauris. Integer felis massa, congue sed fringilla et, faucibus at purus. Praesent et ante vel sapien volutpat tincidunt vel nec nulla."
  },
  {
    id: 3,
    title: "Ramadan Preparations: A Practical Guide",
    excerpt: "Tips and advice on how to spiritually and physically prepare for the blessed month of Ramadan.",
    date: "2023-02-20",
    author: "Sister Aisha",
    readTime: "6 min read",
    category: "Seasonal",
    image: "https://images.unsplash.com/photo-1532635248-cdd3d399f56c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFtYWRhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a augue eget nunc volutpat tincidunt vel nec nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras ultrices metus id justo tristique, vel finibus nibh venenatis. Curabitur eget ex vel sapien pellentesque tempus. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Nullam tempus feugiat mi, id fermentum turpis interdum ac. Praesent ultrices, est in aliquam volutpat, nulla sapien aliquam augue, vel dapibus velit nisi non mauris. Vivamus auctor, est in aliquam aliquam, magna velit aliquam magna, vel dapibus velit nisi non mauris. Integer felis massa, congue sed fringilla et, faucibus at purus. Praesent et ante vel sapien volutpat tincidunt vel nec nulla."
  },
  {
    id: 4,
    title: "Youth Program Launch: Nurturing Future Leaders",
    excerpt: "Announcing our new youth development program focused on Islamic values, leadership, and community service.",
    date: "2023-01-10",
    author: "Brother Yusuf",
    readTime: "4 min read",
    category: "Youth",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bXVzbGltJTIweW91dGh8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a augue eget nunc volutpat tincidunt vel nec nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras ultrices metus id justo tristique, vel finibus nibh venenatis. Curabitur eget ex vel sapien pellentesque tempus. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Nullam tempus feugiat mi, id fermentum turpis interdum ac. Praesent ultrices, est in aliquam volutpat, nulla sapien aliquam augue, vel dapibus velit nisi non mauris. Vivamus auctor, est in aliquam aliquam, magna velit aliquam magna, vel dapibus velit nisi non mauris. Integer felis massa, congue sed fringilla et, faucibus at purus. Praesent et ante vel sapien volutpat tincidunt vel nec nulla."
  },
  // Additional blog posts for load more functionality
  {
    id: 5,
    title: "The Importance of Charity in Islam",
    excerpt: "Exploring the significance of giving and the impact of charity in Islamic teachings and community building.",
    date: "2022-12-15",
    author: "Imam Hassan",
    readTime: "7 min read",
    category: "Community",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbafc3f4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hhcml0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a augue eget nunc volutpat tincidunt vel nec nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras ultrices metus id justo tristique, vel finibus nibh venenatis. Curabitur eget ex vel sapien pellentesque tempus. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Nullam tempus feugiat mi, id fermentum turpis interdum ac. Praesent ultrices, est in aliquam volutpat, nulla sapien aliquam augue, vel dapibus velit nisi non mauris. Vivamus auctor, est in aliquam aliquam, magna velit aliquam magna, vel dapibus velit nisi non mauris. Integer felis massa, congue sed fringilla et, faucibus at purus. Praesent et ante vel sapien volutpat tincidunt vel nec nulla."
  },
  {
    id: 6,
    title: "Learning Arabic: A Guide for Beginners",
    excerpt: "Tips and resources for Muslims looking to start their journey in learning the Arabic language for Quran study.",
    date: "2022-11-20",
    author: "Dr. Ahmed",
    readTime: "9 min read",
    category: "Education",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a augue eget nunc volutpat tincidunt vel nec nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras ultrices metus id justo tristique, vel finibus nibh venenatis. Curabitur eget ex vel sapien pellentesque tempus. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Nullam tempus feugiat mi, id fermentum turpis interdum ac. Praesent ultrices, est in aliquam volutpat, nulla sapien aliquam augue, vel dapibus velit nisi non mauris. Vivamus auctor, est in aliquam aliquam, magna velit aliquam magna, vel dapibus velit nisi non mauris. Integer felis massa, congue sed fringilla et, faucibus at purus. Praesent et ante vel sapien volutpat tincidunt vel nec nulla."
  },
  {
    id: 7,
    title: "Building a Strong Muslim Marriage",
    excerpt: "Guidance on nurturing a healthy and fulfilling marriage based on Islamic principles and mutual respect.",
    date: "2022-10-05",
    author: "Sister Fatima",
    readTime: "8 min read",
    category: "Family",
    image: "https://images.unsplash.com/photo-1611516491426-03025e6043c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVzbGltJTIwZmFtaWx5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a augue eget nunc volutpat tincidunt vel nec nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras ultrices metus id justo tristique, vel finibus nibh venenatis. Curabitur eget ex vel sapien pellentesque tempus. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Nullam tempus feugiat mi, id fermentum turpis interdum ac. Praesent ultrices, est in aliquam volutpat, nulla sapien aliquam augue, vel dapibus velit nisi non mauris. Vivamus auctor, est in aliquam aliquam, magna velit aliquam magna, vel dapibus velit nisi non mauris. Integer felis massa, congue sed fringilla et, faucibus at purus. Praesent et ante vel sapien volutpat tincidunt vel nec nulla."
  },
  {
    id: 8,
    title: "The Etiquettes of the Mosque",
    excerpt: "Learn about the proper manners and customs when visiting and praying in the mosque according to Islamic tradition.",
    date: "2022-09-15",
    author: "Imam Omar",
    readTime: "5 min read",
    category: "Education",
    image: "https://images.unsplash.com/photo-1584032581712-34fe2dfdbd96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9zcXVlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a augue eget nunc volutpat tincidunt vel nec nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras ultrices metus id justo tristique, vel finibus nibh venenatis. Curabitur eget ex vel sapien pellentesque tempus. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Nullam tempus feugiat mi, id fermentum turpis interdum ac. Praesent ultrices, est in aliquam volutpat, nulla sapien aliquam augue, vel dapibus velit nisi non mauris. Vivamus auctor, est in aliquam aliquam, magna velit aliquam magna, vel dapibus velit nisi non mauris. Integer felis massa, congue sed fringilla et, faucibus at purus. Praesent et ante vel sapien volutpat tincidunt vel nec nulla."
  }
];

// Categories for filtering
const categories = ["All", "Events", "Education", "Seasonal", "Youth", "Community", "Family"];

const BlogPosts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [visiblePosts, setVisiblePosts] = useState(4);
  const navigate = useNavigate();
  
  // Filter posts based on search term and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  
  const handleReadMore = (postId: number) => {
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
        {displayedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPosts.map(post => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
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
                    <span className="text-masjid-navy/70">{post.readTime}</span>
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
