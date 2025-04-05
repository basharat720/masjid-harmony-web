
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import FeaturedBlogPost from '../components/blog/FeaturedBlogPost';
import BlogSearchFilter from '../components/blog/BlogSearchFilter';
import BlogPostsGrid from '../components/blog/BlogPostsGrid';
import { useBlogPage } from '@/hooks/useBlogPage';

const Blog = () => {
  const navigate = useNavigate();
  const {
    featuredPost,
    loading,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    categories,
    filteredPosts
  } = useBlogPage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-8 pb-16 bg-masjid-light">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold text-masjid-primary text-center mb-4">Masjid Blog</h1>
          <p className="text-center text-masjid-navy/80 max-w-2xl mx-auto mb-10">
            Insights, stories, and updates from our community.
          </p>
          
          {/* Featured post */}
          {!loading && featuredPost && <FeaturedBlogPost post={featuredPost} />}
          
          {/* Search and filters */}
          <BlogSearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
          />
          
          {/* All blog posts */}
          <h2 className="text-2xl font-bold text-masjid-primary mb-6 flex items-center">
            <span className="mr-2">All Posts</span>
            <div className="flex-grow h-px bg-masjid-primary/30"></div>
          </h2>
          
          <BlogPostsGrid loading={loading} displayedPosts={filteredPosts} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
