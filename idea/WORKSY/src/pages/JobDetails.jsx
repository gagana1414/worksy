import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, DollarSign, Building, Share2, Bookmark } from 'lucide-react';
import Button from '../components/Button';
import ReviewList from '../components/ReviewList';
import EditJobModal from '../components/EditJobModal';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const activeUserType = localStorage.getItem('worksy_user_type');
  const isEmployer = activeUserType === 'employer';
  
  const userStr = localStorage.getItem('worksy_user_employer');
  const employerUser = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setJob(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching job:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container page-container" style={{ padding: '4rem 0', textAlign: 'center' }}><h2>Loading...</h2></div>;
  if (!job) return <div className="container page-container" style={{ padding: '4rem 0', textAlign: 'center' }}><h2>Job not found!</h2><Link to="/jobs">Browse Jobs</Link></div>;

  const handleApplyClick = () => {
    navigate(`/apply/${job._id || job.id}`);
  };

  return (
    <>
      <div className="job-details-page bg-light animate-fade-in">
        <div className="container page-container">

          <Link to="/jobs" className="back-link">
            <ArrowLeft size={16} /> Back to jobs
          </Link>

          <div className="job-details-layout">
            {/* Main Content */}
            <main className="job-main-info">
              <div className="content-card header-card">
                <div className="header-top">
                  <div className="company-logo-placeholder">
                    {job.company.charAt(0)}
                  </div>
                  <div className="header-actions">
                    <button className="action-btn" aria-label="Share">
                      <Share2 size={20} />
                    </button>
                    <button
                      className={`action-btn ${isSaved ? 'saved' : ''}`}
                      onClick={() => setIsSaved(!isSaved)}
                      aria-label="Save Job"
                    >
                      <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>

                <h1 className="detail-job-title">{job.title}</h1>
                <div className="detail-company-info">
                  <Building size={18} className="text-muted" />
                  <span className="company-name">{job.company}</span>
                  <span className="job-type-badge">{job.type}</span>
                </div>

                <div className="detail-meta-row">
                  <div className="meta-item">
                    <MapPin size={18} />
                    <span>{job.location}</span>
                  </div>
                  <div className="meta-item">
                    <DollarSign size={18} />
                    <span>{job.salary}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={18} />
                    <span>Posted {job.postedAt}</span>
                  </div>
                </div>
              </div>

              <div className="content-card description-card">
                <h2>Job Description</h2>
                <p>{job.description}</p>

                <h3 className="section-subheading">Requirements</h3>
                <ul className="requirements-list">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>

                <h3 className="section-subheading">Skills & Tags</h3>
                <div className="job-tags">
                  {job.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Employer Reviews Section */}
              <div style={{ marginTop: '2rem' }}>
                <ReviewList employerEmail={job.employerEmail || job.company} company={job.company} />
              </div>
            </main>

            {/* Sidebar / Actions */}
            <aside className="job-sidebar">
              {!isEmployer ? (
                <>
                  <div className="content-card apply-card">
                    <h3>Interested in this role?</h3>
                    <p>Apply quickly with your Worksy profile.</p>
                    <Button
                      variant="primary"
                      size="lg"
                      className="full-width-btn"
                      onClick={handleApplyClick}
                      disabled={hasApplied}
                    >
                      {hasApplied ? 'Applied ✓' : 'One-Click Apply'}
                    </Button>
                    <p className="security-notice">
                      🔒 Verified Employer. We never charge students for job applications.
                    </p>
                  </div>

                  <div className="content-card employer-card">
                    <h3>About the Employer</h3>
                    <div className="employer-header">
                      <div className="company-logo-small">
                        {job.company.charAt(0)}
                      </div>
                      <div>
                        <h4>{job.company}</h4>
                        <p className="verified-badge">✓ Verified</p>
                      </div>
                    </div>
                    <p className="employer-desc">
                      A growing company looking for enthusiastic part-time team members to join their journey.
                    </p>
                  </div>
                </>
              ) : (
                <div className="content-card employer-actions-card">
                  <h3>Employer Actions</h3>
                  <p style={{ color: '#666', marginBottom: '1rem' }}>Manage your job posting and view student feedback.</p>
                  {employerUser && (job.employerEmail === employerUser.email || !job.employerEmail) ? (
                    <Button
                      variant="primary"
                      className="full-width-btn"
                      onClick={() => setIsEditModalOpen(true)}
                    >
                      Edit Job
                    </Button>
                  ) : (
                    <p style={{ fontSize: '0.9rem', color: '#888' }}>You are viewing another employer's posting.</p>
                  )}
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditJobModal
          job={job}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={(updatedJob) => {
            setJob(updatedJob);
            setIsEditModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default JobDetails;
