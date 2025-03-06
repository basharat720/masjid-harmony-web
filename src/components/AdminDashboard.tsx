
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { LayoutDashboard, Users, FileText, BookOpen, Calendar, Settings, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/';
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  // Mock stats for the dashboard
  const stats = [
    { title: "Total Members", value: "345", icon: <Users size={24} className="text-masjid-gold" /> },
    { title: "Weekly Attendance", value: "120", icon: <Users size={24} className="text-masjid-primary" /> },
    { title: "Prayer Times Updated", value: "Today", icon: <Calendar size={24} className="text-masjid-gold" /> },
    { title: "Blog Posts", value: "24", icon: <FileText size={24} className="text-masjid-primary" /> }
  ];
  
  return (
    <div className="flex min-h-screen bg-masjid-light">
      {/* Sidebar */}
      <div className="w-64 bg-masjid-primary text-white min-h-screen p-4 hidden md:block">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-masjid-cream/80 text-sm mt-1">Masjid Imam Hussain</p>
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
      
      {/* Mobile navigation */}
      <div className="md:hidden w-full bg-masjid-primary text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10"
            onClick={handleLogout}
          >
            <LogOut size={20} />
          </Button>
        </div>
        
        <div className="mt-4 flex overflow-x-auto space-x-2 pb-2">
          <Button
            variant="ghost"
            size="sm"
            className={activeTab === "dashboard" ? "bg-white/10" : "hover:bg-white/5"}
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard size={16} className="mr-1" /> Dashboard
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={activeTab === "prayer-times" ? "bg-white/10" : "hover:bg-white/5"}
            onClick={() => setActiveTab("prayer-times")}
          >
            <Calendar size={16} className="mr-1" /> Prayer Times
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={activeTab === "blog" ? "bg-white/10" : "hover:bg-white/5"}
            onClick={() => setActiveTab("blog")}
          >
            <FileText size={16} className="mr-1" /> Blog
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={activeTab === "quran" ? "bg-white/10" : "hover:bg-white/5"}
            onClick={() => setActiveTab("quran")}
          >
            <BookOpen size={16} className="mr-1" /> Resources
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-8">
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold text-masjid-primary mb-6">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-masjid-navy/70">{stat.title}</p>
                        <p className="text-3xl font-bold text-masjid-navy mt-1">{stat.value}</p>
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
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
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
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks you may want to perform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={() => setActiveTab("prayer-times")}
                      className="flex items-center justify-center"
                    >
                      <Calendar size={18} className="mr-2" /> Update Prayer Times
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("blog")}
                      className="flex items-center justify-center"
                    >
                      <FileText size={18} className="mr-2" /> Add Blog Post
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("quran")}
                      variant="outline"
                      className="flex items-center justify-center"
                    >
                      <BookOpen size={18} className="mr-2" /> Add Resource
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex items-center justify-center"
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
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Update Prayer Times</CardTitle>
                <CardDescription>
                  These times will be displayed on the website. You can manually adjust them or use calculation methods.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((prayer) => (
                    <div key={prayer} className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b">
                      <div>
                        <Label className="text-lg">{prayer}</Label>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${prayer.toLowerCase()}-adhan`}>Adhan Time</Label>
                        <Input 
                          id={`${prayer.toLowerCase()}-adhan`} 
                          type="time" 
                          defaultValue={prayer === "Fajr" ? "05:20" : 
                                      prayer === "Dhuhr" ? "13:05" : 
                                      prayer === "Asr" ? "16:35" : 
                                      prayer === "Maghrib" ? "19:05" : "20:20"} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${prayer.toLowerCase()}-iqamah`}>Iqamah Time</Label>
                        <Input 
                          id={`${prayer.toLowerCase()}-iqamah`} 
                          type="time" 
                          defaultValue={prayer === "Fajr" ? "05:40" : 
                                      prayer === "Dhuhr" ? "13:25" : 
                                      prayer === "Asr" ? "16:55" : 
                                      prayer === "Maghrib" ? "19:15" : "20:40"} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => {
                  toast({
                    title: "Prayer times updated",
                    description: "The prayer times have been successfully updated.",
                  });
                }}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Calculation Method</CardTitle>
                <CardDescription>
                  Choose a method to automatically calculate prayer times based on your masjid's location.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="calculation-method">Calculation Method</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
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
                }}>
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
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Create New Blog Post</CardTitle>
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
                  Publish Post
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Manage Existing Posts</CardTitle>
                <CardDescription>
                  Edit or delete existing blog posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Eid Al-Fitr Celebration Highlights", "Understanding the Five Pillars of Islam", "Ramadan Preparations: A Practical Guide", "Youth Program Launch: Nurturing Future Leaders"].map((title, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">{title}</p>
                        <p className="text-sm text-masjid-navy/70">
                          {index === 0 ? "2023-04-22" : 
                           index === 1 ? "2023-03-15" : 
                           index === 2 ? "2023-02-20" : "2023-01-10"}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
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
                        <Input id="video-url" placeholder="e.g., YouTube link" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="thumbnail">Thumbnail Image</Label>
                        <Input id="thumbnail" type="file" accept="image/*" />
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
                      Add Lecture
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
        
        {/* Settings */}
        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-bold text-masjid-primary mb-6">Admin Settings</h2>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-username">Username</Label>
                      <Input id="admin-username" defaultValue="admin" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input id="admin-email" type="email" defaultValue="admin@masjidhussain.org" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button onClick={() => {
                  toast({
                    title: "Settings updated",
                    description: "Your account settings have been updated successfully.",
                  });
                }}>
                  Update Account
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Website Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="masjid-name">Masjid Name</Label>
                    <Input id="masjid-name" defaultValue="Masjid Imam Hussain" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Contact Email</Label>
                      <Input id="contact-email" type="email" defaultValue="info@masjidhussain.org" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">Contact Phone</Label>
                      <Input id="contact-phone" defaultValue="+1 (123) 456-7890" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="masjid-address">Masjid Address</Label>
                    <Textarea id="masjid-address" defaultValue="123 Islamic Center Dr, Los Angeles, CA 90001" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="about-description">About Description</Label>
                    <Textarea 
                      id="about-description" 
                      className="min-h-[100px]"
                      defaultValue="Masjid Imam Hussain is a vibrant Islamic center dedicated to serving the Muslim community through prayer, education, and community service."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="logo">Masjid Logo</Label>
                    <Input id="logo" type="file" accept="image/*" />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button onClick={() => {
                  toast({
                    title: "Website settings updated",
                    description: "The website settings have been updated successfully.",
                  });
                }}>
                  Save Changes
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
