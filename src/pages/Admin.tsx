
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
  
  useEffect(() => {
    // Check if user has admin role
    const checkAuth = async () => {
      setLoading(true);
      
      if (authService.isAuthenticated() && !authService.hasRole(['admin', 'editor'])) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin area.",
          variant: "destructive",
        });
        authService.logout();
        navigate('/admin-login');
      }
      
      setLoading(false);
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
