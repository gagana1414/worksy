import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, editable = false, onChange }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleMouseEnter = (index) => {
        if (editable) setHoverRating(index);
    };

    const handleMouseLeave = () => {
        if (editable) setHoverRating(0);
    };

    const handleClick = (index) => {
        if (editable && onChange) onChange(index);
    };

    return (
        <div style={{ display: 'flex', gap: '4px' }}>
            {[1, 2, 3, 4, 5].map((index) => {
                const isFilled = index <= (hoverRating || rating);
                return (
                    <Star
                        key={index}
                        size={20}
                        color={isFilled ? '#eab308' : '#cbd5e1'}
                        fill={isFilled ? '#eab308' : 'none'}
                        style={{ cursor: editable ? 'pointer' : 'default', transition: 'all 0.2s' }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(index)}
                    />
                );
            })}
        </div>
    );
};

export default StarRating;
