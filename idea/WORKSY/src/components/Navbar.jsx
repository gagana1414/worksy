import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Menu, X } from 'lucide-react';
import Button from './Button';
import './Navbar.css';

const Navbar = ({ userType }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const checkUser = () => {
      const storedUser = localStorage.getItem(`worksy_user_${userType || 'seeker'}`);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };
    checkUser();
    window.addEventListener('storage', checkUser);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkUser);
    };
  }, [userType]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem(`worksy_user_${userType || 'seeker'}`);
    setUser(null);
    closeMenu();
    window.location.href = '/';
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', margin: '-15px 0' }}>
          <img src="/logo.png" alt="Worksy Logo" style={{ height: '80px', objectFit: 'contain', mixBlendMode: 'multiply', transform: 'scale(1.3)' }} />
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>
            Home
          </Link>
          
          {userType === 'employer' ? (
            <>
              <Link to="/post-job" className={`nav-link ${location.pathname === '/post-job' ? 'active' : ''}`} onClick={closeMenu}>Post Job</Link>
              <Link to="/pricing" className={`nav-link ${location.pathname === '/pricing' ? 'active' : ''}`} onClick={closeMenu}>Pricing</Link>
            </>
          ) : (
            <Link to="/jobs" className={`nav-link ${location.pathname === '/jobs' ? 'active' : ''}`} onClick={closeMenu}>Find Jobs</Link>
          )}

          <div className="navbar-auth">
            {user ? (
              <>
                <Link to={userType === 'employer' ? '/employer-dashboard' : '/profile'} onClick={closeMenu}>
                  <Button variant="outline" size="sm">{userType === 'employer' ? 'Dashboard' : 'Profile'}</Button>
                </Link>
                <Button variant="primary" size="sm" onClick={handleLogout}>Log Out</Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu}>
                  <Button variant="outline" size="sm">Log In</Button>
                </Link>
                <Link to="/signup" onClick={closeMenu}>
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
