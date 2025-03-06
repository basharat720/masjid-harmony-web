
import React from 'react';
import { Clock, Calendar, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const prayerTimes = [
  { name: 'Fajr', time: '5:30 AM', adhan: '5:20 AM', iqamah: '5:40 AM', arabicName: 'الفجر' },
  { name: 'Dhuhr', time: '1:15 PM', adhan: '1:05 PM', iqamah: '1:25 PM', arabicName: 'الظهر' },
  { name: 'Asr', time: '4:45 PM', adhan: '4:35 PM', iqamah: '4:55 PM', arabicName: 'العصر' },
  { name: 'Maghrib', time: '7:05 PM', adhan: '7:05 PM', iqamah: '7:15 PM', arabicName: 'المغرب' },
  { name: 'Isha', time: '8:30 PM', adhan: '8:20 PM', iqamah: '8:40 PM', arabicName: 'العشاء' },
];

const PrayerTimes = () => {
  return (
    <section className="bg-masjid-cream py-16">
      <div className="section-container">
        <h2 className="section-title">Prayer Times</h2>
        <p className="text-center text-masjid-navy/80 max-w-2xl mx-auto mb-10">
          Join us for daily prayers at Masjid Imam Hussain. Times are updated regularly based on geographical location and astronomical calculations.
        </p>
        
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-masjid-primary">
              <Calendar size={20} className="mr-2" />
              <span className="font-medium">Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <Button variant="outline" className="text-masjid-primary border-masjid-primary hover:bg-masjid-primary/10">
              View Monthly Calendar
            </Button>
          </div>
          
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
