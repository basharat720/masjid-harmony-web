
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-masjid-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-display font-bold text-masjid-gold mb-4">Masjid Imam Hussain</h3>
            <p className="text-gray-300 mb-4">
              A place of worship, learning, and community service dedicated to serving Muslims and promoting interfaith harmony.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-masjid-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-masjid-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-masjid-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-masjid-gold transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-display font-bold text-masjid-gold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/prayer-times" className="text-gray-300 hover:text-white transition-colors">Prayer Times</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white transition-colors">Events</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-display font-bold text-masjid-gold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 text-masjid-gold" />
                <span className="text-gray-300">123 Islamic Way, Harmony City, State 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-masjid-gold" />
                <span className="text-gray-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-masjid-gold" />
                <span className="text-gray-300">info@masjidimamhussain.org</span>
              </li>
            </ul>
          </div>
          
          {/* Prayer Times */}
          <div>
            <h3 className="text-xl font-display font-bold text-masjid-gold mb-4">Today's Prayer Times</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-300">Fajr</span>
                <span className="text-white">5:30 AM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Dhuhr</span>
                <span className="text-white">1:15 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Asr</span>
                <span className="text-white">4:45 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Maghrib</span>
                <span className="text-white">7:05 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Isha</span>
                <span className="text-white">8:30 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-masjid-primary/30">
          <p className="text-center text-gray-300">
            &copy; {new Date().getFullYear()} Masjid Imam Hussain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
