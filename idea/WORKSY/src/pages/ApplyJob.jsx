import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

const ApplyJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [job, setJob] = useState(null);
    const [loadingJob, setLoadingJob] = useState(true);

    const [formData, setFormData] = useState(() => {
        const stored = localStorage.getItem('worksy_user_seeker');
        if (stored) {
            const user = JSON.parse(stored);
            return {
                name: user.name || '',
                email: user.email || '',
                college: '',
                resume: user.resumeLink || ''
            };
        }
        return { name: '', email: '', college: '', resume: '' };
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`/api/jobs/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setJob(data.data);
                }
                setLoadingJob(false);
            })
            .catch(err => {
                console.error("Error fetching job:", err);
                setLoadingJob(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const response = await fetch(`/api/jobs/${id}/apply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (data.success) {
                alert("Application submitted successfully!");
                navigate(`/jobs/${id}`);
            } else {
                setError(data.error || "Something went wrong!");
            }
        } catch (error) {
            console.error("Apply error:", error);
            setError("Error applying. Is backend running?");
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingJob) return <div className="container page-container" style={{ textAlign: 'center' }}><h2>Loading...</h2></div>;
    if (!job) return <div className="container page-container" style={{ textAlign: 'center' }}><h2>Job not found!</h2><Link to="/jobs">Browse Jobs</Link></div>;

    return (
        <div className="bg-light animate-fade-in" style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
            <div className="container page-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Link to={`/jobs/${id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', fontWeight: '500', marginBottom: '1.5rem' }}>
                    <ArrowLeft size={16} /> Back to Job Details
                </Link>

                <div style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#0A1F44' }}>Apply for {job.title}</h1>
                    <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1.1rem' }}>{job.company} • {job.location}</p>

                    {error && <div style={{ color: '#ef4444', marginBottom: '1.5rem', padding: '1rem', background: '#fef2f2', borderRadius: '8px' }}>{error}</div>}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1e293b' }}>Full Name</label>
                            <input
                                type="text" required
                                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1e293b' }}>Email Address</label>
                            <input
                                type="email" required
                                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1e293b' }}>College / University</label>
                            <input
                                type="text" required
                                value={formData.college} onChange={e => setFormData({ ...formData, college: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1e293b' }}>Resume Link (Google Drive / Notion)</label>
                            <input
                                type="url" required
                                value={formData.resume} onChange={e => setFormData({ ...formData, resume: e.target.value })}
                                placeholder="https://"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                            />
                            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>Ensure your link is set to "Anyone with the link can view".</p>
                        </div>

                        <Button variant="primary" type="submit" disabled={submitting} style={{ marginTop: '1rem', width: '100%', padding: '1rem' }}>
                            {submitting ? 'Submitting Application...' : 'Submit Application'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplyJob;
