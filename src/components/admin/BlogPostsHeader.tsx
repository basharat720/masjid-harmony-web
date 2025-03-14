
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Plus, RefreshCw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BlogPostForm } from './BlogPostForm';

interface BlogPostsHeaderProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  fetchBlogPosts: () => Promise<void>;
  handleAddSuccess: () => void;
}

const BlogPostsHeader: React.FC<BlogPostsHeaderProps> = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  fetchBlogPosts,
  handleAddSuccess
}) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <CardTitle className="text-2xl">Blog Posts</CardTitle>
        <CardDescription>
          Manage blog posts on the masjid website
        </CardDescription>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={fetchBlogPosts} 
          title="Refresh"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Blog Post</DialogTitle>
            </DialogHeader>
            <BlogPostForm onSuccess={handleAddSuccess} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BlogPostsHeader;
