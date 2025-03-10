
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from '../integrations/supabase/client';

// Fallback blog posts data for when Supabase connection fails
const fallbackBlogPosts = [
  {
    id: 1,
    title: "Eid Al-Fitr Celebration Highlights",
    excerpt: "Recap of our community's joyous Eid Al-Fitr celebration with photos and memorable moments.",
    date: "2023-04-22",
    author: "Imam Abdullah",
    readTime: "5 min read",
    category: "Events",
    image: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWlkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a augue eget nunc volutpat tincidunt vel nec nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras ultrices metus id justo tristique, vel finibus nibh venenatis. Curabitur eget ex vel sapien pellentesque tempus. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Nullam tempus feugiat mi, id fermentum turpis interdum ac. Praesent ultrices, est in aliquam volutpat, nulla sapien aliquam augue, vel dapibus velit nisi non mauris. Vivamus auctor, est in aliquam aliquam, magna velit aliquam magna, vel dapibus velit nisi non mauris. Integer felis massa, congue sed fringilla et, faucibus at purus. Praesent et ante vel sapien volutpat tincidunt vel nec nulla.\n\nIn hac habitasse platea dictumst. Sed efficitur, nisl a fermentum tincidunt, massa purus finibus risus, eu aliquam nulla risus nec tortor. Sed efficitur, nisl a fermentum tincidunt, massa purus finibus risus, eu aliquam nulla risus nec tortor. Nulla facilisi. Nam auctor, est in aliquam aliquam, magna velit aliquam magna, vel dapibus velit nisi non mauris. Integer felis massa, congue sed fringilla et, faucibus at purus. Praesent et ante vel sapien volutpat tincidunt vel nec nulla.\n\nNullam tempus feugiat mi, id fermentum turpis interdum ac. Praesent ultrices, est in aliquam volutpat, nulla sapien aliquam augue, vel dapibus velit nisi non mauris. Vivamus auctor, est in aliquam aliquam, magna velit aliquam magna, vel dapibus velit nisi non mauris. Integer felis massa, congue sed fringilla et, faucibus at purus. Praesent et ante vel sapien volutpat tincidunt vel nec nulla."
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
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a augue eget nunc volutpat tincidunt vel nec nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras ultrices metus id justo tristique, vel finibus nibh venenatis. Curabitur eget ex vel sapien pellentesque tempus. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Nullam tempus feugiat mi, id fermentum turpis interdum ac. Praesent ultrices, est in aliquam volutpat, nulla sapien aliquam augue, vel dapibus velit nisi non mauris. Vivamus auctor, est in aliquam aliquam, magna velit aliquam magna, vel dapibus velit nisi non mauris. Integer felis massa, congue sed fringilla et, faucibus at purus. Praesent et ante vel sapien volutpat tincidunt vel nec nulla.\n\nIn hac habitasse platea dictumst. Sed efficitur, nisl a fermentum tincidunt, massa purus finibus risus, eu aliquam nulla risus nec tortor. Sed efficitur, nisl a fermentum tincidunt, massa purus finibus risus, eu aliquam nulla risus nec tortor. Nulla facilisi. Nam auctor, est in aliquam aliquam, magna velit aliquam magna, vel dapibus velit nisi non mauris. Integer felis massa, congue sed fringilla et, faucibus at purus. Praesent et ante vel sapien volutpat tincidunt vel nec nulla.\n\nThe Five Pillars of Islam are:\n\n1. Shahada (Faith): The declaration of faith, stating that \"There is no god but Allah, and Muhammad is the messenger of Allah.\"\n\n2. Salat (Prayer): Performing the five daily prayers, which are Fajr, Dhuhr, Asr, Maghrib, and Isha.\n\n3. Zakat (Charity): Giving a portion of one's wealth to those in need, typically 2.5% of one's savings annually.\n\n4. Sawm (Fasting): Fasting during the month of Ramadan from dawn until sunset.\n\n5. Hajj (Pilgrimage): Making the pilgrimage to Mecca at least once in a lifetime if physically and financially able.\n\nThese pillars serve as the foundation of a Muslim's faith and practice, guiding their relationship with Allah and their interactions with their community."
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
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a augue eget nunc volutpat tincidunt vel nec nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras ultrices metus id justo tristique, vel finibus nibh venenatis. Curabitur eget ex vel sapien pellentesque tempus. Donec varius magna vel eros vehicula, vel sagittis metus feugiat. Donec varius magna vel eros vehicula, vel sagittis metus feugiat.\n\nPreparing for Ramadan: A Month-by-Month Guide\n\n1. One Month Before Ramadan:\n   - Begin adjusting your sleep schedule gradually to prepare for early morning suhoor meals.\n   - Start reading more Quran daily to build a habit.\n   - Reduce caffeine intake gradually to minimize withdrawal symptoms during fasting.\n   - Begin planning your Ramadan goals and intentions.\n\n2. Two Weeks Before Ramadan:\n   - Start incorporating voluntary fasts on Mondays and Thursdays.\n   - Create a Ramadan budget for charity, iftar gatherings, and Eid celebrations.\n   - Stock up on essential groceries and prepare meals that can be frozen.\n   - Organize your schedule to accommodate increased worship during Ramadan.\n\n3. The Week Before Ramadan:\n   - Deep clean your home to create a peaceful environment for worship.\n   - Prepare a dedicated prayer space in your home.\n   - Finalize your Ramadan goals and write them down.\n   - Connect with family and friends to plan community iftars and taraweeh prayers.\n\nRemember, Ramadan is not just about abstaining from food and drink, but also about spiritual growth, increased charity, and strengthening your connection with Allah. Use this time wisely to build habits that will continue throughout the year."
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

// Get related posts function
const getRelatedPosts = (currentId: number, category: string, allPosts: any[]) => {
  return allPosts
    .filter(post => post.id !== currentId && post.category === category)
    .slice(0, 3);
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState<any[]>(fallbackBlogPosts);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    
    const fetchBlogPosts = async () => {
      try {
        // Try to fetch from Supabase first
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          const formattedPosts = data.map(post => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            date: post.date,
            readTime: post.read_time,
            category: post.category,
            image: post.image_url
          }));
          setAllPosts(formattedPosts);
        }
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        // Fallback to local data
        setAllPosts(fallbackBlogPosts);
      }
    };
    
    fetchBlogPosts();
  }, []);
  
  useEffect(() => {
    if (allPosts.length > 0) {
      // Find the blog post with the matching ID
      const postId = Number(id);
      const foundPost = allPosts.find(post => String(post.id) === id);
      
      if (foundPost) {
        setPost(foundPost);
        setRelatedPosts(getRelatedPosts(postId, foundPost.category, allPosts));
      }
      
      setLoading(false);
    }
  }, [id, allPosts]);

  const formatPostContent = (content: string) => {
    if (!content) return "";
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph}</p>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-masjid-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-masjid-light">
          <div className="section-container py-20">
            <h1 className="text-2xl font-bold text-center mb-4">Blog Post Not Found</h1>
            <p className="text-center text-masjid-navy/80 mb-8">
              Sorry, the blog post you're looking for doesn't exist or has been removed.
            </p>
            <div className="flex justify-center">
              <Button asChild>
                <Link to="/blog" className="flex items-center">
                  <ArrowLeft size={16} className="mr-2" /> Back to Blog
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-masjid-light">
        <div className="w-full h-[30vh] md:h-[40vh] lg:h-[50vh] relative">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
            <div className="container mx-auto px-4 pb-8 md:pb-12">
              <Badge className="mb-4 bg-masjid-gold text-white border-none">
                {post.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80">
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  {post.readTime}
                </div>
                <div className="flex items-center">
                  <CalendarIcon size={16} className="mr-2" />
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-10">
          <div className="lg:flex gap-8">
            {/* Main content */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
                <div className="prose max-w-none text-masjid-navy/90">
                  {formatPostContent(post.content)}
                </div>
                
                <Separator className="my-8" />
                
                <div className="flex flex-wrap justify-between items-center">
                  <Button asChild variant="outline" className="mb-4 sm:mb-0">
                    <Link to="/blog" className="flex items-center">
                      <ArrowLeft size={16} className="mr-2" /> Back to Blog
                    </Link>
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-masjid-navy/70">Share:</span>
                    <Button size="icon" variant="ghost" className="rounded-full text-masjid-gold">
                      <Share2 size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold text-masjid-primary mb-4">Related Articles</h3>
                
                {relatedPosts.length > 0 ? (
                  <div className="space-y-4">
                    {relatedPosts.map(relatedPost => (
                      <Card key={relatedPost.id} className="overflow-hidden">
                        <Link to={`/blog/${relatedPost.id}`}>
                          <CardContent className="p-0">
                            <div className="flex flex-col sm:flex-row">
                              <div className="sm:w-1/3 h-24">
                                <img 
                                  src={relatedPost.image} 
                                  alt={relatedPost.title} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="sm:w-2/3 p-3">
                                <h4 className="font-medium text-sm mb-1 text-masjid-primary hover:text-masjid-gold transition-colors line-clamp-2">
                                  {relatedPost.title}
                                </h4>
                                <div className="text-xs text-masjid-navy/70 flex items-center">
                                  <CalendarIcon size={12} className="mr-1" />
                                  {new Date(relatedPost.date).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-masjid-navy/70">No related articles found.</p>
                )}
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-masjid-primary mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(allPosts.map(post => post.category))).map(category => (
                    <Link key={category} to="/blog">
                      <Badge variant="outline" className="hover:bg-masjid-cream cursor-pointer">
                        {category}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
