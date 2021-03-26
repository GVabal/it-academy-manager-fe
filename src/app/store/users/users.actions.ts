import { createAction, props } from '@ngrx/store';
import {CustomError} from '../../shared/customError';
import {RegistrationRequest} from '../../shared/registrationRequest';

export const registerUser = createAction(
  '[Users] Register User',
  props<{request: RegistrationRequest}>()
);

export const registerUserSuccess = createAction(
  '[Users] Register User Success'
);

export const registerUserFailure = createAction(
  '[Users] Register User Failure',
  props<{ error: CustomError}>()
);
