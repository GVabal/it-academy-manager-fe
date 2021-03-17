import { Review } from './../../shared/review';
import { createAction, props } from '@ngrx/store';
import { CustomError } from 'src/app/shared/customError';

export const loadReviews = createAction(
  '[Reviews] Load Reviews'
);

export const loadReviewsSuccess = createAction(
  '[Reviews] Load Reviews Success',
  props<{reviews: Review[]}>()
);

export const loadReviewsFailure = createAction(
  '[Reviews] Load Reviews Failure',
  props<{error: CustomError}>()
);
