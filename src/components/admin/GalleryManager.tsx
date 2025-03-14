
import React from 'react';
import { useGallery } from '@/hooks/useGallery';
import { GalleryForm } from './GalleryForm';
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
import GalleryHeader from './GalleryHeader';
import GalleryGrid from './GalleryGrid';
import EmptyGalleryList from './EmptyGalleryList';

const GalleryManager = () => {
  const {
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
  } = useGallery();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <GalleryHeader 
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen}
          fetchGalleryImages={fetchGalleryImages}
          handleAddSuccess={handleAddSuccess}
        />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-masjid-primary"></div>
          </div>
        ) : galleryImages.length === 0 ? (
          <EmptyGalleryList />
        ) : (
          <GalleryGrid
            galleryImages={galleryImages}
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
              <DialogTitle>Edit Gallery Image</DialogTitle>
            </DialogHeader>
            {editImage && (
              <GalleryForm 
                galleryImage={editImage} 
                onSuccess={handleEditSuccess} 
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default GalleryManager;
