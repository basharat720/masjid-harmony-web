
import React from 'react';
import Navbar from '../components/Navbar';
import PrayerTimes from '../components/PrayerTimes';
import Footer from '../components/Footer';

const PrayerTimesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <PrayerTimes />
      </main>
      <Footer />
    </div>
  );
};

export default PrayerTimesPage;
