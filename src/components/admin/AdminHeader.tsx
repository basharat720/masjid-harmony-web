
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { authService } from '../../services/authService';

const AdminHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate('/admin-login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Failed",
        description: "There was an error during logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-masjid-primary">Admin Dashboard</h1>
        <p className="text-masjid-navy opacity-80">Manage your masjid website content</p>
      </div>
      <Button variant="ghost" onClick={handleLogout} className="mt-4 md:mt-0">
        <LogOut className="mr-2 h-4 w-4" /> Logout
      </Button>
    </div>
  );
};

export default AdminHeader;
