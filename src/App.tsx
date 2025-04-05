
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import RouterTest from "./components/RouterTest";

function App() {
  // Added a condition to protect admin routes, you may want to implement actual authentication
  const isAuthenticated = true; // Replace with actual authentication logic

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/events" element={<Events />} />
      <Route path="/blog" element={<Blog />} />
      <Route 
        path="/admin" 
        element={isAuthenticated ? <Admin /> : <Navigate to="/admin-login" />} 
      />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/router-test" element={<RouterTest />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
