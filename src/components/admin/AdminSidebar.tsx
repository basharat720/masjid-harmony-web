
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  LayoutDashboard,
  Clock,
  Calendar,
  Image,
  FileText,
  MessageSquare,
  Heart,
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  return (
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
  );
};

export default AdminSidebar;
