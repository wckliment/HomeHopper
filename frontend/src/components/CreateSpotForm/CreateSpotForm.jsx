import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSpot, createImage } from '../../store/spots';
import { useNavigate } from 'react-router-dom'
import './CreateSpotForm.css';

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
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.spots);

  useEffect(() => {
    console.log('Loading state:', loading);
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!country) errors.country = 'Country is required';
    if (!address) errors.address = 'Address is required';
    if (!city) errors.city = 'City is required';
    if (!state) errors.state = 'State is required';
    if (description.length < 30) errors.description = 'Description needs 30 or more characters';
    if (!name) errors.name = 'Name is required';
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      errors.price = 'Price per night is required and must be a positive number';
    }
    if (!previewImage || !/\.(jpg|jpeg|png)$/.test(previewImage)) {
  errors.previewImage = 'Preview image is required';
}
    imageUrls.forEach((url, index) => {
      if (!url || !/\.(jpg|jpeg|png)$/.test(url)) {
        errors[`image${index}`] = 'Image URL must end in .png, .jpg, or .jpeg';
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

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
    };

    const response = await dispatch(createSpot(spotData));
    if (response && response.id) {
      const spotId = response.id;
      const imagePromises = [
        dispatch(createImage(spotId, previewImage, true)),
        ...imageUrls.map((url) => dispatch(createImage(spotId, url, false))),
      ];

      console.log('Dispatching image creation:', {
        previewImage,
        imageUrls,
      });

      try {
        await Promise.all(imagePromises);
        navigate(`/spots/${spotId}`);
      } catch (error) {
        console.error('Error creating images:', error);
      }
    }
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  return (
    <div className="create-spot-form-container">
      <h1>Create a New Spot</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Where's your place located?</h2>
         <p>Guests will only get your exact address once they&apos;ve booked a reservation.</p>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            {formErrors.country && <p className="error">{formErrors.country}</p>}
          </div>
          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {formErrors.address && <p className="error">{formErrors.address}</p>}
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {formErrors.city && <p className="error">{formErrors.city}</p>}
          </div>
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            {formErrors.state && <p className="error">{formErrors.state}</p>}
          </div>
          <div className="form-group">
            <label>Latitude (optional)</label>
            <input
              type="text"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Longitude (optional)</label>
            <input
              type="text"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
        </div>
        <div className="form-section">
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Please write at least 30 characters"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {formErrors.description && <p className="error">{formErrors.description}</p>}
          </div>
        </div>
        <div className="form-section">
          <h2>Create a title for your spot</h2>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Name of your spot"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {formErrors.name && <p className="error">{formErrors.name}</p>}
          </div>
        </div>
        <div className="form-section">
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <div className="form-group">
            <label>Price per night (USD)</label>
            <input
              type="number"
              placeholder="Price per night (USD)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {formErrors.price && <p className="error">{formErrors.price}</p>}
          </div>
        </div>
        <div className="form-section">
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <div className="form-group">
            <label>Preview Image URL</label>
            <input
              type="text"
              placeholder="Preview Image URL"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
            />
            {formErrors.previewImage && <p className="error">{formErrors.previewImage}</p>}
          </div>
          {imageUrls.map((url, index) => (
            <div key={index} className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                placeholder="Image URL"
                value={url}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
              />
              {formErrors[`image${index}`] && <p className="error">{formErrors[`image${index}`]}</p>}
            </div>
          ))}
        </div>
        <button type="submit">
          Create Spot
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default CreateSpotForm;
