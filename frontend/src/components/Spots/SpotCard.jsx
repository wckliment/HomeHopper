import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Tooltip from '../Tooltip/Tooltip';
import './SpotCard.css';

const SpotCard = ({ spot, onClick, onDelete }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/';
  const isManageSpotsPage = location.pathname === '/spots/current';

  const previewImageUrl = spot.previewImage ? spot.previewImage : 'default-image-url';

  const averageRating = spot.avgRating ? parseFloat(spot.avgRating).toFixed(1) : 'New';

  const handleUpdateClick = (e) => {
    e.stopPropagation();
    navigate(`/spots/${spot.id}/edit`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(spot.id);
  };

 return (
    <div
      key={spot.id}
      className="spot-tile"
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
      onClick={() => onClick(spot.id)}
    >
      <img src={previewImageUrl} alt={spot.name} />
      {isLandingPage && <Tooltip text={spot.name} visible={tooltipVisible} />}
      <div className="spot-info">
        <h3 className="spot-name">{spot.name}</h3>
        <p>{spot.city}, {spot.state}</p>
        <p>${spot.price} / night</p>
        <p className="average-rating">{averageRating} ★</p>
        {isManageSpotsPage && (
          <div className="spot-actions">
            <button className="update-button" onClick={handleUpdateClick}>Update</button>
            <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotCard;
