import { createAction, props } from '@ngrx/store';
import { CustomError } from 'src/app/shared/customError';
import { Review } from 'src/app/shared/review';

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




