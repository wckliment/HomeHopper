import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchUserSpots, deleteSpot } from '../../store/spots';
import SpotCard from '../Spots/SpotCard';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import './ManageSpots.css';

const ManageSpots = () => {
  const dispatch = useDispatch();
  const userSpots = useSelector((state) => state.spots.userSpots);
  const currentUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const [spotToDelete, setSpotToDelete] = useState(null);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserSpots());
    }
  }, [dispatch, currentUser]);

  const handleSpotClick = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  const handleDeleteClick = (spotId) => {
    setSpotToDelete(spotId);
  };

  const handleConfirmDelete = () => {
    if (spotToDelete) {
      dispatch(deleteSpot(spotToDelete)).then(() => {
        setSpotToDelete(null);
      });
    }
  };

  const handleCancelDelete = () => {
    setSpotToDelete(null);
  };


  if (!currentUser) return <div>Please log in to manage your spots.</div>;

 return (
    <div className="manage-spots-page">
      <h1>Manage Your Spots</h1>
      {userSpots && userSpots.length > 0 ? (
        <div className="spots-list">
          {userSpots.map((spot) => (
            <SpotCard
              key={spot.id}
              spot={spot}
              onClick={handleSpotClick}
              onDelete={() => handleDeleteClick(spot.id)}
            />
          ))}
        </div>
      ) : (
        <div className="no-spots">
          <p>You have no spots.</p>
          <NavLink to="/spots/new" className="create-new-spot-link">Create a New Spot</NavLink>
        </div>
      )}
      {spotToDelete && (
        <ConfirmDeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default ManageSpots;
