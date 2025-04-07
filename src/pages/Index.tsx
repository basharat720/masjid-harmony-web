
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PrayerTimes from '../components/PrayerTimes';
import Events from '../components/Events';
import Donation from '../components/Donation';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BlogPosts from '../components/BlogPosts';
import Gallery from '../components/Gallery';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section id="home">
          <Hero />
        </section>
        <section id="prayer-times" className="bg-masjid-light">
          <PrayerTimes />
        </section>
        <section id="events" className="bg-white">
          <Events />
        </section>
        <section id="gallery" className="bg-masjid-light">
          <Gallery />
        </section>
        <section id="blog" className="bg-white">
          <BlogPosts />
        </section>
        <section id="contact" className="bg-masjid-light">
          <Contact />
        </section>
        <section id="donate" className="bg-white">
          <Donation />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
