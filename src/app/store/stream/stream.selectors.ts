import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, StreamState, streamFeatureKey } from './stream.reducer';

export const getStreamState =  createFeatureSelector<StreamState>(streamFeatureKey);

export const {selectAll: selectStreams} = adapter.getSelectors(getStreamState);
export const selectIsStreamsLoading = createSelector(getStreamState, state => state.loading);
export const selectIsStreamsLoaded = createSelector(getStreamState, state => state.loaded);
export const selectHasStreamAddFailed = createSelector(getStreamState, streamState => streamState.hasStreamAddFailed);
export const selectStreamError = createSelector(getStreamState, streamState => streamState.error);
