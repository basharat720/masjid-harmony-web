
import React from 'react';
import { Clock, Calendar, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePrayerTimes } from '../hooks/usePrayerTimes';

const PrayerTimes = () => {
  const { prayerTimes, loading, error } = usePrayerTimes();

  return (
    <section className="bg-masjid-cream py-16">
      <div className="section-container">
        <h2 className="section-title">Prayer Times</h2>
        <p className="text-center text-masjid-navy/80 max-w-2xl mx-auto mb-10">
          Join us for daily prayers at Masjid Imam Hussain. Times are updated by the masjid administration.
        </p>
        
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
            <div className="flex items-center text-masjid-primary">
              <Calendar size={20} className="mr-2" />
              <span className="font-medium">Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-masjid-primary mx-auto"></div>
              <p className="mt-4 text-masjid-navy">Loading prayer times...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">
              <p>{error}</p>
              <p>Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {prayerTimes.map((prayer) => (
                <Card key={prayer.name} className="prayer-time-card">
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="text-xl font-arabic text-masjid-primary mb-1">{prayer.arabicName}</div>
                    <h3 className="font-bold text-lg text-masjid-primary">{prayer.name}</h3>
                    <div className="text-3xl font-medium text-masjid-navy my-2">{prayer.time}</div>
                    <div className="text-sm text-masjid-navy/70 flex items-center">
                      <Bell size={14} className="mr-1" /> Adhan: {prayer.adhan}
                    </div>
                    <div className="text-sm text-masjid-navy/70 mt-1">Iqamah: {prayer.iqamah}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-masjid-navy/80 mb-4">
            Download our mobile app to get prayer time notifications and updates.
          </p>
          <Button className="cta-button">
            <Clock size={18} className="mr-2" /> Download Prayer Times App
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PrayerTimes;
