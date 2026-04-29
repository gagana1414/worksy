import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

const EditJobModal = ({ job, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: job.title || '',
        company: job.company || '',
        location: job.location || '',
        salary: job.salary || '',
        type: job.type || 'Part-Time',
        description: job.description || '',
        tags: job.tags ? job.tags.join(', ') : '',
        requirements: job.requirements ? job.requirements.join(', ') : ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const updatedData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(t => t),
            requirements: formData.requirements.split(',').map(req => req.trim()).filter(r => r),
        };

        try {
            const response = await fetch(`/api/jobs/${job._id || job.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });
            const data = await response.json();

            if (data.success) {
                alert("Job updated successfully!");
                onSuccess(data.data); // Return updated job
            } else {
                alert(data.error || "Something went wrong!");
            }
        } catch (error) {
            console.error("Edit job error:", error);
            alert("Error updating job. Is backend running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '600px',
                maxHeight: '90vh', overflowY: 'auto', position: 'relative'
            }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={24} color="#666" />
                </button>

                <h2 style={{ marginBottom: '20px' }}>Edit Job: {job.title}</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Job Title</label>
                        <input type="text" name="title" required value={formData.title} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Company</label>
                            <input type="text" name="company" required value={formData.company} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Location</label>
                            <input type="text" name="location" required value={formData.location} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Salary</label>
                            <input type="text" name="salary" required value={formData.salary} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                                <option>Part-Time</option>
                                <option>Internship</option>
                                <option>Freelance</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Description</label>
                        <textarea name="description" required value={formData.description} onChange={handleChange} rows="4" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}></textarea>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Tags (comma separated)</label>
                        <input type="text" name="tags" value={formData.tags} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Requirements (comma separated)</label>
                        <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows="3" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}></textarea>
                    </div>

                    <Button variant="primary" type="submit" disabled={loading} style={{ marginTop: '10px' }}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default EditJobModal;
