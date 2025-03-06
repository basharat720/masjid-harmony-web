
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-masjid-light py-16">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl font-display font-bold text-masjid-primary mb-6">404</h1>
          <p className="text-xl md:text-2xl text-masjid-navy mb-8">Oops! The page you're looking for doesn't exist.</p>
          <Button className="cta-button" onClick={() => window.location.href = '/'}>
            <ArrowLeft size={18} className="mr-2" /> Return to Home
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
