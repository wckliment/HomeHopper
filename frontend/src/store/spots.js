import { csrfFetch } from './csrf';

// Action Types
const SET_SPOTS = 'spots/SET_SPOTS';
const SET_SPOT_DETAILS = 'spots/SET_SPOT_DETAILS';
const SET_REVIEWS = 'spots/SET_REVIEWS'
const SET_LOADING = 'spots/SET_LOADING';

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

// Initial State
const initialState = {
  spots: [],
  spotDetails: null,
  reviews: [],
  loading: false,
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
    default:
      return state;
  }
}
