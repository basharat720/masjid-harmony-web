
import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';

// Mock authentication - this would be replaced with actual auth
const isAdmin = () => {
  return localStorage.getItem('isAdmin') === 'true';
};

const Admin = () => {
  // Simple protection for admin route
  if (!isAdmin()) {
    return <Navigate to="/admin-login" />;
  }

  return <AdminDashboard />;
};

export default Admin;
