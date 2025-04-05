
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GallerySearchFilter from '../components/gallery/GallerySearchFilter';
import GalleryGrid from '../components/gallery/GalleryGrid';
import ImageLightbox from '../components/gallery/ImageLightbox';

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
          
          <GallerySearchFilter 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
          />
          
          <GalleryGrid 
            images={filteredImages}
            onImageClick={handleImageClick}
            loading={loading}
          />
          
          <ImageLightbox 
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
