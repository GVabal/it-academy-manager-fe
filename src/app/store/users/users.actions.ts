import { createAction, props } from '@ngrx/store';
import {CustomError} from '../../shared/customError';
import {RegistrationRequest} from '../../shared/registrationRequest';
import {LoginRequest} from '../../shared/loginRequest';
import {User} from '../../shared/user';

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

export const loginUser = createAction(
  '[Users] Login User',
  props<{request: LoginRequest}>()
);

export const loginUserSuccess = createAction(
  '[Users] Login User Success',
  props<{user: User}>()
);

export const loginUserFailure = createAction(
  '[Users] Login User Failure',
  props<{error: CustomError}>()
);
