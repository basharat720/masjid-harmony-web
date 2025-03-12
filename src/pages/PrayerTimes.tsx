
import React from 'react';
import Navbar from '../components/Navbar';
import PrayerTimes from '../components/PrayerTimes';
import Footer from '../components/Footer';

const PrayerTimesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-masjid-primary text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Prayer Times</h1>
            <p className="text-masjid-gold">Masjid Imam Hussain (Fiqa Jafferia)</p>
          </div>
        </div>
        <PrayerTimes />
      </main>
      <Footer />
    </div>
  );
};

export default PrayerTimesPage;
