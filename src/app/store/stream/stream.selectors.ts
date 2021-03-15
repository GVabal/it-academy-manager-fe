import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, StreamState, streamFeatureKey } from './stream.reducer';

export const selectStreamState =  createFeatureSelector<StreamState>(streamFeatureKey);

export const getIsStreamLoading = createSelector(selectStreamState, streamState => streamState.loading);
export const getIsStreamLoaded = createSelector(selectStreamState, streamState => streamState.loaded);
export const getStreamError = createSelector(selectStreamState, streamState => streamState.error);

export const {selectAll: selectStreams} = adapter.getSelectors(selectStreamState);
