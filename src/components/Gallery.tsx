
import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { GalleryHorizontal, Image } from 'lucide-react';

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: string;
};

// Extended gallery images with more photos per category
const galleryImages: GalleryImage[] = [
  // Masjid category
  {
    id: "img1",
    src: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&h=400",
    alt: "Masjid exterior view",
    category: "masjid"
  },
  {
    id: "img2",
    src: "https://images.unsplash.com/photo-1604743960161-92e065d583c9?auto=format&fit=crop&w=600&h=400",
    alt: "Prayer hall",
    category: "masjid"
  },
  {
    id: "img7",
    src: "https://images.unsplash.com/photo-1545159199-1e4824b2e8fb?auto=format&fit=crop&w=600&h=400",
    alt: "Masjid architecture",
    category: "masjid"
  },
  {
    id: "img8",
    src: "https://images.unsplash.com/photo-1564492466532-6ab912269193?auto=format&fit=crop&w=600&h=400",
    alt: "Minaret at sunset",
    category: "masjid"
  },
  
  // Events category
  {
    id: "img3",
    src: "https://images.unsplash.com/photo-1591825374132-989584e5eb88?auto=format&fit=crop&w=600&h=400",
    alt: "Community iftar",
    category: "events"
  },
  {
    id: "img4",
    src: "https://images.unsplash.com/photo-1600002423562-754954bb1b6c?auto=format&fit=crop&w=600&h=400",
    alt: "Eid celebration",
    category: "events"
  },
  {
    id: "img9",
    src: "https://images.unsplash.com/photo-1607473128383-0cf6c96f0689?auto=format&fit=crop&w=600&h=400",
    alt: "Islamic conference",
    category: "events"
  },
  {
    id: "img10",
    src: "https://images.unsplash.com/photo-1593959900307-13e7f583cb1a?auto=format&fit=crop&w=600&h=400",
    alt: "Charity fundraiser",
    category: "events"
  },
  
  // Education category
  {
    id: "img5",
    src: "https://images.unsplash.com/photo-1566378179254-c4c6bae9d2b7?auto=format&fit=crop&w=600&h=400",
    alt: "Quranic studies class",
    category: "education"
  },
  {
    id: "img6",
    src: "https://images.unsplash.com/photo-1603565103583-93193e42b2a3?auto=format&fit=crop&w=600&h=400",
    alt: "Children's Islamic school",
    category: "education"
  },
  {
    id: "img11",
    src: "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?auto=format&fit=crop&w=600&h=400",
    alt: "Tajweed lesson",
    category: "education"
  },
  {
    id: "img12",
    src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efd?auto=format&fit=crop&w=600&h=400",
    alt: "Islamic library",
    category: "education"
  },
  
  // Community category (new)
  {
    id: "img13",
    src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&h=400",
    alt: "Community service day",
    category: "community"
  },
  {
    id: "img14",
    src: "https://images.unsplash.com/photo-1603804022303-d4fc84357a91?auto=format&fit=crop&w=600&h=400",
    alt: "Interfaith gathering",
    category: "community"
  },
  {
    id: "img15",
    src: "https://images.unsplash.com/photo-1536337005238-94b997371b40?auto=format&fit=crop&w=600&h=400",
    alt: "Youth group meeting",
    category: "community"
  },
  {
    id: "img16",
    src: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=600&h=400",
    alt: "Food distribution",
    category: "community"
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = Array.from(new Set(galleryImages.map(img => img.category)));

  return (
    <div className="section-container py-16">
      <h2 className="section-title mb-10 flex items-center justify-center">
        <GalleryHorizontal className="mr-2 text-masjid-gold" size={28} />
        <span>Our Gallery</span>
      </h2>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8 flex flex-wrap justify-center">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map(image => (
              <GalleryCard key={image.id} image={image} onImageClick={setSelectedImage} />
            ))}
          </div>
        </TabsContent>
        
        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryImages
                .filter(image => image.category === category)
                .map(image => (
                  <GalleryCard key={image.id} image={image} onImageClick={setSelectedImage} />
                ))
              }
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <Dialog>
        <DialogTrigger asChild>
          <span className="hidden">Open Image</span>
        </DialogTrigger>
        <DialogContent className="max-w-4xl p-1 bg-transparent border-none">
          {selectedImage && (
            <img 
              src={selectedImage.src.replace('w=600&h=400', 'w=1200&h=800')} 
              alt={selectedImage.alt} 
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const GalleryCard = ({ 
  image, 
  onImageClick 
}: { 
  image: GalleryImage; 
  onImageClick: (image: GalleryImage) => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="p-0">
            <div className="relative">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                onClick={() => onImageClick(image)}
              />
              <div className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full">
                <Image size={16} />
              </div>
            </div>
            <div className="p-4 bg-white">
              <p className="text-sm font-medium text-masjid-primary">{image.alt}</p>
              <p className="text-xs text-muted-foreground mt-1 capitalize">{image.category}</p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-1 bg-transparent border-none">
        <img 
          src={image.src.replace('w=600&h=400', 'w=1200&h=800')} 
          alt={image.alt} 
          className="w-full h-auto rounded-lg"
        />
      </DialogContent>
    </Dialog>
  );
};

export default Gallery;
