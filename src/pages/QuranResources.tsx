
import React from 'react';
import Navbar from '../components/Navbar';
import QuranContent from '../components/QuranContent';
import Footer from '../components/Footer';

const QuranResources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <QuranContent />
      </main>
      <Footer />
    </div>
  );
};

export default QuranResources;
