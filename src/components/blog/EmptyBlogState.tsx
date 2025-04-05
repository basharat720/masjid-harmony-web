
import React from 'react';
import { FileText } from 'lucide-react';

const EmptyBlogState: React.FC = () => {
  return (
    <div className="text-center py-10">
      <FileText className="mx-auto h-16 w-16 text-masjid-navy/30 mb-4" />
      <h3 className="text-xl font-semibold text-masjid-navy">No Posts Found</h3>
      <p className="text-masjid-navy/70 mt-2">Try adjusting your search or filter criteria</p>
    </div>
  );
};

export default EmptyBlogState;
