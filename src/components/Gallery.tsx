
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, ChevronRight, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample gallery images for the homepage preview
const sampleImages = [
  {
    id: '1',
    title: 'Masjid Prayer Hall',
    image_url: 'https://images.unsplash.com/photo-1564286854376-6bb49ff96ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Interior'
  },
  {
    id: '2',
    title: 'Community Gathering',
    image_url: 'https://images.unsplash.com/photo-1526139334526-f591a54b477c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Events'
  },
  {
    id: '3',
    title: 'Ramadan Celebration',
    image_url: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Celebrations'
  },
  {
    id: '4',
    title: 'Masjid Architecture',
    image_url: 'https://images.unsplash.com/photo-1580237072522-d715a6e7c19e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Architecture'
  }
];

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
        <h2 className="section-title">Our Gallery</h2>
        <p className="text-center text-masjid-navy/80 max-w-2xl mx-auto mb-10">
          Explore moments from our community, events, and the beautiful architecture of our masjid.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {sampleImages.map((image) => (
            <div 
              key={image.id} 
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={image.image_url} 
                  alt={image.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-masjid-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                <span className="text-masjid-cream/90 text-sm">{image.category}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button 
            className="cta-button" 
            onClick={handleViewFullGallery}
          >
            <Layout size={18} className="mr-2" /> View Full Gallery <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
