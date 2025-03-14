
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Plus, RefreshCw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EventForm } from './EventForm';

interface EventsHeaderProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  fetchEvents: () => Promise<void>;
  handleAddSuccess: () => void;
}

const EventsHeader: React.FC<EventsHeaderProps> = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  fetchEvents,
  handleAddSuccess
}) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <CardTitle className="text-2xl">Events</CardTitle>
        <CardDescription>
          Manage upcoming events for the masjid
        </CardDescription>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={fetchEvents} 
          title="Refresh"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <EventForm onSuccess={handleAddSuccess} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EventsHeader;
