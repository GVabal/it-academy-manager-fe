import { Review } from './../../shared/review';
import { createAction, props } from '@ngrx/store';
import { CustomError } from 'src/app/shared/customError';

export const loadReviews = createAction(
  '[Reviews] Load Reviews',
  props<{id: number}>()
);

export const loadReviewsSuccess = createAction(
  '[Reviews] Load Reviews Success',
  props<{reviews: Review[]}>()
);

export const loadReviewsFailure = createAction(
  '[Reviews] Load Reviews Failure',
  props<{error: CustomError}>()
);

export const addReview = createAction(
  '[Review] Add Review',
  props<{review: Review}>()
);

export const addReviewSuccess = createAction(
  '[Review] Add Review Success',
  props<{review: Review}>()
);

export const addReviewFailure = createAction(
  '[Review] Add Review Failure',
  props<{error: CustomError}>()
);

