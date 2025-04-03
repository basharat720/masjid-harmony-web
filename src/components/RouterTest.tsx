
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RouterTest: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Router Test Component</h1>
      <div>
        <Link to="/gallery">Gallery Link</Link>
        <button onClick={() => navigate('/gallery')}>Navigate to Gallery</button>
      </div>
    </div>
  );
};

export default RouterTest;
