
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type GalleryImage = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export function useGallery() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editImage, setEditImage] = useState<GalleryImage | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchGalleryImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleryImages(data || []);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      toast({
        title: 'Error',
        description: 'Failed to load gallery images',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const handleEdit = (image: GalleryImage) => {
    setEditImage(image);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setGalleryImages(galleryImages.filter(img => img.id !== id));
      toast({
        title: 'Image deleted',
        description: 'The gallery image has been deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete gallery image',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handleAddSuccess = () => {
    setIsAddDialogOpen(false);
    fetchGalleryImages();
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setEditImage(null);
    fetchGalleryImages();
  };

  return {
    galleryImages,
    loading,
    editImage,
    isAddDialogOpen,
    isEditDialogOpen,
    deleteId,
    setIsAddDialogOpen,
    setIsEditDialogOpen,
    setDeleteId,
    fetchGalleryImages,
    handleEdit,
    handleDelete,
    handleAddSuccess,
    handleEditSuccess
  };
}
