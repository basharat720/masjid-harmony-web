
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
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const AdminDashboard = () => {
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
            onClick={() => setActiveTab("blog")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
              activeTab === "blog" ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <FileText size={20} />
            <span>Blog Posts</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("quran")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
              activeTab === "quran" ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <BookOpen size={20} />
            <span>Quran & Resources</span>
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
                  setActiveTab("quran");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition ${
                  activeTab === "quran" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <BookOpen size={20} />
                <span>Quran & Resources</span>
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
                      onClick={() => setActiveTab("blog")}
                      className="flex items-center justify-center bg-masjid-primary hover:bg-masjid-primary/90"
                    >
                      <FileText size={18} className="mr-2" /> Add Blog Post
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("quran")}
                      variant="outline"
                      className="flex items-center justify-center border-masjid-primary text-masjid-primary hover:bg-masjid-primary/10"
                    >
                      <BookOpen size={18} className="mr-2" /> Add Resource
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex items-center justify-center border-masjid-primary text-masjid-primary hover:bg-masjid-primary/10"
                    >
                      <Users size={18} className="mr-2" /> Manage Members
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
            
            {/* Helper function to format time string for display */}
            {function formatTimeString(timeStr) {
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
            }}
            
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
                    <Input id="title" placeholder="Enter blog post title" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
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
                      <Input id="author" placeholder="Author name" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea id="excerpt" placeholder="Brief summary of the post" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" placeholder="Full content of the blog post" className="min-h-[200px]" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Featured Image</Label>
                    <Input id="image" type="file" />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button onClick={() => {
                  toast({
                    title: "Blog post created",
                    description: "Your blog post has been successfully created.",
                  });
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Publish Post
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
                  {blogPosts.map((post, index) => (
                    <div key={post.id} className="flex flex-col md:flex-row md:justify-between md:items-center p-3 border rounded-md space-y-2 md:space-y-0">
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-masjid-navy/70">
                          {new Date(post.date).toLocaleDateString()} • {post.category}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" className="flex items-center">
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
        
        {/* Quran & Resources Management */}
        {activeTab === "quran" && (
          <div>
            <h2 className="text-2xl font-bold text-masjid-primary mb-6">Quran & Resources Management</h2>
            
            <Tabs defaultValue="recitations">
              <TabsList className="mb-6">
                <TabsTrigger value="recitations">Recitations</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="lectures">Lectures</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recitations">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Recitation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="surah">Surah/Passage</Label>
                          <Input id="surah" placeholder="e.g., Surah Al-Fatiha" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reciter">Reciter</Label>
                          <Input id="reciter" placeholder="Name of the reciter" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="audio-file">Audio File</Label>
                        <Input id="audio-file" type="file" accept="audio/*" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="recitation-image">Cover Image</Label>
                        <Input id="recitation-image" type="file" accept="image/*" />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => {
                      toast({
                        title: "Recitation added",
                        description: "The Quran recitation has been added successfully.",
                      });
                    }}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Recitation
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="resources">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Resource</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="resource-title">Title</Label>
                        <Input id="resource-title" placeholder="Resource title" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="resource-author">Author</Label>
                          <Input id="resource-author" placeholder="Author name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="resource-type">Type</Label>
                          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            <option value="PDF">PDF</option>
                            <option value="Book">Book</option>
                            <option value="Article">Article</option>
                            <option value="Audio">Audio</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="resource-description">Description</Label>
                        <Textarea id="resource-description" placeholder="Brief description of the resource" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="resource-file">Resource File</Label>
                        <Input id="resource-file" type="file" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="resource-image">Cover Image</Label>
                        <Input id="resource-image" type="file" accept="image/*" />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => {
                      toast({
                        title: "Resource added",
                        description: "The resource has been added successfully.",
                      });
                    }}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Resource
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="lectures">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Lecture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="lecture-title">Title</Label>
                        <Input id="lecture-title" placeholder="Lecture title" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="lecture-speaker">Speaker</Label>
                          <Input id="lecture-speaker" placeholder="Speaker name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lecture-duration">Duration</Label>
                          <Input id="lecture-duration" placeholder="e.g., 45:30" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lecture-description">Description</Label>
                        <Textarea id="lecture-description" placeholder="Brief description of the lecture" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="video-url">Video URL</Label>
                        <Input id="video-url" placeholder="e.g., https://youtube.com/watch?v=..." />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lecture-thumbnail">Thumbnail</Label>
                        <Input id="lecture-thumbnail" type="file" accept="image/*" />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => {
                      toast({
                        title: "Lecture added",
                        description: "The lecture has been added successfully.",
                      });
                    }}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Lecture
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
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
