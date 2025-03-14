
import React from 'react';
import PrayerTimesManager from './PrayerTimesManager';
import EventsManager from './EventsManager';
import GalleryManager from './GalleryManager';
import BlogPostManager from './BlogPostManager';
import ContactInfoManager from './ContactInfoManager';
import DonationOptionsManager from './DonationOptionsManager';
import AdminOverview from './AdminOverview';

interface AdminContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminContent = ({ activeTab, setActiveTab }: AdminContentProps) => {
  return (
    <div className="md:col-span-9 lg:col-span-10">
      {activeTab === "overview" && <AdminOverview setActiveTab={setActiveTab} />}
      {activeTab === "prayer-times" && <PrayerTimesManager />}
      {activeTab === "events" && <EventsManager />}
      {activeTab === "gallery" && <GalleryManager />}
      {activeTab === "blog" && <BlogPostManager />}
      {activeTab === "contact" && <ContactInfoManager />}
      {activeTab === "donations" && <DonationOptionsManager />}
    </div>
  );
};

export default AdminContent;
