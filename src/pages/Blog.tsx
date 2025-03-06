
import React from 'react';
import Navbar from '../components/Navbar';
import BlogPosts from '../components/BlogPosts';
import Footer from '../components/Footer';

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <BlogPosts />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
