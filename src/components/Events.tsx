
import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const upcomingEvents = [
  {
    id: 1,
    title: 'Friday Jummah Prayer',
    description: 'Join us for the weekly congregational Friday prayer and sermon.',
    date: '2023-09-22',
    time: '1:00 PM - 2:00 PM',
    location: 'Main Prayer Hall',
    category: 'Prayer',
    featured: true,
  },
  {
    id: 2,
    title: 'Quran Study Circle',
    description: 'Weekly Quran study and tafsir session for adults.',
    date: '2023-09-24',
    time: '7:30 PM - 9:00 PM',
    location: 'Islamic Library',
    category: 'Education',
    featured: false,
  },
  {
    id: 3,
    title: 'Community Iftar',
    description: 'Monthly community dinner and socializing event.',
    date: '2023-09-30',
    time: '6:30 PM - 8:30 PM',
    location: 'Community Hall',
    category: 'Social',
    featured: true,
  },
  {
    id: 4,
    title: 'Youth Islamic Workshop',
    description: 'Educational workshop for teenagers about Islamic principles and practices.',
    date: '2023-10-01',
    time: '5:00 PM - 7:00 PM',
    location: 'Youth Center',
    category: 'Youth',
    featured: false,
  },
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'prayer':
      return 'bg-blue-100 text-blue-800';
    case 'education':
      return 'bg-green-100 text-green-800';
    case 'social':
      return 'bg-purple-100 text-purple-800';
    case 'youth':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Events = () => {
  return (
    <section id="events" className="py-16 bg-masjid-light">
      <div className="section-container">
        <h2 className="section-title">Upcoming Events</h2>
        <p className="text-center text-masjid-navy/80 max-w-2xl mx-auto mb-10">
          Join us for these upcoming events at Masjid Imam Hussain. Everyone is welcome to participate and be part of our community.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className={`overflow-hidden hover:shadow-lg transition-shadow ${event.featured ? 'border-masjid-gold border-2' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className={`${getCategoryColor(event.category)}`}>
                    {event.category}
                  </Badge>
                  {event.featured && (
                    <Badge className="bg-masjid-gold/20 text-masjid-gold">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl text-masjid-primary mt-2">{event.title}</CardTitle>
                <CardDescription className="text-masjid-navy/70">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-masjid-navy/80">
                    <Calendar size={16} className="mr-2 text-masjid-primary" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-masjid-navy/80">
                    <Clock size={16} className="mr-2 text-masjid-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-masjid-navy/80">
                    <MapPin size={16} className="mr-2 text-masjid-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-masjid-primary border-masjid-primary hover:bg-masjid-primary/10">
                  <Users size={16} className="mr-2" /> RSVP for Event
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button className="cta-button">
            <Calendar size={18} className="mr-2" /> View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Events;
