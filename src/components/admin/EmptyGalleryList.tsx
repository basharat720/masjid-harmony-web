
import React from 'react';
import { Image } from 'lucide-react';

const EmptyGalleryList: React.FC = () => {
  return (
    <div className="text-center py-8">
      <Image className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
      <p className="text-muted-foreground">No gallery images found</p>
      <p className="text-sm text-muted-foreground mt-1">
        Add your first image to display it in the gallery
      </p>
    </div>
  );
};

export default EmptyGalleryList;
