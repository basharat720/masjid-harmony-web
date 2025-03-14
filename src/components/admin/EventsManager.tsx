
import React from 'react';
import { useEvents } from '@/hooks/useEvents';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EventForm } from './EventForm';
import EventsHeader from './EventsHeader';
import EventsTable from './EventsTable';
import EmptyEventsList from './EmptyEventsList';

const EventsManager = () => {
  const {
    events,
    loading,
    editEvent,
    isAddDialogOpen,
    isEditDialogOpen,
    deleteId,
    setIsAddDialogOpen,
    setIsEditDialogOpen,
    setDeleteId,
    fetchEvents,
    handleEdit,
    handleDelete,
    handleAddSuccess,
    handleEditSuccess
  } = useEvents();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <EventsHeader 
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen}
          fetchEvents={fetchEvents}
          handleAddSuccess={handleAddSuccess}
        />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-masjid-primary"></div>
          </div>
        ) : events.length === 0 ? (
          <EmptyEventsList />
        ) : (
          <EventsTable
            events={events}
            deleteId={deleteId}
            setDeleteId={setDeleteId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            {editEvent && (
              <EventForm 
                event={editEvent} 
                onSuccess={handleEditSuccess} 
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default EventsManager;
