
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import { authService } from '../services/authService';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user has admin role
    const checkAuth = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (!authService.isAuthenticated()) {
          // Not logged in, will redirect
          setLoading(false);
          return;
        }
        
        if (!authService.hasRole(['admin', 'editor'])) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to access the admin area.",
            variant: "destructive",
          });
          authService.logout();
          navigate('/admin-login');
          return;
        }
        
        // Successfully authenticated with proper role
        toast({
          title: "Welcome to Admin Panel",
          description: `You are logged in as ${authService.getCurrentUser()?.username}.`,
        });
      } catch (err) {
        console.error('Authentication error:', err);
        setError('An error occurred during authentication. Please try again.');
        toast({
          title: "Authentication Error",
          description: "An error occurred verifying your credentials. Please try logging in again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-masjid-light">
        <Loader2 className="h-12 w-12 text-masjid-primary animate-spin mb-4" />
        <p className="text-masjid-navy font-medium">Loading admin panel...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-masjid-light">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg max-w-md text-center mb-4">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
        <button 
          onClick={() => navigate('/admin-login')}
          className="bg-masjid-primary text-white px-4 py-2 rounded hover:bg-masjid-primary/90 transition"
        >
          Return to Login
        </button>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!authService.isAuthenticated()) {
    toast({
      title: "Authentication Required",
      description: "Please login to access the admin area.",
    });
    return <Navigate to="/admin-login" />;
  }

  return <AdminDashboard />;
};

export default Admin;
