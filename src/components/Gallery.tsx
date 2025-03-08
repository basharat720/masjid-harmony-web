
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
import { 
  GalleryHorizontal, 
  Image,
  Folder,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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

// Gallery folders data
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

// Extended gallery images with folder assignments
const galleryImages: GalleryImage[] = [
  // Masjid Exterior folder
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
  
  // Prayer Hall folder
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
  
  // Ramadan Activities folder
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
  
  // Eid Celebrations folder
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
  
  // Islamic Classes folder
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
  
  // Children's School folder
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
  
  // Community Service folder
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
  
  // Interfaith Events folder
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
        
        {currentFolder ? (
          <div className="mt-6 animate-in fade-in-50 duration-300">
            <div className="mb-6 flex items-center">
              <Button 
                variant="outline" 
                className="flex items-center mr-4" 
                onClick={handleBackToFolders}
              >
                <ArrowLeft size={16} className="mr-1" /> Back to Folders
              </Button>
              {folderData && (
                <h3 className="text-xl font-semibold text-masjid-primary">{folderData.name}</h3>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryImages
                .filter(image => image.folder === currentFolder)
                .map(image => (
                  <GalleryCard key={image.id} image={image} onImageClick={setSelectedImage} />
                ))
              }
            </div>
          </div>
        ) : (
          <>
            <TabsContent value="all" className="mt-6 animate-in fade-in-50 duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {galleryFolders.map(folder => (
                  <FolderCard key={folder.id} folder={folder} onClick={handleFolderClick} />
                ))}
              </div>
            </TabsContent>
            
            {categories.map(category => (
              <TabsContent key={category} value={category} className="mt-6 animate-in fade-in-50 duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
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

const FolderCard = ({ 
  folder, 
  onClick 
}: { 
  folder: GalleryFolder; 
  onClick: (folderId: string) => void;
}) => {
  return (
    <Card className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" onClick={() => onClick(folder.id)}>
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={folder.thumbnailSrc} 
            alt={folder.name} 
            className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full">
            <Folder size={18} />
          </div>
        </div>
        <div className="p-4 bg-white">
          <p className="text-base font-medium text-masjid-primary">{folder.name}</p>
          <p className="text-sm text-muted-foreground mt-1">{folder.description}</p>
          <div className="flex items-center justify-end mt-2 text-sm text-masjid-gold">
            <span>View Album</span>
            <ChevronRight size={16} />
          </div>
        </div>
      </CardContent>
    </Card>
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
