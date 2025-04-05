
import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'lucide-react';

const galleryAlbums = [
  {
    id: 'masjid-exterior',
    title: 'Masjid Exterior',
    description: 'Views of our beautiful masjid building',
    image: '/path/to/masjid-exterior.jpg', // Replace with actual image path
    category: 'Masjid'
  },
  {
    id: 'prayer-hall',
    title: 'Prayer Hall',
    description: 'Inside our main prayer hall',
    image: '/path/to/prayer-hall.jpg', // Replace with actual image path
    category: 'Interior'
  },
  {
    id: 'ramadan-activities',
    title: 'Ramadan Activities',
    description: 'Activities during the blessed month',
    image: '/path/to/ramadan.jpg', // Replace with actual image path
    category: 'Events'
  },
  {
    id: 'eid-celebrations',
    title: 'Eid Celebrations',
    description: 'Community gatherings during Eid',
    image: '/path/to/eid.jpg', // Replace with actual image path
    category: 'Community'
  },
  {
    id: 'islamic-classes',
    title: 'Islamic Classes',
    description: 'Learning and education programs',
    image: '/path/to/classes.jpg', // Replace with actual image path
    category: 'Education'
  },
  {
    id: 'childrens-school',
    title: "Children's School",
    description: 'Our educational programs for children',
    image: '/path/to/children.jpg', // Replace with actual image path
    category: 'Education'
  }
];

const Gallery = () => {
  return (
    <section className="py-16 bg-masjid-light">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-masjid-primary mb-4">
          Our Gallery
        </h2>
        <p className="text-center text-masjid-navy/80 max-w-2xl mx-auto mb-10">
          Explore moments from our community gatherings, events, and celebrations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryAlbums.map((album) => (
            <div 
              key={album.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={album.image} 
                  alt={album.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/70 rounded-full p-2">
                  <Image className="text-masjid-primary" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-masjid-primary mb-2">
                  {album.title}
                </h3>
                <p className="text-masjid-navy/80 mb-4">
                  {album.description}
                </p>
                <Link 
                  to={`/gallery/${album.id}`} 
                  className="text-masjid-gold hover:underline flex items-center"
                >
                  View Album → 
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
