import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

const EditProfileModal = ({ user, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        dob: user?.dob || '',
        phone: user?.phone || '',
        college: user?.college || '',
        resumeLink: user?.resumeLink || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = { ...user, ...formData };
        localStorage.setItem('worksy_user_seeker', JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('storage'));
        onSuccess(updatedUser);
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{
                background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px',
                maxHeight: '90vh', overflowY: 'auto', position: 'relative'
            }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={24} color="#666" />
                </button>

                <h2 style={{ marginBottom: '20px' }}>Edit Profile</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Full Name</label>
                        <input
                            type="text" required
                            value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email Address</label>
                        <input
                            type="email" required disabled
                            value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f3f4f6', color: '#666' }}
                        />
                        <small style={{ color: '#666' }}>Email cannot be changed directly.</small>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Date of Birth</label>
                        <input
                            type="date"
                            value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Phone Number</label>
                        <input
                            type="tel"
                            value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>College / University</label>
                        <input
                            type="text"
                            value={formData.college} onChange={e => setFormData({ ...formData, college: e.target.value })}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>

                    <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                        Save Changes
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
