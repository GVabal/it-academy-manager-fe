import { createReducer, on } from '@ngrx/store';
import {CustomError} from '../../shared/customError';
import {
  loadUser, loadUserSuccess,
  loginUser,
  loginUserFailure,
  loginUserSuccess,
  logoutUser,
  registerUser,
  registerUserFailure,
  registerUserSuccess
} from './users.actions';
import {User} from '../../shared/user';


export const usersFeatureKey = 'users';

export interface UsersState {
  loading: boolean;
  loaded: boolean;
  hasRegistrationFailed: boolean;
  hasLoginFailed: boolean;
  error: CustomError | null;
  isAuthenticated: boolean;
  user: User | null;
  clearForm: boolean;
}

export const initialState: UsersState = {
  loading: false,
  loaded: false,
  hasRegistrationFailed: false,
  hasLoginFailed: false,
  error: null,
  isAuthenticated: false,
  user: null,
  clearForm: false
};


export const usersReducer = createReducer(
  initialState,
  on(registerUser, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null,
      clearForm: false
    };
  }),
  on(registerUserSuccess, (state) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      hasRegistrationFailed: false,
      clearForm: true
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
  }),
  on(loginUser, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    };
  }),
  on(loginUserSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      hasLoginFailed: false,
      isAuthenticated: true,
      user: action.user
    };
  }),
  on(loginUserFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      hasLoginFailed: true,
      error: action.error
    };
  }),
  on(logoutUser, (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }),
  on(loadUser, (state) => {
    return {
      ...state,
    };
  }),
  on(loadUserSuccess, (state, action) => {
    return {
      ...state,
      isAuthenticated: true,
      user: action.user
    };
  })
);
