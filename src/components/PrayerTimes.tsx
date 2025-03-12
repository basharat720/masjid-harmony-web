
import React, { useState } from 'react';
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
        <p className="text-center text-masjid-navy max-w-2xl mx-auto mb-10 font-medium">
          Join us for daily prayers at Masjid Imam Hussain (Fiqa Jafferia). Times are updated by the masjid administration.
        </p>
        
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
            <div className="flex items-center text-masjid-primary font-semibold">
              <Calendar size={20} className="mr-2" />
              <span>Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-masjid-primary mx-auto"></div>
              <p className="mt-4 text-masjid-navy font-medium">Loading prayer times...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-600 font-medium">
              <p>{error}</p>
              <p>Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {prayerTimes.map((prayer) => (
                <Card key={prayer.name} className="prayer-time-card transition-all hover:scale-105">
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="text-xl font-arabic text-masjid-gold mb-1">{prayer.arabicName}</div>
                    <h3 className="font-bold text-lg text-masjid-primary">{prayer.name}</h3>
                    <div className="text-3xl font-medium text-masjid-navy my-2">{prayer.time}</div>
                    <div className="text-sm text-masjid-navy flex items-center">
                      <Bell size={14} className="mr-1" /> <span className="font-medium">Adhan:</span> {prayer.adhan}
                    </div>
                    <div className="text-sm text-masjid-navy mt-1"><span className="font-medium">Iqamah:</span> {prayer.iqamah}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-masjid-navy mb-4 font-medium">
            Download our mobile app to get prayer time notifications and updates.
          </p>
          <Button className="bg-masjid-gold hover:bg-masjid-gold/90 text-masjid-navy font-medium px-8 py-3 shadow-md">
            <Clock size={18} className="mr-2" /> Download Prayer Times App
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PrayerTimes;
