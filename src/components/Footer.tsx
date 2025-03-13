
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-masjid-primary text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* About */}
          <div>
            <h3 className="text-lg font-display font-bold text-masjid-gold mb-4">Masjid Imam Hussain</h3>
            <p className="text-white/90 text-sm mb-4">
              A place of worship, learning, and community service dedicated to serving Muslims.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-white hover:text-masjid-gold transition-colors bg-white/10 p-2 rounded-full">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white hover:text-masjid-gold transition-colors bg-white/10 p-2 rounded-full">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white hover:text-masjid-gold transition-colors bg-white/10 p-2 rounded-full">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white hover:text-masjid-gold transition-colors bg-white/10 p-2 rounded-full">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-bold text-masjid-gold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-white/90 hover:text-masjid-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-white/90 hover:text-masjid-gold transition-colors">About Us</Link></li>
              <li><Link to="/prayer-times" className="text-white/90 hover:text-masjid-gold transition-colors">Prayer Times</Link></li>
              <li><Link to="/events" className="text-white/90 hover:text-masjid-gold transition-colors">Events</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-display font-bold text-masjid-gold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 text-masjid-gold" />
                <span className="text-white/90">123 Islamic Way, Harmony City</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-masjid-gold" />
                <span className="text-white/90">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-masjid-gold" />
                <span className="text-white/90">info@masjidimamhussain.org</span>
              </li>
            </ul>
          </div>
          
          {/* Prayer Times */}
          <div>
            <h3 className="text-lg font-display font-bold text-masjid-gold mb-4">Today's Prayers</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-white/90">Fajr</span>
                <span className="text-masjid-gold">5:30 AM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/90">Dhuhr</span>
                <span className="text-masjid-gold">1:15 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/90">Asr</span>
                <span className="text-masjid-gold">4:45 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/90">Maghrib</span>
                <span className="text-masjid-gold">7:05 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/90">Isha</span>
                <span className="text-masjid-gold">8:30 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/20">
          <p className="text-center text-white/80 text-sm">
            &copy; {new Date().getFullYear()} Masjid Imam Hussain (Fiqa Jafferia). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
