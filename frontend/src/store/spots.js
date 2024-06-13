import { csrfFetch } from './csrf';

// Action Types
const SET_SPOTS = 'spots/SET_SPOTS';
const SET_SPOT_DETAILS = 'spots/SET_SPOT_DETAILS';
const SET_REVIEWS = 'spots/SET_REVIEWS';
const SET_LOADING = 'spots/SET_LOADING';
const CREATE_SPOT_REQUEST = 'spots/CREATE_SPOT_REQUEST';
const CREATE_SPOT_SUCCESS = 'spots/CREATE_SPOT_SUCCESS';
const CREATE_SPOT_FAILURE = 'spots/CREATE_SPOT_FAILURE';
const SET_USER_SPOTS = 'spots/SET_USER_SPOTS';
const UPDATE_SPOT_SUCCESS = 'spots/UPDATE_SPOT_SUCCESS';
const DELETE_SPOT_SUCCESS = 'spots/DELETE_SPOT_SUCCESS';
const REMOVE_USER_SPOT = 'spots/REMOVE_USER_SPOT';

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

const setUserSpots = (spots) => ({
  type: SET_USER_SPOTS,
  spots,
});

const updateSpotSuccess = (spot) => ({
  type: UPDATE_SPOT_SUCCESS,
  spot,
});

const deleteSpotSuccess = (spotId) => ({
  type: DELETE_SPOT_SUCCESS,
  spotId,
});

const removeUserSpot = (spotId) => ({
  type: REMOVE_USER_SPOT,
  spotId,
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
    dispatch(setReviews(data.Reviews));
  }
};

export const fetchUserSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots/current');
  if (response.ok) {
    const data = await response.json();
    dispatch(setUserSpots(data.Spots));
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
  } finally {
    dispatch(setLoading(false));
  }
};

export const createImage = (spotId, imageUrl, isPreview) => async () => {
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

export const updateSpot = (spotId, spotData) => async (dispatch) => {
  try {
    
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spotData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response data:", errorData); // Log the error data
      throw new Error(errorData.message || 'Failed to update spot');
    }

    const updatedSpot = await response.json();
    dispatch(updateSpotSuccess(updatedSpot));
    return updatedSpot;
  } catch (error) {
    console.error("Error updating spot:", error);
    throw error;
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete spot');
    }

    dispatch(deleteSpotSuccess(spotId));
    dispatch(removeUserSpot(spotId));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Initial State
const initialState = {
  spots: [],
  spotDetails: {},
  reviews: [],
  loading: false,
  userSpots: [],
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
    case CREATE_SPOT_SUCCESS:
      return {
        ...state,
        spots: [...state.spots, action.spot],
      };
    case CREATE_SPOT_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case SET_USER_SPOTS:
      return {
        ...state,
        userSpots: action.spots,
      };
    case UPDATE_SPOT_SUCCESS:
      return {
        ...state,
        spots: state.spots.map((spot) =>
          spot.id === action.spot.id ? action.spot : spot
        ),
        userSpots: state.userSpots.map((spot) =>
          spot.id === action.spot.id ? action.spot : spot
        ),
      };
    case DELETE_SPOT_SUCCESS:
      return {
        ...state,
        spots: state.spots.filter((spot) => spot.id !== action.spotId),
        userSpots: state.userSpots.filter((spot) => spot.id !== action.spotId),
      };
    case REMOVE_USER_SPOT:
      return {
        ...state,
        userSpots: state.userSpots.filter((spot) => spot.id !== action.spotId),
      };
    default:
      return state;
  }
}
