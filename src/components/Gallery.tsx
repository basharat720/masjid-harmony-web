
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

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: string;
};

const galleryImages: GalleryImage[] = [
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
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = Array.from(new Set(galleryImages.map(img => img.category)));

  return (
    <div className="section-container">
      <h2 className="section-title mb-10">Our Gallery</h2>
      
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map(image => (
              <GalleryCard key={image.id} image={image} onImageClick={setSelectedImage} />
            ))}
          </div>
        </TabsContent>
        
        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
              onClick={() => onImageClick(image)}
            />
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
