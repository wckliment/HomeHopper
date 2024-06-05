import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpot } from '../../store/spots';
import './SpotDetail.css';

const SpotDetail = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.spotDetails[spotId]);

  useEffect(() => {
    dispatch(fetchSpot(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;

  return (
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
        <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
        <p>{spot.description}</p>
        <div className="callout-box">
          <p>${spot.price} / night</p>
          <p>{spot.avgRating} ★ ({spot.numReviews} reviews)</p>
          <button className="reserve-button" onClick={() => alert('Feature Coming Soon.')}>
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotDetail;
