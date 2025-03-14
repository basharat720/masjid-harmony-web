
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { GalleryImage } from '@/hooks/useGallery';

interface GalleryGridProps {
  galleryImages: GalleryImage[];
  deleteId: string | null;
  setDeleteId: (id: string | null) => void;
  handleEdit: (image: GalleryImage) => void;
  handleDelete: (id: string) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
  galleryImages,
  deleteId,
  setDeleteId,
  handleEdit,
  handleDelete
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {galleryImages.map((image) => (
        <Card key={image.id} className="overflow-hidden">
          <div className="aspect-square relative">
            <img 
              src={image.image_url} 
              alt={image.title} 
              className="object-cover w-full h-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
            {image.featured && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                Featured
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg truncate">{image.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{image.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs px-2 py-1 bg-slate-100 rounded-full">
                {image.category}
              </span>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleEdit(image)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog open={deleteId === image.id} onOpenChange={(open) => !open && setDeleteId(null)}>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setDeleteId(image.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Gallery Image</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this image? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDelete(image.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GalleryGrid;
