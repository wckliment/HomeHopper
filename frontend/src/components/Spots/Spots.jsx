import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import SpotCard from './SpotCard';
import './Spots.css';

const Spots = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spots = useSelector((state) => state.spots.spots);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  const handleClick = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  return (
    <div className="spots-container">
      {spots.map((spot) => (
        <SpotCard key={spot.id} spot={spot} onClick={handleClick} />
      ))}
    </div>
  );
};

export default Spots;
