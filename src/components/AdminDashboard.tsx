
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  Clock,
  Calendar,
  Image,
  FileText,
  MessageSquare,
  Heart,
  LogOut
} from 'lucide-react';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import PrayerTimesManager from './admin/PrayerTimesManager';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate('/admin-login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Failed",
        description: "There was an error during logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-masjid-primary">Admin Dashboard</h1>
          <p className="text-masjid-navy opacity-80">Manage your masjid website content</p>
        </div>
        <Button variant="ghost" onClick={handleLogout} className="mt-4 md:mt-0">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar Navigation */}
        <Card className="md:col-span-3 lg:col-span-2">
          <CardContent className="p-3">
            <div className="space-y-1 mt-2">
              <Button 
                variant={activeTab === "overview" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("overview")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Overview
              </Button>
              <Button 
                variant={activeTab === "prayer-times" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("prayer-times")}
              >
                <Clock className="mr-2 h-4 w-4" />
                Prayer Times
              </Button>
              <Button 
                variant={activeTab === "events" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("events")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Events
              </Button>
              <Button 
                variant={activeTab === "gallery" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("gallery")}
              >
                <Image className="mr-2 h-4 w-4" />
                Gallery
              </Button>
              <Button 
                variant={activeTab === "blog" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("blog")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Blog
              </Button>
              <Button 
                variant={activeTab === "contact" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("contact")}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Info
              </Button>
              <Button 
                variant={activeTab === "donations" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("donations")}
              >
                <Heart className="mr-2 h-4 w-4" />
                Donations
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="md:col-span-9 lg:col-span-10">
          {activeTab === "overview" && (
            <Card>
              <CardHeader>
                <CardTitle>Welcome to the Admin Dashboard</CardTitle>
                <CardDescription>
                  Use the navigation on the left to manage different aspects of your masjid website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-masjid-gold" />
                        Prayer Times
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Update daily prayer times for the masjid
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("prayer-times")}>
                        Manage Prayer Times
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-masjid-gold" />
                        Events
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Manage upcoming events and programs
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("events")}>
                        Manage Events
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-masjid-gold" />
                        Blog
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Create and edit blog articles
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("blog")}>
                        Manage Blog
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "prayer-times" && <PrayerTimesManager />}

          {activeTab === "events" && (
            <Card>
              <CardHeader>
                <CardTitle>Events Manager</CardTitle>
                <CardDescription>
                  Manage upcoming events and programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Event management functionality coming soon
                </p>
              </CardContent>
            </Card>
          )}

          {activeTab === "gallery" && (
            <Card>
              <CardHeader>
                <CardTitle>Gallery Manager</CardTitle>
                <CardDescription>
                  Upload and manage images for the website gallery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Gallery management functionality coming soon
                </p>
              </CardContent>
            </Card>
          )}

          {activeTab === "blog" && (
            <Card>
              <CardHeader>
                <CardTitle>Blog Manager</CardTitle>
                <CardDescription>
                  Create and edit blog articles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Blog management functionality coming soon
                </p>
              </CardContent>
            </Card>
          )}

          {activeTab === "contact" && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Update contact details for the masjid
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Contact information management functionality coming soon
                </p>
              </CardContent>
            </Card>
          )}

          {activeTab === "donations" && (
            <Card>
              <CardHeader>
                <CardTitle>Donation Settings</CardTitle>
                <CardDescription>
                  Configure donation options and messages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Donation settings functionality coming soon
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
