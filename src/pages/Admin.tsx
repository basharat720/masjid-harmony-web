
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import { authService } from '../services/authService';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkLogin = async () => {
      setIsLoading(true);
      
      try {
        // Check if the user is authenticated
        const isAuthenticated = authService.isAuthenticated();
        
        if (isAuthenticated) {
          setIsLoggedIn(true);
          toast({
            title: "Welcome back, admin!",
            description: "You are now logged in to the admin dashboard.",
          });
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Admin authentication error:', error);
        setIsLoggedIn(false);
        toast({
          title: "Authentication Error",
          description: "Please try logging in again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    checkLogin();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-masjid-light">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-masjid-primary mb-4"></div>
        <p className="text-masjid-navy">Verifying admin credentials...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/admin-login" />;
  }

  return (
    <div className="min-h-screen bg-masjid-light">
      <AdminDashboard />
    </div>
  );
};

export default Admin;
