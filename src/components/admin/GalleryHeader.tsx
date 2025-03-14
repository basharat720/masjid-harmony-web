
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
import { GalleryForm } from './GalleryForm';
import { GalleryImage } from '@/hooks/useGallery';

interface GalleryHeaderProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  fetchGalleryImages: () => Promise<void>;
  handleAddSuccess: () => void;
}

const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  fetchGalleryImages,
  handleAddSuccess
}) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <CardTitle className="text-2xl">Gallery</CardTitle>
        <CardDescription>
          Manage images in the masjid gallery
        </CardDescription>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={fetchGalleryImages} 
          title="Refresh"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Gallery Image</DialogTitle>
            </DialogHeader>
            <GalleryForm onSuccess={handleAddSuccess} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GalleryHeader;
