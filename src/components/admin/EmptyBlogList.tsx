
import React from 'react';
import { FileText } from 'lucide-react';

const EmptyBlogList: React.FC = () => {
  return (
    <div className="text-center py-8">
      <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
      <p className="text-muted-foreground">No blog posts found</p>
      <p className="text-sm text-muted-foreground mt-1">
        Add your first blog post to display it on the website
      </p>
    </div>
  );
};

export default EmptyBlogList;
