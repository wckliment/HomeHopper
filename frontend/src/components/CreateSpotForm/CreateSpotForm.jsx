import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSpot } from '../../store/spots';

const CreateSpotForm = () => {
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [imageUrls, setImageUrls] = useState(['', '', '', '']);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.spots);

  const handleSubmit = (e) => {
    e.preventDefault();
    const spotData = {
      country,
      address,
      city,
      state,
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
      description,
      name,
      price: parseFloat(price),
      previewImage,
      images: imageUrls.filter(url => url),
    };
    dispatch(createSpot(spotData));
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Country:</label>
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
      </div>
      <div>
        <label>Street Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </div>
      <div>
        <label>City:</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
      </div>
      <div>
        <label>State:</label>
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} required />
      </div>
      <div>
        <label>Latitude:</label>
        <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
      </div>
      <div>
        <label>Longitude:</label>
        <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Price per night (USD):</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div>
        <label>Preview Image URL:</label>
        <input type="text" value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} required />
      </div>
      {imageUrls.map((url, index) => (
        <div key={index}>
          <label>Image URL:</label>
          <input type="text" value={url} onChange={(e) => handleImageUrlChange(index, e.target.value)} />
        </div>
      ))}
      <button type="submit" disabled={loading}>
        Create Spot
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateSpotForm;
