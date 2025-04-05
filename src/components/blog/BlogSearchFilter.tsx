
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface BlogSearchFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: string[];
}

const BlogSearchFilter: React.FC<BlogSearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
  categories
}) => {
  return (
    <div className="mb-8 space-y-4">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-masjid-navy/50" size={18} />
        <Input
          type="text"
          placeholder="Search articles..."
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
  );
};

export default BlogSearchFilter;
