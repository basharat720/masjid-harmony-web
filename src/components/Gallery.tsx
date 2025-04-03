
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Gallery = () => {
  const navigate = useNavigate();

  const handleViewFullGallery = () => {
    try {
      navigate('/gallery');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <section id="gallery" className="py-16 bg-masjid-cream">
      <div className="section-container">
        <div className="text-center mt-8">
          <Button 
            className="cta-button" 
            onClick={handleViewFullGallery}
          >
            <Image size={18} className="mr-2" /> View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
