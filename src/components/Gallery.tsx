import React, { useState, useEffect } from 'react';
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
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  GalleryHorizontal, 
  Image,
  Folder,
  ArrowLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: string;
  folder?: string;
};

type GalleryFolder = {
  id: string;
  name: string;
  category: string;
  thumbnailSrc: string;
  description: string;
};

const galleryFolders: GalleryFolder[] = [
  {
    id: "folder1",
    name: "Masjid Exterior",
    category: "masjid",
    thumbnailSrc: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&h=400",
    description: "Views of our beautiful masjid building"
  },
  {
    id: "folder2",
    name: "Prayer Hall",
    category: "masjid",
    thumbnailSrc: "https://images.unsplash.com/photo-1604743960161-92e065d583c9?auto=format&fit=crop&w=600&h=400",
    description: "Inside our main prayer hall"
  },
  {
    id: "folder3",
    name: "Ramadan Activities",
    category: "events",
    thumbnailSrc: "https://images.unsplash.com/photo-1591825374132-989584e5eb88?auto=format&fit=crop&w=600&h=400",
    description: "Activities during the blessed month"
  },
  {
    id: "folder4",
    name: "Eid Celebrations",
    category: "events",
    thumbnailSrc: "https://images.unsplash.com/photo-1600002423562-754954bb1b6c?auto=format&fit=crop&w=600&h=400",
    description: "Eid gatherings and festivities"
  },
  {
    id: "folder5",
    name: "Islamic Classes",
    category: "education",
    thumbnailSrc: "https://images.unsplash.com/photo-1566378179254-c4c6bae9d2b7?auto=format&fit=crop&w=600&h=400",
    description: "Educational activities and classes"
  },
  {
    id: "folder6",
    name: "Children's School",
    category: "education",
    thumbnailSrc: "https://images.unsplash.com/photo-1603565103583-93193e42b2a3?auto=format&fit=crop&w=600&h=400",
    description: "Our weekend school for children"
  },
  {
    id: "folder7",
    name: "Community Service",
    category: "community",
    thumbnailSrc: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&h=400",
    description: "Serving our community together"
  },
  {
    id: "folder8",
    name: "Interfaith Events",
    category: "community",
    thumbnailSrc: "https://images.unsplash.com/photo-1603804022303-d4fc84357a91?auto=format&fit=crop&w=600&h=400",
    description: "Building bridges with other communities"
  }
];

const galleryImages: GalleryImage[] = [
  {
    id: "img1",
    src: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&h=400",
    alt: "Masjid exterior view",
    category: "masjid",
    folder: "folder1"
  },
  {
    id: "img7",
    src: "https://images.unsplash.com/photo-1545159199-1e4824b2e8fb?auto=format&fit=crop&w=600&h=400",
    alt: "Masjid architecture",
    category: "masjid",
    folder: "folder1"
  },
  {
    id: "img8",
    src: "https://images.unsplash.com/photo-1564492466532-6ab912269193?auto=format&fit=crop&w=600&h=400",
    alt: "Minaret at sunset",
    category: "masjid",
    folder: "folder1"
  },
  {
    id: "img28",
    src: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=600&h=400",
    alt: "Masjid dome",
    category: "masjid",
    folder: "folder1"
  },
  {
    id: "img29",
    src: "https://images.unsplash.com/photo-1527875393219-e92d7061f553?auto=format&fit=crop&w=600&h=400",
    alt: "Masjid entrance",
    category: "masjid",
    folder: "folder1"
  },
  {
    id: "img30",
    src: "https://images.unsplash.com/photo-1585036156250-91201152ffc8?auto=format&fit=crop&w=600&h=400",
    alt: "Mosque courtyard",
    category: "masjid",
    folder: "folder1"
  },
  
  {
    id: "img2",
    src: "https://images.unsplash.com/photo-1604743960161-92e065d583c9?auto=format&fit=crop&w=600&h=400",
    alt: "Prayer hall",
    category: "masjid",
    folder: "folder2"
  },
  {
    id: "img20",
    src: "https://images.unsplash.com/photo-1585036156250-91201152ffc8?auto=format&fit=crop&w=600&h=400",
    alt: "Prayer hall interior",
    category: "masjid",
    folder: "folder2"
  },
  {
    id: "img21",
    src: "https://images.unsplash.com/photo-1535082992628-7598376929ae?auto=format&fit=crop&w=600&h=400",
    alt: "Chandelier in prayer hall",
    category: "masjid",
    folder: "folder2"
  },
  
  {
    id: "img3",
    src: "https://images.unsplash.com/photo-1591825374132-989584e5eb88?auto=format&fit=crop&w=600&h=400",
    alt: "Community iftar",
    category: "events",
    folder: "folder3"
  },
  {
    id: "img22",
    src: "https://images.unsplash.com/photo-1586774098259-eaf7c9b2a71d?auto=format&fit=crop&w=600&h=400",
    alt: "Ramadan decorations",
    category: "events",
    folder: "folder3"
  },
  {
    id: "img23",
    src: "https://images.unsplash.com/photo-1589296425498-1c2a8c2b1288?auto=format&fit=crop&w=600&h=400",
    alt: "Taraweeh prayers",
    category: "events",
    folder: "folder3"
  },
  
  {
    id: "img4",
    src: "https://images.unsplash.com/photo-1600002423562-754954bb1b6c?auto=format&fit=crop&w=600&h=400",
    alt: "Eid celebration",
    category: "events",
    folder: "folder4"
  },
  {
    id: "img9",
    src: "https://images.unsplash.com/photo-1607473128383-0cf6c96f0689?auto=format&fit=crop&w=600&h=400",
    alt: "Islamic conference",
    category: "events",
    folder: "folder4"
  },
  {
    id: "img10",
    src: "https://images.unsplash.com/photo-1593959900307-13e7f583cb1a?auto=format&fit=crop&w=600&h=400",
    alt: "Charity fundraiser",
    category: "events",
    folder: "folder4"
  },
  
  {
    id: "img5",
    src: "https://images.unsplash.com/photo-1566378179254-c4c6bae9d2b7?auto=format&fit=crop&w=600&h=400",
    alt: "Quranic studies class",
    category: "education",
    folder: "folder5"
  },
  {
    id: "img11",
    src: "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?auto=format&fit=crop&w=600&h=400",
    alt: "Tajweed lesson",
    category: "education",
    folder: "folder5"
  },
  {
    id: "img24",
    src: "https://images.unsplash.com/photo-1535957998253-26ae1ef29506?auto=format&fit=crop&w=600&h=400",
    alt: "Adult education",
    category: "education",
    folder: "folder5"
  },
  
  {
    id: "img6",
    src: "https://images.unsplash.com/photo-1603565103583-93193e42b2a3?auto=format&fit=crop&w=600&h=400",
    alt: "Children's Islamic school",
    category: "education",
    folder: "folder6"
  },
  {
    id: "img12",
    src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efd?auto=format&fit=crop&w=600&h=400",
    alt: "Islamic library",
    category: "education",
    folder: "folder6"
  },
  {
    id: "img25",
    src: "https://images.unsplash.com/photo-1583468982228-19f19164aee1?auto=format&fit=crop&w=600&h=400",
    alt: "Children's activity",
    category: "education",
    folder: "folder6"
  },
  
  {
    id: "img13",
    src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&h=400",
    alt: "Community service day",
    category: "community",
    folder: "folder7"
  },
  {
    id: "img15",
    src: "https://images.unsplash.com/photo-1536337005238-94b997371b40?auto=format&fit=crop&w=600&h=400",
    alt: "Youth group meeting",
    category: "community",
    folder: "folder7"
  },
  {
    id: "img16",
    src: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=600&h=400",
    alt: "Food distribution",
    category: "community",
    folder: "folder7"
  },
  
  {
    id: "img14",
    src: "https://images.unsplash.com/photo-1603804022303-d4fc84357a91?auto=format&fit=crop&w=600&h=400",
    alt: "Interfaith gathering",
    category: "community",
    folder: "folder8"
  },
  {
    id: "img26",
    src: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=600&h=400",
    alt: "Dialog session",
    category: "community",
    folder: "folder8"
  },
  {
    id: "img27",
    src: "https://images.unsplash.com/photo-1526669754135-c1babeb8c542?auto=format&fit=crop&w=600&h=400",
    alt: "Community leaders meeting",
    category: "community",
    folder: "folder8"
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [folderData, setFolderData] = useState<GalleryFolder | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const categories = Array.from(new Set(galleryFolders.map(folder => folder.category)));

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
    const folder = galleryFolders.find(f => f.id === folderId) || null;
    setFolderData(folder);
  };

  const handleBackToFolders = () => {
    setCurrentFolder(null);
    setFolderData(null);
  };

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  return (
    <section id="gallery" className="py-16 bg-masjid-cream">
      <div className="section-container">
        <h2 className="section-title">Our Gallery</h2>
        <p className="text-center text-masjid-navy/80 max-w-2xl mx-auto mb-10">
          Explore moments from our community gatherings, events, and celebrations.
        </p>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 flex flex-wrap justify-center bg-muted/50 p-1 rounded-lg">
            <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
              All
            </TabsTrigger>
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {currentFolder ? (
            <div className="mt-6 animate-in fade-in-50 duration-300">
              <div className="mb-6 flex items-center">
                <Button 
                  variant="outline" 
                  className="flex items-center mr-4 group" 
                  onClick={handleBackToFolders}
                >
                  <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" /> 
                  Back to Folders
                </Button>
                {folderData && (
                  <h3 className="text-xl font-semibold text-masjid-primary flex items-center">
                    <Folder size={18} className="mr-2 text-masjid-gold" />
                    {folderData.name}
                  </h3>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {galleryImages
                  .filter(image => image.folder === currentFolder)
                  .map(image => (
                    <GalleryImageCard 
                      key={image.id} 
                      image={image} 
                      onImageClick={() => handleImageClick(image)} 
                    />
                  ))
                }
              </div>
            </div>
          ) : (
            <>
              <TabsContent value="all" className="mt-6 animate-in fade-in-50 duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryFolders.map(folder => (
                    <FolderCard key={folder.id} folder={folder} onClick={handleFolderClick} />
                  ))}
                </div>
              </TabsContent>
              
              {categories.map(category => (
                <TabsContent key={category} value={category} className="mt-6 animate-in fade-in-50 duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryFolders
                      .filter(folder => folder.category === category)
                      .map(folder => (
                        <FolderCard key={folder.id} folder={folder} onClick={handleFolderClick} />
                      ))
                    }
                  </div>
                </TabsContent>
              ))}
            </>
          )}
        </Tabs>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-4xl p-1 bg-white/90 backdrop-blur-sm border shadow-lg">
            <DialogTitle className="sr-only">Image Preview</DialogTitle>
            <DialogDescription className="sr-only">Larger view of the selected image</DialogDescription>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2 rounded-full bg-black/20 hover:bg-black/30 text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
              <span className="sr-only">Close</span>
            </Button>
            {selectedImage && (
              <div className="relative">
                <img 
                  src={selectedImage.src.replace('w=600&h=400', 'w=1200&h=800')} 
                  alt={selectedImage.alt} 
                  className="w-full h-auto rounded-md"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <h3 className="font-medium text-lg">{selectedImage.alt}</h3>
                  <p className="text-sm text-white/80 capitalize">{selectedImage.category}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        
        <div className="text-center mt-8">
          <Button className="cta-button" asChild>
            <Link to="/gallery">
              <Image size={18} className="mr-2" /> View Full Gallery
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const FolderCard = ({ 
  folder, 
  onClick 
}: { 
  folder: GalleryFolder; 
  onClick: (folderId: string) => void;
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-muted",
        "group"
      )} 
      onClick={() => onClick(folder.id)}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={folder.thumbnailSrc} 
            alt={folder.name} 
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full">
            <Folder size={18} />
          </div>
        </div>
        <div className="p-4 bg-white">
          <p className="text-base font-medium text-masjid-primary">{folder.name}</p>
          <p className="text-sm text-muted-foreground mt-1">{folder.description}</p>
          <div className="flex items-center justify-end mt-2 text-sm text-masjid-gold group-hover:text-masjid-primary transition-colors">
            <span>View Album</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const GalleryImageCard = ({ 
  image, 
  onImageClick 
}: { 
  image: GalleryImage; 
  onImageClick: () => void;
}) => {
  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-muted group"
      onClick={onImageClick}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={image.src} 
            alt={image.alt} 
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
  );
};

export default Gallery;
