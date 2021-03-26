import { addReview, addReviewFailure, addReviewSuccess, loadReviews, loadReviewsFailure, loadReviewsSuccess } from './review.action';
import { Review } from './../../shared/review';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CustomError } from 'src/app/shared/customError';

export const reviewsFeatureKey = 'reviews';


export interface ReviewsState extends EntityState<Review> {
    loading: boolean;
    loaded: boolean;
    hasReviewsLoadFailed: boolean;
    hasReviewAddFailed: boolean;
    clearForm: boolean;
    error: CustomError | null;
  }

export const reviewsAdapter = createEntityAdapter<Review>();

export const initialState: ReviewsState = reviewsAdapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
  hasReviewsLoadFailed: false,
  hasReviewAddFailed: true,
  clearForm: false
});

export const reviewsReducer = createReducer(

  initialState,

  on(loadReviews, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    };
  }),

  on(loadReviewsSuccess, (state, action) => {
    return reviewsAdapter.upsertMany(action.reviews, {
      ...state,
      loading: false,
      loaded: true,
      error: null
    });
  }),

  on(loadReviewsFailure, (state, action) => {
    return{
      ...state,
      loading: false,
      loaded: false,
      hasReviewsLoadFailed: true,
      error: action.error
    };
  }),

  on(addReview, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null,
      clearForm: false
    };
  }),

  on(addReviewSuccess, (state, action) => {
    return reviewsAdapter.addOne(action.review, {
      ...state,
      loading: false,
      loaded: true,
      hasReviewAddFailed: false,
      clearForm: true
    });
  }),

  on(addReviewFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      hasReviewAddFailed: true,
      error: action.error
    };
  }),
);
