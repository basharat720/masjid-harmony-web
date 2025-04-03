
import React from 'react';
import Navbar from '../components/Navbar';
import GalleryComponent from '../components/Gallery';
import Footer from '../components/Footer';

const GalleryPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <GalleryComponent />
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
