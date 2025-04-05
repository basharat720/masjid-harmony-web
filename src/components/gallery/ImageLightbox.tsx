
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type GalleryImage = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  featured: boolean;
};

interface ImageLightboxProps {
  image: GalleryImage | null;
  onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 bg-masjid-navy/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[60vh]">
          <img 
            src={image.image_url} 
            alt={image.title} 
            className="w-full h-full object-contain"
          />
          <Button 
            variant="ghost" 
            className="absolute top-2 right-2 text-masjid-navy bg-white/80 hover:bg-white rounded-full h-8 w-8 p-0"
            onClick={onClose}
          >
            ✕
          </Button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-masjid-primary">{image.title}</h2>
          {image.description && (
            <p className="mt-2 text-masjid-navy/80">{image.description}</p>
          )}
          <div className="mt-4 flex justify-between items-center">
            <Badge className="bg-masjid-secondary">{image.category}</Badge>
            {image.featured && (
              <Badge className="bg-masjid-gold">Featured</Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;
