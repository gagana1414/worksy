import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import Button from '../components/Button';

const Pricing = () => {
    const navigate = useNavigate();

    const plans = [
        { id: '1_month', name: '1 Month', price: '₹999', duration: 'per month', features: ['Post up to 5 jobs', 'Basic candidate filtering', 'Email support'] },
        { id: '3_month', name: '3 Months', price: '₹2,499', duration: 'for 3 months', features: ['Post up to 20 jobs', 'Advanced filtering', 'Priority support'] },
        { id: '12_month', name: '1 Year', price: '₹7,999', duration: 'per year', features: ['Unlimited job posts', 'Premium branding', '24/7 Priority support'] }
    ];

    const handleSubscribe = (planId) => {
        const userStr = localStorage.getItem('worksy_user_employer');
        if (!userStr) {
            alert("Please log in as an employer to subscribe.");
            navigate('/login');
            return;
        }

        const user = JSON.parse(userStr);
        user.subscription = planId;
        localStorage.setItem('worksy_user_employer', JSON.stringify(user));
        
        alert(`Successfully subscribed to ${planId.replace('_', ' ')} plan!`);
        navigate('/post-job');
    };

    return (
        <div className="container page-container" style={{ padding: '8rem 20px 4rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ color: '#1a1f36', marginBottom: '1rem', fontSize: '2.5rem' }}>Simple, Transparent Pricing</h1>
                <p style={{ color: '#666', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>Choose the perfect plan to find and hire the best student talent for your company.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                {plans.map(plan => (
                    <div key={plan.id} style={{
                        background: 'white', padding: '2.5rem', borderRadius: '16px', 
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
                        border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{plan.name}</h3>
                        <div style={{ marginBottom: '2rem' }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#635BFF' }}>{plan.price}</span>
                            <span style={{ color: '#666', marginLeft: '5px' }}>{plan.duration}</span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', flex: 1 }}>
                            {plan.features.map((feature, idx) => (
                                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', color: '#4b5563' }}>
                                    <div style={{ background: '#e0e7ff', borderRadius: '50%', padding: '4px', color: '#635BFF', display: 'flex' }}>
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <Button 
                            variant="primary" 
                            style={{ width: '100%', padding: '12px' }}
                            onClick={() => handleSubscribe(plan.id)}
                        >
                            Select Plan
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
