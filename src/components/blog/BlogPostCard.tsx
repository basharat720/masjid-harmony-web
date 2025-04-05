
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, User, Clock, ChevronRight } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlogPostsDisplay';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const navigate = useNavigate();
  
  const handleReadMore = () => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-masjid-cream group">
      <div className="h-52 overflow-hidden">
        <img 
          src={post.image_url} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="bg-masjid-cream text-masjid-navy">
            {post.category}
          </Badge>
          <div className="flex items-center text-sm text-masjid-navy/70">
            <CalendarIcon size={14} className="mr-1" />
            {new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-masjid-primary group-hover:text-masjid-gold transition-colors">
          {post.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-1">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex items-center text-sm">
          <User size={14} className="mr-1 text-masjid-navy/70" />
          <span className="text-masjid-navy/70">{post.author}</span>
          <Clock size={14} className="ml-3 mr-1 text-masjid-navy/70" />
          <span className="text-masjid-navy/70">{post.read_time}</span>
        </div>
        <Button 
          variant="ghost" 
          className="text-masjid-primary hover:text-masjid-gold hover:bg-transparent p-0"
          onClick={handleReadMore}
        >
          Read More <ChevronRight size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
