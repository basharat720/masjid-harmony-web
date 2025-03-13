
import React from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contact = () => {
  return (
    <section id="contact" className="py-12 bg-white">
      <div className="section-container">
        <h2 className="section-title">Contact Us</h2>
        <p className="text-center text-masjid-navy/80 max-w-2xl mx-auto mb-8">
          We're here to answer any questions about our services or community involvement.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-masjid-light rounded-xl p-5 shadow-sm order-2 lg:order-1">
            <h3 className="text-xl font-bold text-masjid-primary mb-5">Send a Message</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              
              <Button className="w-full bg-masjid-primary hover:bg-masjid-primary/90 text-white">
                <Send size={18} className="mr-2" /> Send Message
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="order-1 lg:order-2">
            <h3 className="text-xl font-bold text-masjid-primary mb-5">Contact Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              <div className="bg-masjid-light p-4 rounded-lg shadow-sm flex items-start">
                <MapPin size={22} className="mr-3 text-masjid-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-masjid-navy mb-1">Address</h4>
                  <p className="text-masjid-navy/80 text-sm">
                    123 Islamic Way<br />
                    Harmony City, State 12345
                  </p>
                </div>
              </div>
              
              <div className="bg-masjid-light p-4 rounded-lg shadow-sm flex items-start">
                <Phone size={22} className="mr-3 text-masjid-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-masjid-navy mb-1">Phone</h4>
                  <p className="text-masjid-navy/80 text-sm">
                    Main Office: (123) 456-7890<br />
                    Imam's Office: (123) 456-7891
                  </p>
                </div>
              </div>
              
              <div className="bg-masjid-light p-4 rounded-lg shadow-sm flex items-start">
                <Mail size={22} className="mr-3 text-masjid-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-masjid-navy mb-1">Email</h4>
                  <p className="text-masjid-navy/80 text-sm">
                    info@masjidimamhussain.org<br />
                    imam@masjidimamhussain.org
                  </p>
                </div>
              </div>
              
              <div className="bg-masjid-light p-4 rounded-lg shadow-sm flex items-start">
                <Clock size={22} className="mr-3 text-masjid-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-masjid-navy mb-1">Office Hours</h4>
                  <p className="text-masjid-navy/80 text-sm">
                    Monday to Friday: 9AM - 5PM<br />
                    Saturday: 10AM - 2PM
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-5 rounded-xl overflow-hidden h-48 shadow-sm">
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
