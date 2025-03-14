
import React from 'react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { BlogPostForm } from './BlogPostForm';
import BlogPostsHeader from './BlogPostsHeader';
import BlogPostsTable from './BlogPostsTable';
import EmptyBlogList from './EmptyBlogList';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const BlogPostManager = () => {
  const {
    blogPosts,
    loading,
    editBlogPost,
    isAddDialogOpen,
    isEditDialogOpen,
    deleteId,
    setIsAddDialogOpen,
    setIsEditDialogOpen,
    setDeleteId,
    fetchBlogPosts,
    handleEdit,
    handleDelete,
    handleAddSuccess,
    handleEditSuccess
  } = useBlogPosts();

  return (
    <Card>
      <CardHeader>
        <BlogPostsHeader 
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen}
          fetchBlogPosts={fetchBlogPosts}
          handleAddSuccess={handleAddSuccess}
        />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-masjid-primary"></div>
          </div>
        ) : blogPosts.length === 0 ? (
          <EmptyBlogList />
        ) : (
          <BlogPostsTable 
            blogPosts={blogPosts}
            deleteId={deleteId}
            setDeleteId={setDeleteId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Blog Post</DialogTitle>
            </DialogHeader>
            {editBlogPost && (
              <BlogPostForm 
                blogPost={editBlogPost} 
                onSuccess={handleEditSuccess} 
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default BlogPostManager;
