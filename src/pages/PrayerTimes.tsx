
import React from 'react';
import Navbar from '../components/Navbar';
import PrayerTimes from '../components/PrayerTimes';
import Footer from '../components/Footer';

const PrayerTimesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-masjid-primary text-white py-8">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Prayer Times</h1>
            <p className="text-masjid-gold font-medium">Masjid Imam Hussain (Fiqa Jafferia)</p>
          </div>
        </div>
        <PrayerTimes />
      </main>
      <Footer />
    </div>
  );
};

export default PrayerTimesPage;
