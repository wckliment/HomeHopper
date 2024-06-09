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
      <div className="spots-list">
        {userSpots && userSpots.length > 0 ? (
          userSpots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} onClick={handleSpotClick} />
          ))
        ) : (
          <p>You have no spots. <NavLink to="/spots/new">Create a new spot</NavLink></p>
        )}
      </div>
    </div>
  );
};

export default ManageSpots;
