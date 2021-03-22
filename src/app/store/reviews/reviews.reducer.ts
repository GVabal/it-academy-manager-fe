import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CustomError } from 'src/app/shared/customError';
import { Review } from 'src/app/shared/review';
import { addReview, addReviewFailure, addReviewSuccess } from './reviews.actions';


export const reviewsFeatureKey = 'reviews';

export interface ReviewsState extends EntityState<Review> {
  loaded: boolean;
  loading: boolean;
  hasReviewAddFailed: boolean;
  error: CustomError | null;
}

export const reviewsAdapter = createEntityAdapter<Review>();

export const initialState: ReviewsState = reviewsAdapter.getInitialState({
  loaded: false,
  loading: false,
  hasReviewAddFailed: false,
  error: null
});

export const reviewsReducer = createReducer(
  initialState,
  on(addReview, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      hasReviewAddFailed: false,
      error: null
    };
  }),
  on(addReviewSuccess, (state, action) => {
    return reviewsAdapter.addOne(action.review, {
      ...state,
      loading: false,
      loaded: true,
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

