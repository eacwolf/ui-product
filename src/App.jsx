import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SourcingHub from './pages/SourcingHub';
import AISourcing from './pages/AISourcing';
import Candidates from './pages/Candidates';
import Resumes from './pages/Resumes';
import Engagement from './pages/Engagement';
import ProfileSettings from './pages/ProfileSettings';
import Billing from './pages/Billing';
import CompanySettings from './pages/CompanySettings';
import './App.css'

function App() {
  useEffect(() => {
    // Apply saved theme on app load
    const applyTheme = () => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      const savedColor = localStorage.getItem('primaryColor') || '#3b82f6';
      
      // Apply theme to document element
      document.documentElement.setAttribute('data-theme', savedTheme);
      document.documentElement.style.setProperty('--primary', savedColor);
      
      // Apply background color based on theme
      if (savedTheme === 'dark') {
        document.body.style.background = '#0f1419';
        document.body.style.color = '#f3f4f6';
      } else {
        document.body.style.background = '#f9fafb';
        document.body.style.color = '#1f2937';
      }
    };

    applyTheme();

    // Listen for storage changes from other tabs/instances
    const handleStorageChange = () => {
      applyTheme();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event listener for theme changes within same tab
    const handleThemeChange = () => {
      applyTheme();
    };
    
    window.addEventListener('themeChanged', handleThemeChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('themeChanged', handleThemeChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sourcing-hub" element={<SourcingHub />} />
        <Route path="/ai-sourcing" element={<AISourcing />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/resumes" element={<Resumes />} />
        <Route path="/engagement" element={<Engagement />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/company-settings" element={<CompanySettings />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
