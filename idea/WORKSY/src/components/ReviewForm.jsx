import React, { useState } from 'react';
import StarRating from './StarRating';
import Button from './Button';

const ReviewForm = ({ employerEmail, company, onReviewAdded }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Check if user is logged in as a student
    const storedUser = localStorage.getItem('worksy_user_seeker');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!user) {
            setError('You must be logged in as a student to leave a review.');
            return;
        }

        if (rating === 0) {
            setError('Please select a star rating.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: user.email,
                    userName: user.name,
                    employerEmail,
                    company,
                    rating,
                    reviewText
                })
            });

            const data = await res.json();
            
            if (data.success) {
                setRating(0);
                setReviewText('');
                if (onReviewAdded) onReviewAdded(data.data);
                alert("Review submitted successfully!");
            } else {
                setError(data.error || 'Failed to submit review');
            }
        } catch (err) {
            setError('Network error submitting review.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <p style={{ margin: 0, color: '#64748b' }}>Log in as a student to leave a review for {company}.</p>
            </div>
        );
    }

    return (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Write a Review</h3>
            {error && <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem', color: '#475569' }}>Rating</label>
                    <StarRating rating={rating} editable={true} onChange={setRating} />
                </div>
                
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem', color: '#475569' }}>Your Feedback (Optional)</label>
                    <textarea 
                        value={reviewText} 
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="What was your experience with this employer?"
                        rows="3"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'vertical' }}
                    />
                </div>
                
                <Button variant="primary" type="submit" disabled={loading || rating === 0}>
                    {loading ? 'Submitting...' : 'Submit Review'}
                </Button>
            </form>
        </div>
    );
};

export default ReviewForm;
