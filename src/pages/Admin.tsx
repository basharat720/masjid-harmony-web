
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkLogin = async () => {
      setIsLoading(true);
      
      try {
        // Check if there's a session
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // If we have a user, check if they're in the admin_users table
          const { data, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('email', user.email)
            .maybeSingle();
          
          if (error) {
            console.error('Error checking admin status:', error);
            setIsLoggedIn(false);
            toast({
              title: "Authentication Error",
              description: "There was an error verifying your admin status.",
              variant: "destructive",
            });
            return;
          }
          
          if (data) {
            setIsLoggedIn(true);
            toast({
              title: "Welcome back, admin!",
              description: "You are now logged in to the admin dashboard.",
            });
          } else {
            setIsLoggedIn(false);
            toast({
              title: "Access Denied",
              description: "Your account does not have admin privileges.",
              variant: "destructive",
            });
          }
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
