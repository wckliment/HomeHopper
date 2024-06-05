import { csrfFetch } from './csrf';

// Action Types
const SET_SPOTS = 'spots/SET_SPOTS';
const SET_SPOT_DETAILS = 'spot/SET_SPOT_DETAILS';

// Action Creators
const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

const setSpotDetails = (spot) => ({
  type: SET_SPOT_DETAILS,
  spot,
});

// Thunks
export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  if (response.ok) {
    const data = await response.json();
    dispatch(setSpots(data.Spots));
  }
};

export const fetchSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(setSpotDetails(spot));
  }
};

// Initial State
const initialState = {
  spots: [],
  spotDetails: {},
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
        spotDetails: {
          ...state.spotDetails,
          [action.spot.id]: action.spot,
        },
      };
    default:
      return state;
  }
}
