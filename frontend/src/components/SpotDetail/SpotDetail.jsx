import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpotDetails, fetchReviews } from "../../store/spots";
import ReviewForm from '../ReviewForm/ReviewForm';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ConfirmDeleteReviewModal from "../ConfirmDeleteReviewModal/ConfirmDeleteReviewModal";
import "./SpotDetail.css";

const SpotDetail = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.spotDetails);
  const reviews = useSelector((state) => state.spots.reviews) || [];
  const loading = useSelector((state) => state.spots.loading);
  const currentUser = useSelector((state) => state.session.user);

  const [reviewIdToDelete, setReviewIdToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  if (loading) return <div>Loading...</div>;
  if (!spot) return <div>Spot not found</div>;

  const reviewText = reviews.length === 1 ? "1 Review" : `${reviews.length} Reviews`;
  const isOwner = currentUser && currentUser.id === spot.ownerId;
  const userHasReviewed = reviews.some(review => review.userId === currentUser.id);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return "New";
    const totalRating = reviews.reduce((acc, review) => acc + review.stars, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const averageRating = calculateAverageRating(reviews);

  const handleReviewCreation = () => {
    dispatch(fetchReviews(spotId)); // Fetch the latest reviews
  };

  const handleDeleteSuccess = () => {
    dispatch(fetchReviews(spotId)); // Refresh the reviews after deletion
    setReviewIdToDelete(null);
  };

  const openDeleteModal = (reviewId) => {
    setReviewIdToDelete(reviewId);
  };

  const closeDeleteModal = () => {
    setReviewIdToDelete(null);
  };

  return (
    <div className="spot-details-page">
      <div className="top-section">
        <div className="spot-detail">
          <h1>{spot.name}</h1>
          <p>{spot.city}, {spot.state}, {spot.country}</p>
          <div className="spot-images">
            {spot.SpotImages && spot.SpotImages.length > 0 && (
              <>
                <img src={spot.SpotImages[0]?.url} alt={spot.name} className="large-image" />
                <div className="small-images">
                  {spot.SpotImages.slice(1, 5).map((image) => (
                    <img key={image.id} src={image.url} alt={spot.name} />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="spot-info">
            <p>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</p>
            <p>{spot.description}</p>
          </div>
        </div>
        <div className="callout-ctn">
          <div className="callout-info">
            <p className="price">${spot.price} / night</p>
            <p className="rating">
              {averageRating} ★ <span className="dot">·</span> {reviewText}
            </p>
            <button className="reserve-button" onClick={() => alert('Feature Coming Soon!')}>
              Reserve
            </button>
          </div>
        </div>
      </div>
      <div className="reviews-section">
        <h2>Reviews</h2>
        {currentUser && !isOwner && !userHasReviewed && (
          <OpenModalButton
            modalComponent={<ReviewForm spotId={spotId} onClose={handleReviewCreation} />}
            buttonText="Post Your Review"
          />
        )}
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review">
              <p>{review.User.firstName}</p>
              <p>{new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
              <p>{review.review}</p>
              <p>{review.stars} ★</p>
              {currentUser && review.userId === currentUser.id && (
                <>
                  <OpenModalButton
                    modalComponent={
                      <ConfirmDeleteReviewModal
                        reviewId={reviewIdToDelete}
                        onDeleteSuccess={handleDeleteSuccess}
                        onCancel={closeDeleteModal}
                      />
                    }
                    buttonText="Delete"
                    onButtonClick={() => openDeleteModal(review.id)}
                  />
                </>
              )}
            </div>
          ))
        ) : (
          !isOwner && currentUser ? <p>Be the first to post a review!</p> : <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default SpotDetail;
