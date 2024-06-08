import { useState } from 'react';
import './SpotCard.css';

const SpotCard = ({ spot, onClick }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Ensure that spot.previewImage is defined and is an array
  const previewImageUrl = Array.isArray(spot.previewImage) && spot.previewImage.length > 0 ? spot.previewImage[0].url : 'default-image-url'; // Provide a default image URL if necessary

  return (
    <div
      key={spot.id}
      className="spot-tile"
      onClick={() => onClick(spot.id)}
      onMouseEnter={() => {
        setTooltipVisible(true);
      }}
      onMouseLeave={() => {
        setTooltipVisible(false);
      }}
    >
      <img src={previewImageUrl} alt={spot.name} />
      {tooltipVisible && <div className="tooltip">{spot.name}</div>}
      <div className="spot-info">
        <h3>{spot.name}</h3>
        <p>{spot.city}, {spot.state}</p>
        <p>${spot.price} / night</p>
        <p>{spot.avgRating} ★</p>
      </div>
    </div>
  );
};

export default SpotCard;
