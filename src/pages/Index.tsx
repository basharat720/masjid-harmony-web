
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PrayerTimes from '../components/PrayerTimes';
import About from '../components/About';
import Events from '../components/Events';
import Donation from '../components/Donation';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <PrayerTimes />
        <About />
        <Events />
        <Donation />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
