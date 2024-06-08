import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/review';
import './ReviewForm.css';

const ReviewForm = ({ spotId, onClose }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0); // Add hover state
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (review.length < 10) {
      newErrors.review = 'Review must be at least 10 characters long';
    }

    if (stars < 1 || stars > 5) {
      newErrors.stars = 'Stars rating must be between 1 and 5';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await dispatch(createReview(spotId, { review, stars }));
    onClose();
  };

  return (
    <div className="review-form">
      <h2>How was your stay?</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Leave your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        {errors.review && <p className="error">{errors.review}</p>}
        <div className="star-rating">
          <label>Stars</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= (hoverStars || stars) ? 'star filled' : 'star'}
              onClick={() => setStars(star)}
              onMouseEnter={() => setHoverStars(star)}
              onMouseLeave={() => setHoverStars(0)}
            >
              ★
            </span>
          ))}
        </div>
        {errors.stars && <p className="error">{errors.stars}</p>}
        <button type="submit" disabled={review.length < 10 || stars < 1}>
          Submit Your Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
