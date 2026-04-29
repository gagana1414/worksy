import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo" style={{ display: 'flex', alignItems: 'center', margin: '-15px 0' }}>
            <img src="/logo.png" alt="Worksy Logo" style={{ height: '80px', objectFit: 'contain', mixBlendMode: 'multiply', transform: 'scale(1.3)' }} />
          </Link>
          <p className="footer-tagline">Work Smart. Earn Easy. Part-Time Made Simple.</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Twitter">TW</a>
            <a href="#" aria-label="LinkedIn">LI</a>
          </div>
        </div>

        <div className="footer-links">
          <div className="link-column">
            <h4>For Students</h4>
            <Link to="/jobs">Find a Job</Link>
            <Link to="/resume-builder">Resume Builder</Link>
            <Link to="/career-tips">Career Tips</Link>
          </div>
          <div className="link-column">
            <h4>For Employers</h4>
            <Link to="/post-job">Post a Job</Link>
            <Link to="/pricing">Pricing Plans</Link>
            <Link to="/employer-guidelines">Guidelines</Link>
          </div>
          <div className="link-column">
            <h4>Worksy</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Worksy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
