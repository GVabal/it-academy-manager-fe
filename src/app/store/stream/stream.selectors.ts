import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, StreamState, streamFeatureKey } from './stream.reducer';

export const selectStreamState =  createFeatureSelector<StreamState>(streamFeatureKey);

export const selectIsStreamLoading = createSelector(selectStreamState, streamState => streamState.loading);
export const selectIsStreamLoaded = createSelector(selectStreamState, streamState => streamState.loaded);
export const selectStreamError = createSelector(selectStreamState, streamState => streamState.error);

export const {selectAll: selectStreams} = adapter.getSelectors(selectStreamState);
