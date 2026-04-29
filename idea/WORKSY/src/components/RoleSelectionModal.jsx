import React from 'react';
import { Briefcase, User } from 'lucide-react';

const RoleSelectionModal = ({ onSelect }) => {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(26,31,54,0.95)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{
                background: 'white', padding: '3rem 2rem', borderRadius: '12px', width: '90%', maxWidth: '600px',
                textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
                <h1 style={{ marginBottom: '1rem', color: '#1a1f36' }}>Welcome to Worksy</h1>
                <p style={{ color: '#666', marginBottom: '2.5rem', fontSize: '1.125rem' }}>How would you like to use our platform today?</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div 
                        style={{ border: '2px solid #e2e8f0', borderRadius: '12px', padding: '2rem 1rem', cursor: 'pointer', transition: 'all 0.2s' }}
                        onClick={() => onSelect('seeker')}
                        onMouseOver={e => e.currentTarget.style.borderColor = '#635BFF'}
                        onMouseOut={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                    >
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f3f4f6', color: '#635BFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <User size={32} />
                        </div>
                        <h3 style={{ marginBottom: '0.5rem' }}>I am a Job Seeker</h3>
                        <p style={{ color: '#666', fontSize: '0.875rem' }}>Find flexible part-time jobs and internships that fit your schedule.</p>
                    </div>

                    <div 
                        style={{ border: '2px solid #e2e8f0', borderRadius: '12px', padding: '2rem 1rem', cursor: 'pointer', transition: 'all 0.2s' }}
                        onClick={() => onSelect('employer')}
                        onMouseOver={e => e.currentTarget.style.borderColor = '#635BFF'}
                        onMouseOut={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                    >
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f3f4f6', color: '#635BFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <Briefcase size={32} />
                        </div>
                        <h3 style={{ marginBottom: '0.5rem' }}>I am an Employer</h3>
                        <p style={{ color: '#666', fontSize: '0.875rem' }}>Post jobs and hire talented students for your projects and roles.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleSelectionModal;
