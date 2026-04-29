import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RoleSelectionModal from './components/RoleSelectionModal';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PostJob from './pages/PostJob';
import Profile from './pages/Profile';
import Pricing from './pages/Pricing';
import EmployerDashboard from './pages/EmployerDashboard';
import ResumeTips from './pages/ResumeTips';
import ApplyJob from './pages/ApplyJob';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [userType, setUserType] = useState(localStorage.getItem('worksy_user_type'));

  const handleRoleSelect = (role) => {
    localStorage.setItem('worksy_user_type', role);
    setUserType(role);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {!userType && <RoleSelectionModal onSelect={handleRoleSelect} />}
        <Navbar userType={userType} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home userType={userType} setUserType={handleRoleSelect} />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
            <Route path="/resume-tips" element={<ResumeTips />} />
            <Route path="/apply/:id" element={<ApplyJob />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
