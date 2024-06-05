import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpotDetails } from "../../store/spots";
import "./SpotDetail.css";

const SpotDetail = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.spotDetails);
  const loading = useSelector((state) => state.spots.loading);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
  }, [dispatch, spotId]);

  if (loading) return <div>Loading...</div>;
  if (!spot) return <div>Spot not found</div>;

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
        <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
        <p>{spot.description}</p>
      </div>
      <div className="callout-info">
        <p className="price">${spot.price} / night</p>
        <p className="rating">{spot.avgRating} ★ ({spot.numReviews} reviews)</p>
      </div>
    </div>
  );
};

export default SpotDetail;
