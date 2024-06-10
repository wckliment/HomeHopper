import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetails, updateSpot } from '../../store/spots';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateSpotForm.css';

const UpdateSpotForm = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spotDetails = useSelector((state) => state.spots.spotDetails);

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

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    if (spotDetails) {
      setCountry(spotDetails.country || '');
      setAddress(spotDetails.address || '');
      setCity(spotDetails.city || '');
      setState(spotDetails.state || '');
      setLatitude(spotDetails.lat || '');
      setLongitude(spotDetails.lng || '');
      setDescription(spotDetails.description || '');
      setName(spotDetails.name || '');
      setPrice(spotDetails.price || '');
      setPreviewImage(spotDetails.previewImage || '');
      setImageUrls(spotDetails.images ? spotDetails.images.map(img => img.url) : ['', '', '', '']);
    }
  }, [spotDetails]);

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
      images: imageUrls,
    };

    const response = await dispatch(updateSpot(spotId, spotData));
    if (response && !response.error) {
      navigate(`/spots/${spotId}`);
    }
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  if (!spotDetails) return <div>Loading...</div>;

  return (
    <div className="update-spot-form-container">
      <h1>Update Your Spot</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Where's your place located?</h2>
          <p>Guests will only get your exact address once they booked a reservation.</p>
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
            <label>Preview Image URL (optional)</label>
            <input
              type="text"
              placeholder="Preview Image URL (optional)"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
            />
          </div>
          {imageUrls.map((url, index) => (
            <div key={index} className="form-group">
              <label>Image URL (optional)</label>
              <input
                type="text"
                placeholder="Image URL (optional)"
                value={url}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button type="submit">
          Update Spot
        </button>
        {formErrors.global && <p className="error">{formErrors.global}</p>}
      </form>
    </div>
  );
};

export default UpdateSpotForm;
