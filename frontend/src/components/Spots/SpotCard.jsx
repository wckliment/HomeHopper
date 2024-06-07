import React, { useState } from 'react';
import './SpotCard.css';

const SpotCard = ({ spot, onClick }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div
      key={spot.id}
      className="spot-tile"
      onClick={() => onClick(spot.id)}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      <img src={spot.previewImage[0]?.url} alt={spot.name} />
      <div className={`tooltip ${tooltipVisible ? 'visible' : ''}`}>{spot.name}</div>
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
