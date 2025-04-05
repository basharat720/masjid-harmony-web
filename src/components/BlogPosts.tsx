
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';
import { useBlogPostsDisplay } from '@/hooks/useBlogPostsDisplay';
import BlogSearchFilter from './blog/BlogSearchFilter';
import BlogPostsGrid from './blog/BlogPostsGrid';

const BlogPosts = () => {
  const {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    filteredPosts,
    displayedPosts,
    loading,
    categories,
    visiblePosts,
    loadMorePosts
  } = useBlogPostsDisplay();

  return (
    <section id="blog" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Latest from Our Blog</h2>
        <p className="text-center text-masjid-navy/80 max-w-2xl mx-auto mb-10">
          Stay updated with our latest news, articles, and community events.
        </p>
        
        {/* Search and filters */}
        <BlogSearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
        />
        
        {/* Blog posts grid */}
        <BlogPostsGrid loading={loading} displayedPosts={displayedPosts} />
        
        {/* Load more button - only show if there are more posts to load */}
        {filteredPosts.length > visiblePosts && (
          <div className="mt-10 text-center">
            <Button 
              variant="outline" 
              className="border-masjid-primary text-masjid-primary hover:bg-masjid-primary/10"
              onClick={loadMorePosts}
            >
              Load More Articles
            </Button>
          </div>
        )}
        
        <div className="text-center mt-10">
          <Button className="cta-button" asChild>
            <Link to="/blog">
              <FileText size={18} className="mr-2" /> View All Posts
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
