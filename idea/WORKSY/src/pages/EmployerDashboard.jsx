import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Building, MapPin, DollarSign } from 'lucide-react';
import Button from '../components/Button';

const EmployerDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [postedJobs, setPostedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('worksy_user_employer');
        if (!storedUser) {
            navigate('/login');
            return;
        }

        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.type !== 'employer') {
            navigate('/');
            return;
        }

        setUser(parsedUser);

        // Fetch posted jobs
        fetch(`/api/jobs/employer?email=${parsedUser.email}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setPostedJobs(data.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching posted jobs:", err);
                setLoading(false);
            });

    }, [navigate]);

    if (loading) return <div className="container page-container" style={{ padding: '4rem 0', textAlign: 'center' }}><h2>Loading Dashboard...</h2></div>;

    return (
        <div className="container page-container" style={{ padding: '3rem 20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>Employer Dashboard</h1>
                    <p style={{ color: '#666' }}>Welcome back, {user?.name}</p>
                </div>
                <Button variant="primary" onClick={() => navigate('/post-job')}>+ Post New Job</Button>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#635BFF' }}>
                        <Building size={32} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0 }}>{user?.name}'s Company</h2>
                        <p style={{ margin: 0, color: '#666' }}>{user?.email}</p>
                    </div>
                </div>
                
                <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '6px', display: 'inline-block' }}>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>Current Plan</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color: user?.subscription ? '#10b981' : '#ef4444' }}>
                        {user?.subscription ? user.subscription.replace('_', ' ').toUpperCase() : 'NO ACTIVE PLAN'}
                    </p>
                    {!user?.subscription && (
                        <Button variant="outline" size="sm" style={{ marginTop: '10px' }} onClick={() => navigate('/pricing')}>
                            Upgrade Now
                        </Button>
                    )}
                </div>
            </div>

            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Briefcase size={24} /> Jobs Posted by You ({postedJobs.length})
            </h2>

            {postedJobs.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {postedJobs.map(job => (
                        <div key={job._id} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0', color: '#1a1f36' }}>{job.title}</h3>
                                <div style={{ display: 'flex', gap: '1rem', color: '#666', fontSize: '0.875rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {job.location}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><DollarSign size={14} /> {job.salary}</span>
                                    <span>{job.type}</span>
                                </div>
                            </div>
                            <Button variant="outline" onClick={() => navigate(`/jobs/${job._id}`)}>View Job</Button>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ background: 'white', padding: '3rem', borderRadius: '8px', textAlign: 'center', border: '1px dashed #ccc' }}>
                    <Briefcase size={48} color="#ccc" style={{ margin: '0 auto 1rem' }} />
                    <h3 style={{ color: '#666' }}>You haven't posted any jobs yet</h3>
                    <p style={{ color: '#999', marginBottom: '1.5rem' }}>Start hiring top student talent today.</p>
                    <Button variant="primary" onClick={() => navigate('/post-job')}>Post Your First Job</Button>
                </div>
            )}
        </div>
    );
};

export default EmployerDashboard;
