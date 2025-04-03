
import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  featured: boolean;
}

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
    case 'religious':
      return 'bg-cyan-100 text-cyan-800';
    case 'community':
      return 'bg-pink-100 text-pink-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        // Fetch upcoming events (events with date >= today)
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .gte('date', today)
          .order('date', { ascending: true })
          .limit(4);
        
        if (error) {
          console.error('Error fetching events:', error);
          return;
        }
        
        setEvents(data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <section id="events" className="py-16 bg-masjid-light">
      <div className="section-container">
        <h2 className="section-title">Upcoming Events</h2>
        <p className="text-center text-masjid-navy/80 max-w-2xl mx-auto mb-10">
          Join us for these upcoming events at Masjid Imam Hussain. Everyone is welcome to participate and be part of our community.
        </p>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-masjid-primary"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No upcoming events found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Check back soon for new events
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {events.map((event) => (
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
        )}
        
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
