import { createFeatureSelector, createSelector } from '@ngrx/store';
import {usersFeatureKey, UsersState} from './users.reducer';

export const getUsersFeatureState =  createFeatureSelector<UsersState>(usersFeatureKey);

export const getHasUserRegistrationFailed = createSelector(getUsersFeatureState, usersState => usersState.hasRegistrationFailed);
export const getIsUsersLoading = createSelector(getUsersFeatureState, usersState => usersState.loading);
export const getIsUsersLoaded = createSelector(getUsersFeatureState, usersState => usersState.loaded);
export const getUsersError = createSelector(getUsersFeatureState, usersState => usersState.error);
export const getHasLoginFailed = createSelector(getUsersFeatureState, usersState => usersState.hasLoginFailed);
export const getIsUserAuthenticated = createSelector(getUsersFeatureState, usersState => usersState.isAuthenticated);
export const getUser = createSelector(getUsersFeatureState, usersState => usersState.user);
