
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import { authService } from '../services/authService';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user has admin role
    if (authService.isAuthenticated() && !authService.hasRole(['admin', 'editor'])) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin area.",
        variant: "destructive",
      });
      authService.logout();
      navigate('/admin-login');
    }
  }, [navigate, toast]);

  // Redirect if not authenticated
  if (!authService.isAuthenticated()) {
    return <Navigate to="/admin-login" />;
  }

  return <AdminDashboard />;
};

export default Admin;
