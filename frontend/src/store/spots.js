import { csrfFetch } from './csrf';

// Action Types
const SET_SPOTS = 'spots/SET_SPOTS';
const SET_SPOT_DETAILS = 'spots/SET_SPOT_DETAILS';
const SET_REVIEWS = 'spots/SET_REVIEWS';
const SET_LOADING = 'spots/SET_LOADING';
const CREATE_SPOT_REQUEST = 'spots/CREATE_SPOT_REQUEST';
const CREATE_SPOT_SUCCESS = 'spots/CREATE_SPOT_SUCCESS';
const CREATE_SPOT_FAILURE = 'spots/CREATE_SPOT_FAILURE';

// Action Creators
const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

const setSpotDetails = (spot) => ({
  type: SET_SPOT_DETAILS,
  spot,
});

const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  reviews,
});

const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});

const createSpotRequest = () => ({
  type: CREATE_SPOT_REQUEST,
});

const createSpotSuccess = (spot) => ({
  type: CREATE_SPOT_SUCCESS,
  spot,
});

const createSpotFailure = (error) => ({
  type: CREATE_SPOT_FAILURE,
  error,
});

// Thunks
export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  if (response.ok) {
    const data = await response.json();
    dispatch(setSpots(data.Spots));
  }
};

export const fetchSpotDetails = (spotId) => async (dispatch) => {
  dispatch(setLoading(true));
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setSpotDetails(data));
  }
  dispatch(setLoading(false));
};

export const fetchReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const data = await response.json();
    console.log('Fetched reviews:', data.Reviews); // Log the fetched reviews
    dispatch(setReviews(data.Reviews));
  }
};

export const createSpot = (spotData) => async (dispatch) => {
  dispatch(createSpotRequest());
  try {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spotData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create spot');
    }

    const spot = await response.json();
    dispatch(createSpotSuccess(spot));
    return spot;
  } catch (error) {
    dispatch(createSpotFailure(error.toString()));
  }
};

export const createImage = (spotId, imageUrl, isPreview) => async (dispatch) => {
  console.log('Creating image with data:', { spotId, imageUrl, isPreview }); // Console log here
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: imageUrl, preview: isPreview }),
    });

    if (!response.ok) {
      throw new Error('Failed to create image');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating image:', error);
    throw error;
  }
};

// Initial State
const initialState = {
  spots: [],
  spotDetails: null,
  reviews: [],
  loading: false,
  error: null,
};

// Reducer
export default function spotsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SPOTS:
      return {
        ...state,
        spots: action.spots,
      };
    case SET_SPOT_DETAILS:
      return {
        ...state,
        spotDetails: action.spot,
      };
    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.reviews,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case CREATE_SPOT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_SPOT_SUCCESS:
      return {
        ...state,
        loading: false,
        spots: [...state.spots, action.spot],
      };
    case CREATE_SPOT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
