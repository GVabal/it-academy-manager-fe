import { createReducer, on } from '@ngrx/store';
import {CustomError} from '../../shared/customError';
import {registerUser, registerUserFailure, registerUserSuccess} from './users.actions';


export const usersFeatureKey = 'users';

export interface UsersState {
  loading: boolean;
  loaded: boolean;
  hasRegistrationFailed: boolean;
  error: CustomError | null;
}

export const initialState: UsersState = {
  loading: false,
  loaded: false,
  hasRegistrationFailed: true,
  error: null
};


export const usersReducer = createReducer(
  initialState,
  on(registerUser, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    };
  }),
  on(registerUserSuccess, (state) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      hasRegistrationFailed: false
    };
  }),
  on(registerUserFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      hasRegistrationFailed: true,
      error: action.error
    };
  })
);

