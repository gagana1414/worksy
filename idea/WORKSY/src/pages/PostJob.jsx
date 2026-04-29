import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const PostJob = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [employerEmail, setEmployerEmail] = useState('');
    
    useEffect(() => {
        const userStr = localStorage.getItem('worksy_user_employer');
        if (!userStr) {
            alert("Please log in to post a job");
            navigate('/login');
            return;
        }
        
        const user = JSON.parse(userStr);
        if (user.type !== 'employer') {
            alert("Only employers can post jobs");
            navigate('/');
            return;
        }
        
        if (!user.subscription) {
            alert("You need an active subscription to post jobs");
            navigate('/pricing');
            return;
        }
        
        setEmployerEmail(user.email);
    }, [navigate]);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        salary: '',
        type: 'Part-Time',
        description: '',
        tags: '',
        requirements: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userStr = localStorage.getItem('worksy_user_employer');
        const user = userStr ? JSON.parse(userStr) : {};

        // Format tags and requirements from comma-separated strings to arrays
        const jobData = {
            ...formData,
            employerEmail: user.email,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(t => t),
            requirements: formData.requirements.split(',').map(req => req.trim()).filter(r => r),
            postedAt: 'Just now'
        };

        try {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jobData)
            });
            const data = await response.json();

            if (data.success) {
                alert("Job posted successfully!");
                navigate('/employer-dashboard');
            } else {
                alert("Something went wrong!");
            }
        } catch (error) {
            console.error("Post job error:", error);
            alert("Error posting job. Is backend running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container page-container" style={{ maxWidth: '600px', padding: '3rem 20px', margin: '0 auto' }}>
            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.05)' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '8px', color: '#1a1f36' }}>Post a New Job</h1>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>Hire top student talent in minutes.</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Job Title</label>
                        <input type="text" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g. Social Media Manager" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Company Name</label>
                            <input type="text" name="company" required value={formData.company} onChange={handleChange} placeholder="e.g. Acme Corp" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Job Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Internship">Internship</option>
                                <option value="Freelance">Freelance</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Location</label>
                            <input type="text" name="location" required value={formData.location} onChange={handleChange} placeholder="e.g. Remote or Bangalore" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Salary / Stipend</label>
                            <input type="text" name="salary" required value={formData.salary} onChange={handleChange} placeholder="e.g. ₹10,000/month or Unpaid" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Job Description</label>
                        <textarea name="description" required value={formData.description} onChange={handleChange} placeholder="Describe the role and responsibilities..." rows="4" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', resize: 'vertical' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Requirements (Comma Separated)</label>
                        <input type="text" name="requirements" value={formData.requirements} onChange={handleChange} placeholder="e.g. Video Editing, Good English, Canva" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Skills/Tags (Comma Separated)</label>
                        <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g. Design, UI, React" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                    </div>

                    <Button variant="primary" size="lg" type="submit" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
                        {loading ? 'Posting Job...' : 'Post Job Now'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
