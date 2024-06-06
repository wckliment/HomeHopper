import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpotDetails, fetchReviews } from "../../store/spots";
import "./SpotDetail.css";

const SpotDetail = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.spotDetails);
  const reviews = useSelector((state) => state.spots.reviews);
  const loading = useSelector((state) => state.spots.loading);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    console.log('Reviews state:', reviews); // Log the reviews state
  }, [reviews]);

  if (loading) return <div>Loading...</div>;
  if (!spot) return <div>Spot not found</div>;

  const reviewText = spot.numReviews === 1 ? "1 Review" : `${spot.numReviews} Reviews`;

  return (
    <div className="spot-details-page">
      <div className="top-section">
        <div className="spot-detail">
          <h1>{spot.name}</h1>
          <p>{spot.city}, {spot.state}, {spot.country}</p>
          <div className="spot-images">
            <img src={spot.SpotImages[0]?.url} alt={spot.name} className="large-image" />
            <div className="small-images">
              {spot.SpotImages.slice(1, 5).map((image) => (
                <img key={image.id} src={image.url} alt={spot.name} />
              ))}
            </div>
          </div>
          <div className="spot-info">
            <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
            <p>{spot.description}</p>
          </div>
        </div>
        <div className="callout-ctn">
          <div className="callout-info">
            <p className="price">${spot.price} / night</p>
            <p className="rating">{spot.avgRating} ★ ({reviewText})</p>
            <button className="reserve-button" onClick={() => alert('Feature Coming Soon!')}>
              Reserve
            </button>
          </div>
        </div>
      </div>
      <div className="reviews-section">
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review">
              <p>{review.User.firstName} {review.User.lastName}</p>
              <p>{new Date(review.createdAt).toLocaleDateString()}</p>
              <p>{review.review}</p>
              <p>{review.stars} ★</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default SpotDetail;
