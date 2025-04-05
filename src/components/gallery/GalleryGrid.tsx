
import React from 'react';
import { Image } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type GalleryImage = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  featured: boolean;
};

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
  loading: boolean;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageClick, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-masjid-primary"></div>
      </div>
    );
  }
  
  if (images.length === 0) {
    return (
      <div className="text-center py-16">
        <Image className="mx-auto h-16 w-16 text-masjid-navy/30 mb-4" />
        <h3 className="text-xl font-semibold text-masjid-navy">No Images Found</h3>
        <p className="text-masjid-navy/70 mt-2">Try adjusting your search or filter criteria</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map(image => (
        <div 
          key={image.id}
          className={`group relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${image.featured ? 'ring-2 ring-masjid-gold' : ''}`}
          onClick={() => onImageClick(image)}
        >
          <div className="aspect-square overflow-hidden">
            <img 
              src={image.image_url} 
              alt={image.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-masjid-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-white font-semibold text-lg">{image.title}</h3>
            {image.description && (
              <p className="text-white/90 text-sm line-clamp-2 mb-1">{image.description}</p>
            )}
            <span className="text-masjid-cream/90 text-sm">{image.category}</span>
            {image.featured && (
              <Badge className="absolute top-3 right-3 bg-masjid-gold">Featured</Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
