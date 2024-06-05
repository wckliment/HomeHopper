import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import './Spots.css';

const Spots = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.spots);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

 return (
    <div className="spots-container">
      {spots.map((spot) => (
        <div key={spot.id} className="spot-tile">
          <img src={spot.previewImage[0]?.url} alt={spot.name} />
          <div className="tooltip">{spot.name}</div>
          <div className="spot-info">
            <h3>{spot.name}</h3>
            <p>{spot.city}, {spot.state}</p>
            <p>${spot.price} / night</p>
            <p>{spot.avgRating} ★</p>
          </div>
        </div>
      ))}
    </div>
  );
};


export default Spots;
