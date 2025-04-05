
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, CalendarIcon, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlogPostsDisplay';

interface FeaturedBlogPostProps {
  post: BlogPost;
}

const FeaturedBlogPost: React.FC<FeaturedBlogPostProps> = ({ post }) => {
  const navigate = useNavigate();
  
  const handleReadPost = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-masjid-primary mb-6 flex items-center">
        <span className="mr-2">Featured Post</span>
        <div className="flex-grow h-px bg-masjid-gold/30"></div>
      </h2>
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-video overflow-hidden">
            <img 
              src={post.image_url} 
              alt={post.title} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
          <div className="flex flex-col justify-center p-6">
            <Badge className="w-fit mb-2 bg-masjid-gold text-white">
              {post.category}
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-masjid-primary mb-3">
              {post.title}
            </h3>
            <p className="text-masjid-navy/80 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center text-sm text-masjid-navy/70 mb-6">
              <User size={16} className="mr-1" />
              <span className="mr-4">{post.author}</span>
              <CalendarIcon size={16} className="mr-1" />
              <span className="mr-4">
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
              <Clock size={16} className="mr-1" />
              <span>{post.read_time}</span>
            </div>
            <Button 
              className="cta-button w-fit"
              onClick={() => handleReadPost(post.id)}
            >
              Read Article <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FeaturedBlogPost;
