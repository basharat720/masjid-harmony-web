
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
        <section id="prayer-times">
          <PrayerTimes />
        </section>
        <section id="events">
          <Events />
        </section>
        <section id="gallery">
          <Gallery />
        </section>
        <section id="blog">
          <BlogPosts />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <section id="donate">
          <Donation />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
