
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-masjid-primary text-white overflow-hidden h-[600px] md:h-[650px] lg:h-[700px]">
      {/* Decorative Islamic pattern overlay */}
      <div className="absolute inset-0 islamic-pattern bg-masjid-primary opacity-10"></div>
      
      <div className="relative section-container">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 animate-fade-in">
            Welcome to Masjid Imam Hussain
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 animate-slide-up max-w-xl mx-auto">
            A place of worship, learning, and community service dedicated to the worship of Allah and following the teachings of Islam.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-masjid-gold hover:bg-masjid-gold/90 text-masjid-navy font-medium px-8 py-6 text-lg rounded-md shadow-lg transition-all w-full sm:w-auto">
              Prayer Times
            </Button>
            <Button variant="outline" className="border-white bg-transparent hover:bg-white hover:text-masjid-primary font-medium px-8 py-6 text-lg rounded-md transition-all w-full sm:w-auto">
              Learn More <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
