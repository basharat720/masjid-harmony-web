
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Clock,
  Calendar,
  FileText,
} from 'lucide-react';

interface AdminOverviewProps {
  setActiveTab: (tab: string) => void;
}

const AdminOverview = ({ setActiveTab }: AdminOverviewProps) => {
  return (
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
  );
};

export default AdminOverview;
