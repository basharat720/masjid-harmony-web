
import React from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="section-container">
        <h2 className="section-title">Contact Us</h2>
        <p className="text-center text-masjid-navy/80 max-w-2xl mx-auto mb-10">
          We're here to answer any questions you may have about our services, events, or how to get involved with our community.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-masjid-light rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-masjid-primary mb-6">Send a Message</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Message subject" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message" rows={5} />
              </div>
              
              <Button className="w-full cta-button">
                <Send size={18} className="mr-2" /> Send Message
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold text-masjid-primary mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin size={24} className="mr-4 text-masjid-primary mt-1" />
                <div>
                  <h4 className="font-bold text-masjid-navy mb-1">Address</h4>
                  <p className="text-masjid-navy/80">
                    123 Islamic Way<br />
                    Harmony City, State 12345<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone size={24} className="mr-4 text-masjid-primary mt-1" />
                <div>
                  <h4 className="font-bold text-masjid-navy mb-1">Phone</h4>
                  <p className="text-masjid-navy/80">
                    Main Office: (123) 456-7890<br />
                    Imam's Office: (123) 456-7891
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail size={24} className="mr-4 text-masjid-primary mt-1" />
                <div>
                  <h4 className="font-bold text-masjid-navy mb-1">Email</h4>
                  <p className="text-masjid-navy/80">
                    General Inquiries: info@masjidimamhussain.org<br />
                    Imam: imam@masjidimamhussain.org
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock size={24} className="mr-4 text-masjid-primary mt-1" />
                <div>
                  <h4 className="font-bold text-masjid-navy mb-1">Office Hours</h4>
                  <p className="text-masjid-navy/80">
                    Monday to Friday: 9:00 AM - 5:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 rounded-xl overflow-hidden h-64 shadow-sm">
              {/* This would be a Google Map in a real implementation */}
              <div className="bg-masjid-cream h-full w-full flex items-center justify-center">
                <p className="text-masjid-navy/60">Google Map would be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
