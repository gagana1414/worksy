import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, ChevronRight, Users, CheckCircle, TrendingUp, Map, FileText, MessageSquare } from 'lucide-react';
import Button from '../components/Button';
import JobCard from '../components/JobCard';
import './Home.css';

const SeekerHome = ({ jobs, featuredJobs, searchTitle, setSearchTitle, searchLocation, setSearchLocation, handleSearch, backendMessage }) => (
  <div className="home animate-fade-in">
    {/* Hero Section */}
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Work Smart. <br /><span className="text-purple">Earn Easy.</span></h1>
          {backendMessage && (
            <p style={{ color: 'green', fontWeight: 'bold' }}>
              Backend Status: {backendMessage}
            </p>
          )}
          <p className="hero-subtitle">The simplest part-time job platform for students in India. Find opportunities that fit your schedule.</p>

          <div className="search-bar">
            <div className="search-input-group">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={searchTitle}
                onChange={e => setSearchTitle(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="search-divider"></div>
            <div className="search-input-group">
              <MapPin size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Location"
                value={searchLocation}
                onChange={e => setSearchLocation(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button variant="primary" className="search-btn" onClick={handleSearch}>Search Jobs</Button>
          </div>

          <div className="popular-searches">
            <span>Popular:</span>
            <Link to="/jobs?search=Content Writing">Content Writing</Link>
            <Link to="/jobs?search=Campus Ambassador">Campus Ambassador</Link>
            <Link to="/jobs?search=Data Entry">Data Entry</Link>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-image-placeholder">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Students working together" className="rounded-image" />
          </div>
        </div>
      </div>
    </section>

    {/* Featured Jobs Section */}
    <section className="featured-jobs section-padding bg-light">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Opportunities</h2>
          <Link to="/jobs" className="view-all-link">
            View all jobs <ChevronRight size={16} />
          </Link>
        </div>

        <div className="jobs-grid">
          {featuredJobs.map(job => (
            <JobCard key={job._id || job.id} job={job} />
          ))}
        </div>
      </div>
    </section>

    {/* Value Proposition Section */}
    <section className="value-props section-padding">
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">Why choose Worksy?</h2>
          <p className="section-subtitle">Designed specifically for the needs of students and young professionals.</p>
        </div>

        <div className="props-grid">
          <div className="prop-card">
            <div className="prop-icon bg-navy-light">
              <Briefcase size={28} className="text-navy" />
            </div>
            <h3>Flexible Hours</h3>
            <p>Find jobs that respect your college schedule and exams. You choose when you work.</p>
          </div>
          <div className="prop-card">
            <div className="prop-icon bg-purple-light">
              <MapPin size={28} className="text-purple" />
            </div>
            <h3>Local & Remote</h3>
            <p>Work from your dorm room or find opportunities near your campus in India.</p>
          </div>
          <div className="prop-card">
            <div className="prop-icon bg-navy-light">
              <Search size={28} className="text-navy" />
            </div>
            <h3>Verified Employers</h3>
            <p>Every employer is verified to prevent scams. Your safety and payment are our priority.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Career Growth Hub Section */}
    <section className="career-growth section-padding bg-light">
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">Career Growth Hub</h2>
          <p className="section-subtitle">Helping students build strong careers with the right guidance and tools.</p>
        </div>

        <div className="props-grid">
          <div className="prop-card">
            <div className="prop-icon bg-navy-light">
              <Map size={28} className="text-navy" />
            </div>
            <h3>Career Roadmaps</h3>
            <p>Explore structured career paths tailored for students. Get guidance on skills, internships, and job roles step-by-step.</p>
          </div>
          <div className="prop-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="prop-icon bg-purple-light">
              <FileText size={28} className="text-purple" />
            </div>
            <h3>Resume Builder</h3>
            <p style={{ marginBottom: '1.5rem', flex: 1 }}>Create professional resumes with ready-made templates. Highlight your skills, projects, and experience effectively.</p>
            <Link to="/resume-tips" style={{ marginTop: 'auto' }}>
              <Button variant="primary" style={{ background: 'linear-gradient(135deg, #0A1F44 0%, #6A0DAD 100%)', border: 'none', width: '100%' }}>
                View Resume Tips
              </Button>
            </Link>
          </div>
          <div className="prop-card">
            <div className="prop-icon bg-navy-light">
              <MessageSquare size={28} className="text-navy" />
            </div>
            <h3>Interview Preparation</h3>
            <p>Practice common interview questions, improve communication skills, and gain confidence for interviews.</p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="cta-section section-padding">
      <div className="container cta-container">
        <h2>Ready to start earning?</h2>
        <p>Join thousands of students who are already working part-time through Worksy.</p>
        <div className="cta-buttons">
          <Link to="/signup">
            <Button variant="primary" size="lg">Create Student Profile</Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

const EmployerHome = () => (
  <div className="home animate-fade-in">
    {/* Employer Hero Section */}
    <section className="hero" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)' }}>
      <div className="container hero-container" style={{ alignItems: 'center' }}>
        <div className="hero-content" style={{ paddingRight: '2rem' }}>
          <h1 className="hero-title" style={{ color: '#1e293b' }}>Hire Top Student <br /><span className="text-purple">Talent. Fast.</span></h1>
          <p className="hero-subtitle" style={{ color: '#475569', fontSize: '1.25rem', marginBottom: '2rem' }}>Post part-time jobs, internships, and freelance gigs to thousands of verified, highly-motivated students across India.</p>
          
          <div className="cta-buttons" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link to="/post-job">
              <Button variant="primary" size="lg" style={{ padding: '0.875rem 2rem', fontSize: '1.125rem' }}>Post a Job Now</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" style={{ padding: '0.875rem 2rem', fontSize: '1.125rem', background: 'white' }}>View Pricing</Button>
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-image-placeholder" style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Employer reviewing candidates" className="rounded-image" />
          </div>
        </div>
      </div>
    </section>

    {/* Employer Value Props */}
    <section className="value-props section-padding bg-white">
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">Why Hire on Worksy?</h2>
          <p className="section-subtitle">The smartest way to build your early-career pipeline.</p>
        </div>

        <div className="props-grid">
          <div className="prop-card" style={{ border: '1px solid #f1f5f9' }}>
            <div className="prop-icon" style={{ background: '#ecfdf5' }}>
              <CheckCircle size={28} color="#10b981" />
            </div>
            <h3>Verified Talent</h3>
            <p>We verify student IDs and academic records so you know exactly who you're hiring.</p>
          </div>
          <div className="prop-card" style={{ border: '1px solid #f1f5f9' }}>
            <div className="prop-icon" style={{ background: '#f5f3ff' }}>
              <Briefcase size={28} className="text-purple" />
            </div>
            <h3>Flexible Hiring</h3>
            <p>From one-off weekend gigs to 6-month internships. Hire for exactly what you need.</p>
          </div>
          <div className="prop-card" style={{ border: '1px solid #f1f5f9' }}>
            <div className="prop-icon" style={{ background: '#eff6ff' }}>
              <TrendingUp size={28} color="#3b82f6" />
            </div>
            <h3>Cost-Effective Plans</h3>
            <p>Stop paying thousands per hire. Our transparent pricing plans fit startups to enterprises.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Employer CTA */}
    <section className="cta-section section-padding" style={{ background: '#1e293b' }}>
      <div className="container cta-container">
        <h2 style={{ color: 'white' }}>Ready to build your team?</h2>
        <p style={{ color: '#cbd5e1' }}>Join hundreds of companies hiring top student talent on Worksy.</p>
        <div className="cta-buttons">
          <Link to="/pricing">
            <Button variant="primary" size="lg" style={{ background: '#635BFF', borderColor: '#635BFF' }}>See Pricing Plans</Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

const Home = ({ userType, setUserType }) => {
  const [jobs, setJobs] = useState([]);
  const [backendMessage, setBackendMessage] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/jobs?search=${encodeURIComponent(searchTitle)}&location=${encodeURIComponent(searchLocation)}`);
  };

  useEffect(() => {
    // Test simple backend connection
    fetch('/api/test')
      .then(res => res.json())
      .then(data => setBackendMessage(data.message))
      .catch(err => console.error("Error connecting to backend:", err));

    // Fetch real or fallback jobs from the backend
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setJobs(data.data);
        }
      })
      .catch(err => console.error("Error fetching jobs from backend:", err));
  }, []);

  const featuredJobs = jobs.slice(0, 3);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '90px', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10 }}>
        <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '4px', borderRadius: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.1), inset 0 2px 4px rgba(0,0,0,0.05)' }}>
          <button 
            onClick={() => setUserType('seeker')}
            style={{ padding: '8px 24px', borderRadius: '20px', border: 'none', background: userType !== 'employer' ? '#635BFF' : 'transparent', color: userType !== 'employer' ? 'white' : '#475569', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.875rem', transition: 'all 0.2s' }}
          >
            I'm a Student
          </button>
          <button 
            onClick={() => setUserType('employer')}
            style={{ padding: '8px 24px', borderRadius: '20px', border: 'none', background: userType === 'employer' ? '#635BFF' : 'transparent', color: userType === 'employer' ? 'white' : '#475569', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.875rem', transition: 'all 0.2s' }}
          >
            I'm an Employer
          </button>
        </div>
      </div>

      {userType === 'employer' ? (
        <EmployerHome />
      ) : (
        <SeekerHome 
          jobs={jobs} 
          featuredJobs={featuredJobs} 
          searchTitle={searchTitle} 
          setSearchTitle={setSearchTitle} 
          searchLocation={searchLocation} 
          setSearchLocation={setSearchLocation} 
          handleSearch={handleSearch} 
          backendMessage={backendMessage} 
        />
      )}
    </div>
  );
};

export default Home;
