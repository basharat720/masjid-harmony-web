
import React from 'react';
import { Users, Book, Heart, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="section-container">
        <h2 className="section-title">About Masjid Imam Hussain</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg mb-6 text-masjid-navy/80">
              Masjid Imam Hussain was established in 1985 with the mission of serving the Muslim community and fostering interfaith dialogue and understanding. Our mosque is not just a place of worship but a center for education, community service, and spiritual growth.
            </p>
            <p className="text-lg mb-6 text-masjid-navy/80">
              We strive to provide a welcoming environment for all Muslims and those interested in learning about Islam. Our diverse congregation represents the beautiful tapestry of Islamic culture from around the world.
            </p>
            <p className="text-lg mb-8 text-masjid-navy/80">
              Through our various programs and services, we aim to nurture faith, build community bonds, and contribute positively to the broader society.
            </p>
            
            <Button className="secondary-button">
              Learn More About Our History
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-masjid-cream rounded-lg p-6 shadow-sm">
              <Users className="text-masjid-primary mb-4 h-10 w-10" />
              <h3 className="text-xl font-bold text-masjid-primary mb-2">Community</h3>
              <p className="text-masjid-navy/80">
                A vibrant and diverse congregation coming together in faith and brotherhood.
              </p>
            </div>
            
            <div className="bg-masjid-cream rounded-lg p-6 shadow-sm">
              <Book className="text-masjid-primary mb-4 h-10 w-10" />
              <h3 className="text-xl font-bold text-masjid-primary mb-2">Education</h3>
              <p className="text-masjid-navy/80">
                Islamic studies, Qur'an classes, and educational programs for all ages.
              </p>
            </div>
            
            <div className="bg-masjid-cream rounded-lg p-6 shadow-sm">
              <Heart className="text-masjid-primary mb-4 h-10 w-10" />
              <h3 className="text-xl font-bold text-masjid-primary mb-2">Charity</h3>
              <p className="text-masjid-navy/80">
                Supporting those in need through various charitable initiatives.
              </p>
            </div>
            
            <div className="bg-masjid-cream rounded-lg p-6 shadow-sm">
              <Calendar className="text-masjid-primary mb-4 h-10 w-10" />
              <h3 className="text-xl font-bold text-masjid-primary mb-2">Events</h3>
              <p className="text-masjid-navy/80">
                Regular religious and community events throughout the year.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
