
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Image, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type GalleryImage = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  featured: boolean;
};

const GalleryPage = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    async function fetchGalleryImages() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching gallery images:', error);
          return;
        }
        
        setGalleryImages(data || []);
        
        // Extract unique categories
        if (data) {
          const uniqueCategories = ['All', ...new Set(data.map(img => img.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGalleryImages();
  }, []);
  
  const filteredImages = galleryImages.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (image.description && image.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || image.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-8 pb-16 bg-masjid-light">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold text-masjid-primary text-center mb-4">Masjid Gallery</h1>
          <p className="text-center text-masjid-navy/80 max-w-2xl mx-auto mb-10">
            Explore our collection of images showcasing our masjid, community events, and special moments.
          </p>
          
          {/* Search and filters */}
          <div className="mb-12 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-masjid-navy/50" size={18} />
              <Input
                type="text"
                placeholder="Search gallery..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {categories.map(category => (
                <Badge 
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={`cursor-pointer ${
                    activeCategory === category 
                      ? "bg-masjid-primary hover:bg-masjid-primary/90" 
                      : "hover:bg-masjid-cream"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Gallery grid */}
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-masjid-primary"></div>
            </div>
          ) : filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map(image => (
                <div 
                  key={image.id}
                  className={`group relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${image.featured ? 'ring-2 ring-masjid-gold' : ''}`}
                  onClick={() => handleImageClick(image)}
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
          ) : (
            <div className="text-center py-16">
              <Image className="mx-auto h-16 w-16 text-masjid-navy/30 mb-4" />
              <h3 className="text-xl font-semibold text-masjid-navy">No Images Found</h3>
              <p className="text-masjid-navy/70 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
        
        {/* Lightbox for selected image */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-masjid-navy/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[60vh]">
                <img 
                  src={selectedImage.image_url} 
                  alt={selectedImage.title} 
                  className="w-full h-full object-contain"
                />
                <Button 
                  variant="ghost" 
                  className="absolute top-2 right-2 text-masjid-navy bg-white/80 hover:bg-white rounded-full h-8 w-8 p-0"
                  onClick={() => setSelectedImage(null)}
                >
                  ✕
                </Button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-masjid-primary">{selectedImage.title}</h2>
                {selectedImage.description && (
                  <p className="mt-2 text-masjid-navy/80">{selectedImage.description}</p>
                )}
                <div className="mt-4 flex justify-between items-center">
                  <Badge className="bg-masjid-secondary">{selectedImage.category}</Badge>
                  {selectedImage.featured && (
                    <Badge className="bg-masjid-gold">Featured</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
