import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';

const ReviewList = ({ employerEmail, company }) => {
    const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0, reviews: [] });
    const [loading, setLoading] = useState(true);

    const activeUserType = localStorage.getItem('worksy_user_type');
    const isEmployer = activeUserType === 'employer';

    const fetchReviews = () => {
        setLoading(true);
        fetch(`/api/reviews/${employerEmail}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setStats(data.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching reviews:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (employerEmail) {
            fetchReviews();
        }
    }, [employerEmail]);

    const handleReviewAdded = (newReview) => {
        // Optimistically update or refetch
        fetchReviews();
    };

    if (loading) return <div style={{ padding: '2rem 0', textAlign: 'center' }}>Loading reviews...</div>;

    return (
        <div style={{ marginTop: '3rem' }}>
            <h2 style={{ marginBottom: '1.5rem', color: '#0A1F44', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                Employer Reviews
                {stats.totalReviews > 0 && (
                    <span style={{ fontSize: '1rem', background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px', fontWeight: '500' }}>
                        ⭐ {stats.averageRating} ({stats.totalReviews} {stats.totalReviews === 1 ? 'review' : 'reviews'})
                    </span>
                )}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {stats.reviews.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {stats.reviews.map((review) => (
                            <div key={review._id} style={{ background: 'white', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                    <div>
                                        <h4 style={{ margin: 0, color: '#1e293b' }}>{review.userName}</h4>
                                        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <StarRating rating={review.rating} />
                                </div>
                                {review.reviewText && (
                                    <p style={{ margin: 0, color: '#475569', lineHeight: '1.5' }}>{review.reviewText}</p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '8px', textAlign: 'center', border: '1px dashed #cbd5e1' }}>
                        <p style={{ margin: 0, color: '#64748b' }}>
                            {isEmployer ? `No reviews yet for ${company}.` : `No reviews yet for ${company}. Be the first to review!`}
                        </p>
                    </div>
                )}

                {!isEmployer && <ReviewForm employerEmail={employerEmail} company={company} onReviewAdded={handleReviewAdded} />}
            </div>
        </div>
    );
};

export default ReviewList;
