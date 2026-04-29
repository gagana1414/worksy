import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import Button from './Button';
import './JobCard.css';

const JobCard = ({ job }) => {
  const [hasApplied, setHasApplied] = useState(false);
  const [ratingStats, setRatingStats] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (job.employerEmail || job.company) {
      fetch(`/api/reviews/${job.employerEmail || job.company}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data.totalReviews > 0) {
            setRatingStats(data.data);
          }
        })
        .catch(err => console.error("Error fetching rating:", err));
    }
  }, [job.employerEmail, job.company]);

  const handleApplyClick = () => {
    navigate(`/apply/${job._id || job.id}`);
  };

  return (
    <>
      <div className="job-card">
        <div className="job-card-header">
          <div>
            <h3 className="job-title">{job.title}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <p className="job-company" style={{ margin: 0 }}>{job.company}</p>
              {ratingStats && (
                <span style={{ fontSize: '0.75rem', background: '#f1f5f9', padding: '2px 6px', borderRadius: '12px', fontWeight: '500', color: '#475569', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                  <span style={{ color: '#eab308' }}>★</span> {ratingStats.averageRating} ({ratingStats.totalReviews})
                </span>
              )}
            </div>
          </div>
          <span className="job-type-badge">{job.type}</span>
        </div>

        <div className="job-meta">
          <div className="meta-item">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>
          <div className="meta-item">
            <DollarSign size={16} />
            <span>{job.salary}</span>
          </div>
          <div className="meta-item">
            <Clock size={16} />
            <span>{job.postedAt}</span>
          </div>
        </div>

        <p className="job-description">{job.description}</p>

        <div className="job-tags">
          {job.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>

        <div className="job-card-footer">
          <Link to={`/jobs/${job._id || job.id}`}>
            <Button variant="outline" size="sm">View Details</Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={handleApplyClick}
            disabled={hasApplied}
          >
            {hasApplied ? 'Applied ✓' : 'Apply Now'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default JobCard;
