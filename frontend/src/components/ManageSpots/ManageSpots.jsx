import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchUserSpots } from '../../store/spots';
import SpotCard from '../Spots/SpotCard';
import './ManageSpots.css';

const ManageSpots = () => {
  const dispatch = useDispatch();
  const userSpots = useSelector((state) => state.spots.userSpots);
  const currentUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserSpots());
    }
  }, [dispatch, currentUser]);

  const handleSpotClick = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  if (!currentUser) return <div>Please log in to manage your spots.</div>;

  return (
    <div className="manage-spots-page">
      <h1>Manage Your Spots</h1>
      {userSpots && userSpots.length > 0 ? (
        <div className="spots-list">
          {userSpots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} onClick={handleSpotClick} />
          ))}
        </div>
      ) : (
        <div className="no-spots">
          <p>You have no spots.</p>
          <NavLink to="/spots/new" className="create-new-spot-link">Create a New Spot</NavLink>
        </div>
      )}
    </div>
  );
};

export default ManageSpots;
