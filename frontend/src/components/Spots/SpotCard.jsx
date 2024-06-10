import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SpotCard.css';

const SpotCard = ({ spot, onClick, onDelete }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isManageSpotsPage = location.pathname === '/spots/current';

  const previewImageUrl = spot.previewImage ? spot.previewImage : 'default-image-url'; // Provide a default image URL if necessary

  const averageRating = spot.avgRating ? parseFloat(spot.avgRating).toFixed(1) : 'New';

  const handleUpdateClick = (e) => {
    e.stopPropagation();
    navigate(`/spots/${spot.id}/edit`);
  };

  return (
    <div
      key={spot.id}
      className="spot-tile"
      onMouseEnter={() => {
        setTooltipVisible(true);
      }}
      onMouseLeave={() => {
        setTooltipVisible(false);
      }}
    >
      <img src={previewImageUrl} alt={spot.name} onClick={() => onClick(spot.id)} />
      {tooltipVisible && <div className="tooltip">{spot.name}</div>}
      <div className="spot-info">
        <h3>{spot.name}</h3>
        <p>{spot.city}, {spot.state}</p>
        <p>${spot.price} / night</p>
        <p>{averageRating} ★</p>
        {isManageSpotsPage && (
          <div className="spot-actions">
            <button className="update-button" onClick={handleUpdateClick}>Update</button>
            <button className="delete-button" onClick={() => onDelete(spot.id)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotCard;
