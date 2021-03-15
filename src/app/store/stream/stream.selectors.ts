import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, StreamState, streamFeatureKey } from './stream.reducer';

export const getStreamFeatureState =  createFeatureSelector<StreamState>(streamFeatureKey);

export const getIsStreamLoading = createSelector(getStreamFeatureState, streamState => streamState.loading);
export const getIsStreamLoaded = createSelector(getStreamFeatureState, streamState => streamState.loaded);
export const getStreamError = createSelector(getStreamFeatureState, streamState => streamState.error);

export const {selectAll: selectStreams} = adapter.getSelectors(getStreamFeatureState);
