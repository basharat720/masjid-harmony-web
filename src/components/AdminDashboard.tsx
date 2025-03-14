
import React, { useState } from 'react';
import AdminHeader from './admin/AdminHeader';
import AdminSidebar from './admin/AdminSidebar';
import AdminContent from './admin/AdminContent';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="p-4 md:p-6">
      <AdminHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <AdminContent activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default AdminDashboard;
