import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, State, streamFeatureKey } from './stream.reducer';

export const selectStreamState =  createFeatureSelector<State>(streamFeatureKey);

export const {selectAll: selectStreams} = adapter.getSelectors(selectStreamState);
export const selectIsStreamsLoading = createSelector(selectStreamState, state => state.loading);
export const selectIsStreamsLoaded = createSelector(selectStreamState, state => state.loaded);
