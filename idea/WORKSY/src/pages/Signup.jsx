import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginType, setLoginType] = useState('seeker');
    const navigate = useNavigate();

    useEffect(() => {
        const storedType = localStorage.getItem('worksy_user_type');
        if (storedType) {
            setLoginType(storedType);
        }
    }, []);

    const handleSignup = (e) => {
        e.preventDefault();
        if (name && email && password) {
            // Update global role
            localStorage.setItem('worksy_user_type', loginType);

            // Mock Authentication
            localStorage.setItem(`worksy_user_${loginType}`, JSON.stringify({
                name: name,
                email: email,
                resumeLink: '',
                dob: '',
                phone: '',
                college: '',
                type: loginType,
                subscription: null
            }));
            
            // Dispatch event so Navbar can update immediately
            window.dispatchEvent(new Event('storage'));
            alert(`Account created successfully as ${loginType === 'employer' ? 'Employer' : 'Student'}!`);
            
            if (loginType === 'employer') {
                navigate('/employer-dashboard');
            } else {
                navigate('/profile');
            }
        } else {
            alert("Please fill in all fields");
        }
    };

    return (
        <div className="container page-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'inline-flex', background: '#f1f5f9', padding: '4px', borderRadius: '30px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
                    <button 
                        type="button"
                        onClick={() => setLoginType('seeker')}
                        style={{ padding: '8px 24px', borderRadius: '20px', border: 'none', background: loginType === 'seeker' ? '#635BFF' : 'transparent', color: loginType === 'seeker' ? 'white' : '#475569', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.875rem', transition: 'all 0.2s' }}
                    >
                        Student
                    </button>
                    <button 
                        type="button"
                        onClick={() => setLoginType('employer')}
                        style={{ padding: '8px 24px', borderRadius: '20px', border: 'none', background: loginType === 'employer' ? '#635BFF' : 'transparent', color: loginType === 'employer' ? 'white' : '#475569', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.875rem', transition: 'all 0.2s' }}
                    >
                        Employer
                    </button>
                </div>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#1a1f36' }}>
                    {loginType === 'employer' ? 'Create Employer Account' : 'Create Student Account'}
                </h2>
                <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                    {loginType === 'employer' ? 'Join to hire talented students today.' : 'Join to find flexible part-time work.'}
                </p>

                <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                            {loginType === 'employer' ? 'Company Name' : 'Full Name'}
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder={loginType === 'employer' ? "Tech Innovators Inc." : "John Doe"}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                            {loginType === 'employer' ? 'Work Email' : 'Email Address'}
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder={loginType === 'employer' ? "hr@company.com" : "student@college.edu"}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <Button variant="primary" type="submit" style={{ width: '100%', marginTop: '1rem', padding: '12px' }}>
                        Create Account
                    </Button>
                </form>
                
                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                    Already have an account? <Link to="/login" style={{ fontWeight: '600', color: '#635BFF' }}>Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
