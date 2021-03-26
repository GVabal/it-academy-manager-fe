import { createFeatureSelector, createSelector } from '@ngrx/store';
import {usersFeatureKey, UsersState} from './users.reducer';

export const getUsersFeatureState =  createFeatureSelector<UsersState>(usersFeatureKey);

export const getHasUserRegistrationFailed = createSelector(getUsersFeatureState, usersState => usersState.hasRegistrationFailed);
export const getIsUsersLoading = createSelector(getUsersFeatureState, usersState => usersState.loading);
export const getIsUsersLoaded = createSelector(getUsersFeatureState, usersState => usersState.loaded);
export const getUsersError = createSelector(getUsersFeatureState, usersState => usersState.error);
