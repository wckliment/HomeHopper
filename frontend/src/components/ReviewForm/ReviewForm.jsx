import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview, updateReview } from '../../store/review';
import { useModal } from '../../context/Modal';
import './ReviewForm.css';

const ReviewForm = ({ spotId, reviewId = null, initialReview = '', initialStars = 0, onClose }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState(initialReview);
  const [stars, setStars] = useState(initialStars);
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState('');

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

    try {
      let result;
      if (reviewId) {
        result = await dispatch(updateReview(reviewId, { review, stars })); // Update existing review
      } else {
        result = await dispatch(createReview(spotId, { review, stars })); // Create new review
      }

      if (result.error) {
        if (result.status === 409) {
          setBackendError('User already has a review for this spot');
        } else {
          setBackendError(result.error || 'An unexpected error occurred. Please try again later.');
        }
      } else {
        closeModal(); // Close the modal after successfully creating or updating a review
        onClose(); // Trigger the review fetch in the SpotDetail component
      }
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred. Please try again later.';
      setBackendError(errorMessage);
    }
  };

  return (
    <div className="review-form">
      <h2>How was your stay?</h2>
      {backendError && <p className="error">{backendError}</p>}
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
              className={star <= stars ? 'star filled' : 'star'}
              onClick={() => setStars(star)}
            >
              ★
            </span>
          ))}
        </div>
        {errors.stars && <p className="error">{errors.stars}</p>}
        <button type="submit" disabled={review.length < 10 || stars < 1}>
          {reviewId ? 'Update Your Review' : 'Submit Your Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
