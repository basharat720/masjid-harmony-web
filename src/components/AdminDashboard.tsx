
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BookOpen, 
  Calendar, 
  Settings, 
  LogOut,
  Menu,
  X,
  Save,
  AlertTriangle,
  CheckCircle,
  Trash2,
  Edit,
  Plus,
  Loader2,
  ImageIcon,
  HeartHandshake,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const AdminDashboard = () => {
  // Helper function to format time strings
  const formatTimeString = (timeStr: string): string => {
    if (!timeStr) return "N/A";
    
    try {
      // If it's already in AM/PM format, return as is
      if (timeStr.includes('AM') || timeStr.includes('PM')) {
        return timeStr;
      }
      
      // Parse time string (expected format from DB: "HH:MM:SS")
      const [hours, minutes] = timeStr.split(':').map(Number);
      
      // Convert to 12-hour format
      const period = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12;
      
      return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
    } catch (error) {
      console.error("Error formatting time:", error);
      return timeStr;
    }
  };

  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingPrayerId, setEditingPrayerId] = useState<string | null>(null);
  
  // State for data
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    address: '123 Islamic Way, Harmony City',
    phone: '(123) 456-7890',
    email: 'info@masjidimamhussain.org',
    socialLinks: {
      facebook: 'https://facebook.com/masjidimamhussain',
      instagram: 'https://instagram.com/masjidimamhussain',
      twitter: 'https://twitter.com/masjidimamhussain',
      youtube: 'https://youtube.com/masjidimamhussain',
    }
  });
  const [donationSettings, setDonationSettings] = useState({
    headline: 'Support Our Masjid',
    description: 'Your donations help us maintain the masjid, support community programs, and organize educational activities.',
    paypalLink: 'https://paypal.me/masjidimamhussain',
    venmoLink: 'https://venmo.com/masjidimamhussain',
    zelleName: 'masjid@imamhussain.org',
    bankName: 'Islamic Community Bank',
    accountName: 'Masjid Imam Hussain',
    accountNumber: '1234567890',
    routingNumber: '123456789',
  });
  
  // Fetch data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch prayer times
        const { data: prayerTimesData, error: prayerTimesError } = await supabase
          .from('prayer_times')
          .select('*')
          .order('id');
          
        if (prayerTimesError) throw prayerTimesError;
        if (prayerTimesData) setPrayerTimes(prayerTimesData);
        
        // Fetch blog posts
        const { data: blogPostsData, error: blogPostsError } = await supabase
          .from('blog_posts')
          .select('*')
          .order('date', { ascending: false });
          
        if (blogPostsError) throw blogPostsError;
        if (blogPostsData) setBlogPosts(blogPostsData);
        
        // Fetch events
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .order('date');
          
        if (eventsError) throw eventsError;
        if (eventsData) setEvents(eventsData);
        
        // Placeholder for gallery images fetch
        // In a real app, you would fetch from Supabase storage or another table
        setGalleryImages([
          { id: '1', title: 'Masjid Interior', url: '/images/gallery/interior.jpg', alt: 'Interior of the masjid' },
          { id: '2', title: 'Eid Celebration', url: '/images/gallery/eid.jpg', alt: 'Eid celebration' },
          { id: '3', title: 'Friday Prayer', url: '/images/gallery/friday.jpg', alt: 'Friday congregation' },
        ]);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load data. Please try refreshing the page.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  const handleLogout = () => {
    authService.logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Handle prayer time update
  const handlePrayerTimesUpdate = async () => {
    setIsLoading(true);
    
    try {
      // For each prayer, update both adhan and iqamah times
      for (const prayer of prayerTimes) {
        const { error } = await supabase
          .from('prayer_times')
          .update({
            adhan_time: prayer.adhan_time,
            iqamah_time: prayer.iqamah_time,
            fiqa_type: prayer.fiqa_type || 'Jafferia',
            updated_at: new Date().toISOString(),
          })
          .eq('id', prayer.id);
          
        if (error) throw error;
      }
      
      toast({
        title: "Prayer Times Updated",
        description: "Prayer times have been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating prayer times:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating prayer times. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle individual prayer time update
  const handleSinglePrayerTimeUpdate = async (prayerId) => {
    setIsLoading(true);
    
    try {
      const prayer = prayerTimes.find(p => p.id === prayerId);
      
      if (!prayer) {
        throw new Error('Prayer not found');
      }
      
      const { error } = await supabase
        .from('prayer_times')
        .update({
          adhan_time: prayer.adhan_time,
          iqamah_time: prayer.iqamah_time,
          fiqa_type: prayer.fiqa_type || 'Jafferia',
          updated_at: new Date().toISOString(),
        })
        .eq('id', prayer.id);
        
      if (error) throw error;
      
      toast({
        title: `${prayer.name} Prayer Updated`,
        description: `${prayer.name} prayer time has been successfully updated.`,
      });
      
      setEditingPrayerId(null);
    } catch (error) {
      console.error('Error updating prayer time:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the prayer time. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePrayerTimeChange = (index, field, value) => {
    const updatedPrayerTimes = [...prayerTimes];
    updatedPrayerTimes[index][field] = value;
    setPrayerTimes(updatedPrayerTimes);
  };

  // Handle event management
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'General',
    featured: false
  });

  const handleEventChange = (field, value) => {
    setNewEvent({
      ...newEvent,
      [field]: value
    });
  };

  const handleAddEvent = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('events')
        .insert([{
          title: newEvent.title,
          description: newEvent.description,
          date: newEvent.date,
          time: newEvent.time,
          location: newEvent.location,
          category: newEvent.category,
          featured: newEvent.featured
        }]);
        
      if (error) throw error;
      
      // Refresh events list
      const { data } = await supabase
        .from('events')
        .select('*')
        .order('date');
        
      if (data) setEvents(data);
      
      // Reset form
      setNewEvent({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: 'General',
        featured: false
      });
      
      toast({
        title: "Event Added",
        description: "The event has been successfully added.",
      });
    } catch (error) {
      console.error('Error adding event:', error);
      toast({
        title: "Add Failed",
        description: "There was an error adding the event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update events list
      setEvents(events.filter(event => event.id !== id));
      
      toast({
        title: "Event Deleted",
        description: "The event has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Delete Failed",
        description: "There was an error deleting the event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Blog post management
  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    author: '',
    excerpt: '',
    content: '',
    category: '',
    image_url: '',
    read_time: '5 min'
  });

  const handleBlogPostChange = (field, value) => {
    setNewBlogPost({
      ...newBlogPost,
      [field]: value
    });
  };

  const handleAddBlogPost = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert([{
          title: newBlogPost.title,
          author: newBlogPost.author,
          excerpt: newBlogPost.excerpt,
          content: newBlogPost.content,
          category: newBlogPost.category,
          image_url: newBlogPost.image_url || '/placeholder.svg',
          read_time: newBlogPost.read_time,
          date: new Date().toISOString().split('T')[0]
        }]);
        
      if (error) throw error;
      
      // Refresh blog posts list
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });
        
      if (data) setBlogPosts(data);
      
      // Reset form
      setNewBlogPost({
        title: '',
        author: '',
        excerpt: '',
        content: '',
        category: '',
        image_url: '',
        read_time: '5 min'
      });
      
      toast({
        title: "Blog Post Added",
        description: "The blog post has been successfully added.",
      });
    } catch (error) {
      console.error('Error adding blog post:', error);
      toast({
        title: "Add Failed",
        description: "There was an error adding the blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBlogPost = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update blog posts list
      setBlogPosts(blogPosts.filter(post => post.id !== id));
      
      toast({
        title: "Blog Post Deleted",
        description: "The blog post has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Delete Failed",
        description: "There was an error deleting the blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Gallery management
  const [newImage, setNewImage] = useState({
    title: '',
    alt: '',
    url: ''
  });

  const handleImageChange = (field, value) => {
    setNewImage({
      ...newImage,
      [field]: value
    });
  };

  const handleAddImage = () => {
    // In a real app, you would upload to Supabase storage
    // and then save the URL in the database
    const newId = String(galleryImages.length + 1);
    
    setGalleryImages([
      ...galleryImages,
      {
        id: newId,
        title: newImage.title,
        url: newImage.url || '/placeholder.svg',
        alt: newImage.alt
      }
    ]);
    
    setNewImage({
      title: '',
      alt: '',
      url: ''
    });
    
    toast({
      title: "Image Added",
      description: "The image has been successfully added to the gallery.",
    });
  };

  const handleDeleteImage = (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    // In a real app, you would also delete from Supabase storage
    setGalleryImages(galleryImages.filter(image => image.id !== id));
    
    toast({
      title: "Image Deleted",
      description: "The image has been successfully deleted from the gallery.",
    });
  };

  // Contact info management
  const handleContactInfoChange = (field, value) => {
    setContactInfo({
      ...contactInfo,
      [field]: value
    });
  };

  const handleSocialLinkChange = (platform, value) => {
    setContactInfo({
      ...contactInfo,
      socialLinks: {
        ...contactInfo.socialLinks,
        [platform]: value
      }
    });
  };

  const handleSaveContactInfo = () => {
    // In a real app, you would save to Supabase
    toast({
      title: "Contact Info Updated",
      description: "The contact information has been successfully updated.",
    });
  };

  // Donation settings management
  const handleDonationSettingChange = (field, value) => {
    setDonationSettings({
      ...donationSettings,
      [field]: value
    });
  };

  const handleSaveDonationSettings = () => {
    // In a real app, you would save to Supabase
    toast({
      title: "Donation Settings Updated",
      description: "The donation settings have been successfully updated.",
    });
  };
  
  // Stats for the dashboard
  const stats = [
    { 
      title: "Total Members", 
      value: "345", 
      icon: <Users size={24} className="text-masjid-gold" />,
      description: "Registered community members"
    },
    { 
      title: "Weekly Attendance", 
      value: "120", 
      icon: <Users size={24} className="text-masjid-primary" />,
      description: "Average weekly prayer attendance"
    },
    { 
      title: "Prayer Times Updated", 
      value: "Today", 
      icon: <Calendar size={24} className="text-masjid-gold" />,
      description: "Last update of prayer schedule"
    },
    { 
      title: "Blog Posts", 
      value: blogPosts.length.toString(), 
      icon: <FileText size={24} className="text-masjid-primary" />,
      description: "Published articles and news"
    }
  ];
  
  return (
    <div className="flex min-h-screen bg-masjid-light">
      {/* Desktop Sidebar */}
      <div className="w-64 bg-masjid-primary text-white min-h-screen p-4 hidden md:block">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-white text-sm mt-1">Masjid Imam Hussain</p>
          <p className="text-masjid-gold text-sm">Fiqa Jafferia</p>
          {currentUser && (
            <div className="mt-2 p-2 bg-white/10 rounded-md">
              <p className="text-sm font-medium">Welcome, {currentUser.username}</p>
              <p className="text-xs opacity-70">{currentUser.role}</p>
            </div>
          )}
        </div>
        
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
              activeTab === "dashboard" ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("prayer-times")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
              activeTab === "prayer-times" ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <Calendar size={20} />
            <span>Prayer Times</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("events")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
              activeTab === "events" ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <Calendar size={20} />
            <span>Events</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("blog")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
              activeTab === "blog" ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <FileText size={20} />
            <span>Blog Posts</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("gallery")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
              activeTab === "gallery" ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <ImageIcon size={20} />
            <span>Gallery</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("contact")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
              activeTab === "contact" ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <Phone size={20} />
            <span>Contact Info</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("donations")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
              activeTab === "donations" ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <HeartHandshake size={20} />
            <span>Support Our Masjid</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
              activeTab === "settings" ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-md text-red-200 hover:bg-red-900/20 transition mt-8"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>
      
      {/* Mobile navigation header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-masjid-primary text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={handleLogout}
            >
              <LogOut size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 pt-4 border-t border-white/10 animate-in slide-in-from-top duration-300">
            <nav className="space-y-1">
              <button 
                onClick={() => {
                  setActiveTab("dashboard");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
                  activeTab === "dashboard" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </button>
              
              <button 
                onClick={() => {
                  setActiveTab("prayer-times");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
                  activeTab === "prayer-times" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <Calendar size={20} />
                <span>Prayer Times</span>
              </button>
              
              <button 
                onClick={() => {
                  setActiveTab("events");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
                  activeTab === "events" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <Calendar size={20} />
                <span>Events</span>
              </button>
              
              <button 
                onClick={() => {
                  setActiveTab("blog");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
                  activeTab === "blog" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <FileText size={20} />
                <span>Blog Posts</span>
              </button>
              
              <button 
                onClick={() => {
                  setActiveTab("gallery");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
                  activeTab === "gallery" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <ImageIcon size={20} />
                <span>Gallery</span>
              </button>
              
              <button 
                onClick={() => {
                  setActiveTab("contact");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
                  activeTab === "contact" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <Phone size={20} />
                <span>Contact Info</span>
              </button>
              
              <button 
                onClick={() => {
                  setActiveTab("donations");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
                  activeTab === "donations" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <HeartHandshake size={20} />
                <span>Support Our Masjid</span>
              </button>
              
              <button 
                onClick={() => {
                  setActiveTab("settings");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
                  activeTab === "settings" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <Settings size={20} />
                <span>Settings</span>
              </button>
            </nav>
          </div>
        )}
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-8 md:p-8 mt-16 md:mt-0">
        {isLoading && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <Loader2 className="h-10 w-10 text-masjid-primary animate-spin mb-4" />
              <p className="text-masjid-navy font-medium">Loading data...</p>
            </div>
          </div>
        )}
        
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold text-masjid-primary mb-6">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="transition-all hover:shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-masjid-navy/70">{stat.title}</p>
                        <p className="text-3xl font-bold text-masjid-navy mt-1">{stat.value}</p>
                        <p className="text-xs text-masjid-navy/60 mt-1">{stat.description}</p>
                      </div>
                      <div className="bg-masjid-cream/50 p-3 rounded-full">
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText size={18} className="mr-2 text-masjid-primary" />
                    Recent Activities
                  </CardTitle>
                  <CardDescription>Latest updates from the masjid</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-masjid-primary pl-4 py-1">
                      <p className="font-medium">Prayer times updated</p>
                      <p className="text-sm text-masjid-navy/70">Today, 9:15 AM</p>
                    </div>
                    <div className="border-l-4 border-masjid-gold pl-4 py-1">
                      <p className="font-medium">New blog post published</p>
                      <p className="text-sm text-masjid-navy/70">Yesterday, 3:30 PM</p>
                    </div>
                    <div className="border-l-4 border-masjid-primary pl-4 py-1">
                      <p className="font-medium">Event added: Friday Halaqa</p>
                      <p className="text-sm text-masjid-navy/70">2 days ago, 11:45 AM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle size={18} className="mr-2 text-masjid-primary" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Common tasks you may want to perform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={() => setActiveTab("prayer-times")}
                      className="flex items-center justify-center bg-masjid-primary hover:bg-masjid-primary/90"
                    >
                      <Calendar size={18} className="mr-2" /> Update Prayer Times
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("events")}
                      className="flex items-center justify-center bg-masjid-primary hover:bg-masjid-primary/90"
                    >
                      <Calendar size={18} className="mr-2" /> Manage Events
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("blog")}
                      variant="outline"
                      className="flex items-center justify-center border-masjid-primary text-masjid-primary hover:bg-masjid-primary/10"
                    >
                      <FileText size={18} className="mr-2" /> Add Blog Post
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("gallery")}
                      variant="outline"
                      className="flex items-center justify-center border-masjid-primary text-masjid-primary hover:bg-masjid-primary/10"
                    >
                      <ImageIcon size={18} className="mr-2" /> Manage Gallery
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {/* Prayer Times Management */}
        {activeTab === "prayer-times" && (
          <div>
            <h2 className="text-2xl font-bold text-masjid-primary mb-6">Prayer Times Management</h2>
            <p className="text-masjid-navy mb-4">
              Update prayer times for Fiqa Jafferia. You can update all prayer times at once or manage them individually.
            </p>
            
            <Card className="mb-8 transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar size={18} className="mr-2 text-masjid-primary" />
                  Update Prayer Times
                </CardTitle>
                <CardDescription>
                  These times will be displayed on the website. You can update all at once or edit individual prayer times.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {prayerTimes.map((prayer, index) => (
                    <div key={prayer.id} className="grid grid-cols-1 gap-4 pb-4 border-b">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-lg font-semibold text-masjid-primary">{prayer.name}</h3>
                            <span className="text-sm text-masjid-navy/60 ml-2 font-arabic">({prayer.arabic_name})</span>
                          </div>
                          <p className="text-sm text-masjid-navy/70">Fiqa: {prayer.fiqa_type || 'Jafferia'}</p>
                        </div>
                        
                        {editingPrayerId === prayer.id ? (
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`${prayer.name.toLowerCase()}-adhan`}>Adhan Time</Label>
                              <Input 
                                id={`${prayer.name.toLowerCase()}-adhan`} 
                                type="time" 
                                value={prayer.adhan_time} 
                                onChange={(e) => handlePrayerTimeChange(index, 'adhan_time', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`${prayer.name.toLowerCase()}-iqamah`}>Iqamah Time</Label>
                              <Input 
                                id={`${prayer.name.toLowerCase()}-iqamah`} 
                                type="time" 
                                value={prayer.iqamah_time}
                                onChange={(e) => handlePrayerTimeChange(index, 'iqamah_time', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2 flex gap-2">
                              <Button 
                                onClick={() => handleSinglePrayerTimeUpdate(prayer.id)}
                                disabled={isLoading}
                                className="flex items-center bg-masjid-primary hover:bg-masjid-primary/90 flex-1"
                              >
                                {isLoading ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                  </>
                                ) : (
                                  <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save
                                  </>
                                )}
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={() => setEditingPrayerId(null)}
                                className="flex items-center border-masjid-primary text-masjid-primary hover:bg-masjid-primary/10"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-masjid-navy/70">Adhan Time</p>
                              <p className="font-medium">{formatTimeString(prayer.adhan_time)}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-masjid-navy/70">Iqamah Time</p>
                              <p className="font-medium">{formatTimeString(prayer.iqamah_time)}</p>
                            </div>
                            <div className="md:col-span-2">
                              <Button 
                                variant="outline" 
                                onClick={() => setEditingPrayerId(prayer.id)}
                                className="flex items-center border-masjid-primary text-masjid-primary hover:bg-masjid-primary/10"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handlePrayerTimesUpdate}
                  disabled={isLoading}
                  className="flex items-center bg-masjid-primary hover:bg-masjid-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving All...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save All Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings size={18} className="mr-2 text-masjid-primary" />
                  Calculation Method
                </CardTitle>
                <CardDescription>
                  Choose a method to automatically calculate prayer times based on your masjid's location.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="calculation-method">Calculation Method</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="Jafferia">Fiqa Jafferia</option>
                      <option value="ISNA">ISNA (North America)</option>
                      <option value="MWL">Muslim World League</option>
                      <option value="Egyptian">Egyptian General Authority</option>
                      <option value="Karachi">University of Islamic Sciences, Karachi</option>
                      <option value="Makkah">Umm al-Qura University, Makkah</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="asr-method">Asr Calculation</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="Standard">Standard (Shafi'i, Maliki, Hanbali)</option>
                      <option value="Hanafi">Hanafi</option>
                      <option value="Jafferi">Jafferi</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input id="latitude" type="text" defaultValue="34.0522" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input id="longitude" type="text" defaultValue="-118.2437" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => {
                  toast({
                    title: "Changes applied",
                    description: "Prayer times calculations have been updated.",
                  });
                }} className="bg-masjid-primary hover:bg-masjid-primary/90">
                  <Save className="mr-2 h-4 w-4" />
                  Apply Changes
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
        
        {/* Events Management */}
        {activeTab === "events" && (
          <div>
            <h2 className="text-2xl font-bold text-masjid-primary mb-6">Events Management</h2>
            
            <Card className="mb-8 transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus size={18} className="mr-2 text-masjid-primary" />
                  Create New Event
                </CardTitle>
                <CardDescription>
                  Add a new event to the masjid calendar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Enter event title" 
                      value={newEvent.title}
                      onChange={(e) => handleEventChange('title', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input 
                        id="date" 
                        type="date" 
                        value={newEvent.date}
                        onChange={(e) => handleEventChange('date', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input 
                        id="time" 
                        type="time" 
                        value={newEvent.time}
                        onChange={(e) => handleEventChange('time', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={newEvent.category}
                        onChange={(e) => handleEventChange('category', e.target.value)}
                      >
                        <option value="General">General</option>
                        <option value="Prayer">Prayer</option>
                        <option value="Education">Education</option>
                        <option value="Community">Community</option>
                        <option value="Youth">Youth</option>
                        <option value="Special">Special</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      placeholder="Event location" 
                      value={newEvent.location}
                      onChange={(e) => handleEventChange('location', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Event description" 
                      value={newEvent.description}
                      onChange={(e) => handleEventChange('description', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={newEvent.featured}
                      onChange={(e) => handleEventChange('featured', e.target.checked)}
                      className="rounded border-gray-300 text-masjid-primary focus:ring-masjid-primary"
                    />
                    <Label htmlFor="featured">Feature this event on the home page</Label>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleAddEvent}
                  disabled={isLoading}
                  className="bg-masjid-primary hover:bg-masjid-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Event
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar size={18} className="mr-2 text-masjid-primary" />
                  Manage Existing Events
                </CardTitle>
                <CardDescription>
                  Edit or delete existing events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-md space-y-2 md:space-y-0 md:items-center">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-masjid-navy/70">
                          {new Date(event.date).toLocaleDateString()} at {event.time} • {event.location}
                        </p>
                        {event.featured && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-masjid-gold/20 text-masjid-gold">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="flex items-center"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Blog Posts Management */}
        {activeTab === "blog" && (
          <div>
            <h2 className="text-2xl font-bold text-masjid-primary mb-6">Blog Posts Management</h2>
            
            <Card className="mb-8 transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus size={18} className="mr-2 text-masjid-primary" />
                  Create New Blog Post
                </CardTitle>
                <CardDescription>
                  Add a new article to the masjid blog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Post Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Enter blog post title" 
                      value={newBlogPost.title}
                      onChange={(e) => handleBlogPostChange('title', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={newBlogPost.category}
                        onChange={(e) => handleBlogPostChange('category', e.target.value)}
                      >
                        <option value="">Select a category</option>
                        <option value="Events">Events</option>
                        <option value="Education">Education</option>
                        <option value="Seasonal">Seasonal</option>
                        <option value="Youth">Youth</option>
                        <option value="Community">Community</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input 
                        id="author" 
                        placeholder="Author name" 
                        value={newBlogPost.author}
                        onChange={(e) => handleBlogPostChange('author', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea 
                      id="excerpt" 
                      placeholder="Brief summary of the post" 
                      value={newBlogPost.excerpt}
                      onChange={(e) => handleBlogPostChange('excerpt', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea 
                      id="content" 
                      placeholder="Full content of the blog post" 
                      className="min-h-[200px]" 
                      value={newBlogPost.content}
                      onChange={(e) => handleBlogPostChange('content', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="image">Featured Image URL</Label>
                      <Input 
                        id="image" 
                        placeholder="Image URL" 
                        value={newBlogPost.image_url}
                        onChange={(e) => handleBlogPostChange('image_url', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="read-time">Read Time</Label>
                      <Input 
                        id="read-time" 
                        placeholder="e.g., 5 min" 
                        value={newBlogPost.read_time}
                        onChange={(e) => handleBlogPostChange('read_time', e.target.value)}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleAddBlogPost}
                  disabled={isLoading}
                  className="bg-masjid-primary hover:bg-masjid-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Publish Post
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText size={18} className="mr-2 text-masjid-primary" />
                  Manage Existing Posts
                </CardTitle>
                <CardDescription>
                  Edit or delete existing blog posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="flex flex-col md:flex-row md:justify-between md:items-center p-3 border rounded-md space-y-2 md:space-y-0">
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-masjid-navy/70">
                          {new Date(post.date).toLocaleDateString()} • {post.category} • By {post.author}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="flex items-center"
                          onClick={() => handleDeleteBlogPost(post.id)}
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Gallery Management */}
        {activeTab === "gallery" && (
          <div>
            <h2 className="text-2xl font-bold text-masjid-primary mb-6">Gallery Management</h2>
            
            <Card className="mb-8 transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus size={18} className="mr-2 text-masjid-primary" />
                  Add New Image
                </CardTitle>
                <CardDescription>
                  Add a new image to the masjid gallery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image-title">Image Title</Label>
                    <Input 
                      id="image-title" 
                      placeholder="Enter image title" 
                      value={newImage.title}
                      onChange={(e) => handleImageChange('title', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image-alt">Alt Text</Label>
                    <Input 
                      id="image-alt" 
                      placeholder="Descriptive text for accessibility" 
                      value={newImage.alt}
                      onChange={(e) => handleImageChange('alt', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image-url">Image URL</Label>
                    <Input 
                      id="image-url" 
                      placeholder="URL to the image" 
                      value={newImage.url}
                      onChange={(e) => handleImageChange('url', e.target.value)}
                    />
                    <p className="text-xs text-masjid-navy/60">
                      * In a real application, you would upload the image directly instead of providing a URL.
                    </p>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button onClick={handleAddImage} className="bg-masjid-primary hover:bg-masjid-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Gallery
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ImageIcon size={18} className="mr-2 text-masjid-primary" />
                  Manage Gallery Images
                </CardTitle>
                <CardDescription>
                  Edit or delete images in the gallery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryImages.map((image) => (
                    <div key={image.id} className="border rounded-md overflow-hidden group relative">
                      <img 
                        src={image.url} 
                        alt={image.alt} 
                        className="w-full h-48 object-cover" 
                      />
                      <div className="p-3">
                        <p className="font-medium">{image.title}</p>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDeleteImage(image.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Contact Info Management */}
        {activeTab === "contact" && (
          <div>
            <h2 className="text-2xl font-bold text-masjid-primary mb-6">Contact Information Management</h2>
            
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone size={18} className="mr-2 text-masjid-primary" />
                  Update Contact Information
                </CardTitle>
                <CardDescription>
                  Manage contact details displayed on the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-base font-medium" htmlFor="address">Physical Address</Label>
                    <Textarea 
                      id="address" 
                      placeholder="Masjid address" 
                      value={contactInfo.address}
                      onChange={(e) => handleContactInfoChange('address', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-base font-medium" htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        placeholder="Phone number" 
                        value={contactInfo.phone}
                        onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-medium" htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        placeholder="Email address" 
                        value={contactInfo.email}
                        onChange={(e) => handleContactInfoChange('email', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-masjid-primary mb-3">Social Media Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input 
                          id="facebook" 
                          placeholder="Facebook URL" 
                          value={contactInfo.socialLinks.facebook}
                          onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input 
                          id="instagram" 
                          placeholder="Instagram URL" 
                          value={contactInfo.socialLinks.instagram}
                          onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input 
                          id="twitter" 
                          placeholder="Twitter URL" 
                          value={contactInfo.socialLinks.twitter}
                          onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="youtube">YouTube</Label>
                        <Input 
                          id="youtube" 
                          placeholder="YouTube URL" 
                          value={contactInfo.socialLinks.youtube}
                          onChange={(e) => handleSocialLinkChange('youtube', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveContactInfo} className="bg-masjid-primary hover:bg-masjid-primary/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Contact Information
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
        
        {/* Donations Management */}
        {activeTab === "donations" && (
          <div>
            <h2 className="text-2xl font-bold text-masjid-primary mb-6">Support Our Masjid Management</h2>
            
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HeartHandshake size={18} className="mr-2 text-masjid-primary" />
                  Donation Information
                </CardTitle>
                <CardDescription>
                  Manage donation information and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-base font-medium" htmlFor="donation-headline">Donation Headline</Label>
                    <Input 
                      id="donation-headline" 
                      placeholder="Main headline for donation section" 
                      value={donationSettings.headline}
                      onChange={(e) => handleDonationSettingChange('headline', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-base font-medium" htmlFor="donation-description">Description</Label>
                    <Textarea 
                      id="donation-description" 
                      placeholder="Description for donation section" 
                      value={donationSettings.description}
                      onChange={(e) => handleDonationSettingChange('description', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-masjid-primary mb-3">Online Payment Methods</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="paypal">PayPal Link</Label>
                        <Input 
                          id="paypal" 
                          placeholder="PayPal.me link" 
                          value={donationSettings.paypalLink}
                          onChange={(e) => handleDonationSettingChange('paypalLink', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="venmo">Venmo Link</Label>
                        <Input 
                          id="venmo" 
                          placeholder="Venmo link" 
                          value={donationSettings.venmoLink}
                          onChange={(e) => handleDonationSettingChange('venmoLink', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zelle">Zelle Email/Phone</Label>
                        <Input 
                          id="zelle" 
                          placeholder="Email or phone for Zelle" 
                          value={donationSettings.zelleName}
                          onChange={(e) => handleDonationSettingChange('zelleName', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-masjid-primary mb-3">Bank Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bank-name">Bank Name</Label>
                        <Input 
                          id="bank-name" 
                          placeholder="Bank name" 
                          value={donationSettings.bankName}
                          onChange={(e) => handleDonationSettingChange('bankName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-name">Account Name</Label>
                        <Input 
                          id="account-name" 
                          placeholder="Account name" 
                          value={donationSettings.accountName}
                          onChange={(e) => handleDonationSettingChange('accountName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-number">Account Number</Label>
                        <Input 
                          id="account-number" 
                          placeholder="Account number" 
                          value={donationSettings.accountNumber}
                          onChange={(e) => handleDonationSettingChange('accountNumber', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="routing-number">Routing Number</Label>
                        <Input 
                          id="routing-number" 
                          placeholder="Routing number" 
                          value={donationSettings.routingNumber}
                          onChange={(e) => handleDonationSettingChange('routingNumber', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveDonationSettings} className="bg-masjid-primary hover:bg-masjid-primary/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Donation Information
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-bold text-masjid-primary mb-6">Admin Settings</h2>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings size={18} className="mr-2 text-masjid-primary" />
                  Account Settings
                </CardTitle>
                <CardDescription>
                  Update your admin account information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue={currentUser?.username} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={currentUser?.email} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" placeholder="Enter current password" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button onClick={() => {
                  toast({
                    title: "Settings updated",
                    description: "Your account settings have been saved.",
                  });
                }}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
