
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Image, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    // If we're on the home page, scroll to the section
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're not on the home page, navigate to home page with section hash
      window.location.href = `/#${sectionId}`;
    }
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
            <button onClick={() => scrollToSection('home')} className="navbar-link">Home</button>
            <button onClick={() => scrollToSection('prayer-times')} className="navbar-link">Prayer Times</button>
            <button onClick={() => scrollToSection('events')} className="navbar-link">Events</button>
            <button onClick={() => scrollToSection('gallery')} className="navbar-link flex items-center">
              <Image size={16} className="mr-1" /> Gallery
            </button>
            <button onClick={() => scrollToSection('blog')} className="navbar-link flex items-center">
              <FileText size={16} className="mr-1" /> Blog
            </button>
            <button onClick={() => scrollToSection('contact')} className="navbar-link">Contact</button>
            <button onClick={() => scrollToSection('donate')} className="cta-button ml-4">Donate</button>
            <Link to="/admin-login" className="navbar-link">Admin</Link>
          </div>
          
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-masjid-navy hover:text-masjid-primary hover:bg-masjid-cream transition duration-150 ease-in-out"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <button onClick={() => scrollToSection('home')} className="block navbar-link w-full text-left">Home</button>
            <button onClick={() => scrollToSection('prayer-times')} className="block navbar-link w-full text-left">Prayer Times</button>
            <button onClick={() => scrollToSection('events')} className="block navbar-link w-full text-left">Events</button>
            <button onClick={() => scrollToSection('gallery')} className="block navbar-link flex items-center w-full text-left">
              <Image size={16} className="mr-1" /> Gallery
            </button>
            <button onClick={() => scrollToSection('blog')} className="block navbar-link flex items-center w-full text-left">
              <FileText size={16} className="mr-1" /> Blog
            </button>
            <button onClick={() => scrollToSection('contact')} className="block navbar-link w-full text-left">Contact</button>
            <button onClick={() => scrollToSection('donate')} className="cta-button w-full mt-4">Donate</button>
            <Link to="/admin-login" className="block navbar-link w-full text-left mt-4">Admin</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
