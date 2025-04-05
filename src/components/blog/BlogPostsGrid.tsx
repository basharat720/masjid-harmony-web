
import React from 'react';
import BlogPostCard from './BlogPostCard';
import EmptyBlogState from './EmptyBlogState';
import { BlogPost } from '@/hooks/useBlogPostsDisplay';

interface BlogPostsGridProps {
  loading: boolean;
  displayedPosts: BlogPost[];
}

const BlogPostsGrid: React.FC<BlogPostsGridProps> = ({ loading, displayedPosts }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-masjid-primary"></div>
      </div>
    );
  }
  
  if (displayedPosts.length === 0) {
    return <EmptyBlogState />;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedPosts.map(post => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogPostsGrid;
