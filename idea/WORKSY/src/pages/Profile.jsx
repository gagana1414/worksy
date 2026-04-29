import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, FileText, Briefcase, Award, Edit2 } from 'lucide-react';
import Button from '../components/Button';
import EditProfileModal from '../components/EditProfileModal';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [resumeLink, setResumeLink] = useState('');
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('worksy_user_seeker');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setResumeLink(parsedUser.resumeLink || '');
            
            // Fetch applications
            fetch(`/api/applications?email=${encodeURIComponent(parsedUser.email)}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setApplications(data.data);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching applications:", err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const handleSaveResume = (e) => {
        e.preventDefault();
        if (user) {
            const updatedUser = { ...user, resumeLink };
            localStorage.setItem('worksy_user_seeker', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
            window.dispatchEvent(new Event('storage'));
        }
    };

    const handleEditSuccess = (updatedUser) => {
        setUser(updatedUser);
        setIsEditModalOpen(false);
    };

    if (loading) return <div className="container page-container" style={{ padding: '4rem 0', textAlign: 'center' }}><h2>Loading...</h2></div>;

    if (!user) {
        return (
            <div className="container page-container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h2>Please log in to view your profile</h2>
                <Link to="/login"><Button variant="primary" style={{ marginTop: '1rem' }}>Log In</Button></Link>
            </div>
        );
    }

    const offers = applications.filter(app => app.status === 'Offered' || app.status === 'Accepted');
    const appliedJobs = applications.filter(app => app.status !== 'Offered' && app.status !== 'Accepted');

    return (
        <div className="container page-container" style={{ padding: '3rem 20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                
                {/* Profile & Resume Section */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#635BFF' }}>
                                <User size={32} />
                            </div>
                            <div>
                                <h2 style={{ margin: 0 }}>{user.name}</h2>
                                <p style={{ margin: 0, color: '#666' }}>{user.email}</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)} style={{ display: 'flex', alignItems: 'center' }}>
                            <Edit2 size={16} style={{ marginRight: '5px' }} /> Edit Profile
                        </Button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: '#f9fafb', padding: '1.5rem', borderRadius: '8px' }}>
                        <div>
                            <p style={{ margin: '0 0 5px 0', fontSize: '0.875rem', color: '#666' }}>Date of Birth</p>
                            <p style={{ margin: 0, fontWeight: '500' }}>{user.dob || 'Not set'}</p>
                        </div>
                        <div>
                            <p style={{ margin: '0 0 5px 0', fontSize: '0.875rem', color: '#666' }}>Phone Number</p>
                            <p style={{ margin: 0, fontWeight: '500' }}>{user.phone || 'Not set'}</p>
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <p style={{ margin: '0 0 5px 0', fontSize: '0.875rem', color: '#666' }}>College / University</p>
                            <p style={{ margin: 0, fontWeight: '500' }}>{user.college || 'Not set'}</p>
                        </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '1.5rem 0' }} />

                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <FileText size={20} /> Resume Link
                    </h3>
                    <form onSubmit={handleSaveResume} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                            <input
                                type="url"
                                value={resumeLink}
                                onChange={(e) => setResumeLink(e.target.value)}
                                placeholder="https://docs.google.com/document/d/..."
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                            <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>Link your resume from Google Drive or Notion. It will be auto-filled in applications.</p>
                        </div>
                        <Button variant="primary" type="submit">Save</Button>
                    </form>
                    {saved && <p style={{ color: 'green', marginTop: '0.5rem' }}>Resume link saved!</p>}
                </div>

                {/* Offers Section */}
                {offers.length > 0 && (
                    <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#059669' }}>
                            <Award size={24} /> Job Offers ({offers.length})
                        </h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {offers.map(app => (
                                <div key={app._id} style={{ background: 'white', padding: '1rem', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 0.5rem 0' }}>{app.jobId?.title || 'Unknown Job'}</h4>
                                        <p style={{ margin: 0, color: '#666', fontSize: '0.875rem' }}>{app.jobId?.company || 'Unknown Company'} • Applied on {new Date(app.appliedAt).toLocaleDateString()}</p>
                                    </div>
                                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '500', background: '#d1fae5', color: '#065f46' }}>
                                        {app.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Applied Jobs Section */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <Briefcase size={20} /> Applied Jobs ({appliedJobs.length})
                    </h3>
                    
                    {appliedJobs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem 0', color: '#666' }}>
                            <p>You haven't applied to any jobs yet.</p>
                            <Link to="/jobs"><Button variant="outline" style={{ marginTop: '1rem' }}>Browse Jobs</Button></Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {appliedJobs.map(app => (
                                <div key={app._id} style={{ border: '1px solid #eee', padding: '1rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 0.5rem 0' }}>{app.jobId?.title || 'Unknown Job'}</h4>
                                        <p style={{ margin: 0, color: '#666', fontSize: '0.875rem' }}>{app.jobId?.company || 'Unknown Company'} • Applied on {new Date(app.appliedAt).toLocaleDateString()}</p>
                                    </div>
                                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '500', background: '#f3f4f6', color: '#374151' }}>
                                        {app.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
            {isEditModalOpen && (
                <EditProfileModal
                    user={user}
                    onClose={() => setIsEditModalOpen(false)}
                    onSuccess={handleEditSuccess}
                />
            )}
        </div>
    );
};

export default Profile;
