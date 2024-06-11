import { csrfFetch } from './csrf';

// Action Types
const SET_REVIEWS = 'reviews/SET_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

// Action Creators
const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  reviews,
});

const addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});

const removeReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

// Thunks
export const fetchReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setReviews(data.Reviews));
  }
};

export const createReview = (spotId, reviewData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addReview(data));
      return data; // Return the newly created review
    } else {
      const errorData = await response.json();
      return { error: errorData.message, status: response.status };
    }
  } catch (error) {
    console.error('Error creating review:', error);
    return { error: error.message };
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete review');
    }

    dispatch(removeReview(reviewId));
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

// Initial State
const initialState = {
  reviews: [],
};

// Reducer
export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.reviews,
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [action.review, ...state.reviews],
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((review) => review.id !== action.reviewId),
      };
    default:
      return state;
  }
}
