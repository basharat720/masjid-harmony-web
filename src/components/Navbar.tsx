
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, AlignRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-masjid-primary font-arabic text-2xl font-bold">مسجد إمام حسين</span>
              <span className="ml-2 font-display text-masjid-navy text-xl">Masjid Imam Hussain</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/about" className="navbar-link">About Us</Link>
            <Link to="/prayer-times" className="navbar-link">Prayer Times</Link>
            <Link to="/events" className="navbar-link">Events</Link>
            <Link to="/gallery" className="navbar-link">Gallery</Link>
            <Link to="/contact" className="navbar-link">Contact</Link>
            <Button className="cta-button ml-4">Donate</Button>
          </div>
          
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-masjid-navy hover:text-masjid-primary hover:bg-masjid-cream transition duration-150 ease-in-out"
            >
              {isMenuOpen ? <X size={24} /> : <AlignRight size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link to="/" className="block navbar-link">Home</Link>
            <Link to="/about" className="block navbar-link">About Us</Link>
            <Link to="/prayer-times" className="block navbar-link">Prayer Times</Link>
            <Link to="/events" className="block navbar-link">Events</Link>
            <Link to="/gallery" className="block navbar-link">Gallery</Link>
            <Link to="/contact" className="block navbar-link">Contact</Link>
            <Button className="cta-button w-full mt-4">Donate</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
