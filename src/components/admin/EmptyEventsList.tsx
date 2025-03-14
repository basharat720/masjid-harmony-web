
import React from 'react';
import { Calendar } from 'lucide-react';

const EmptyEventsList: React.FC = () => {
  return (
    <div className="text-center py-8">
      <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
      <p className="text-muted-foreground">No events found</p>
      <p className="text-sm text-muted-foreground mt-1">
        Add your first event to display it on the website
      </p>
    </div>
  );
};

export default EmptyEventsList;
