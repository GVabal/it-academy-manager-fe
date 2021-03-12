import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, State, streamFeatureKey } from './stream.reducer';

export const selectStreamState =  createFeatureSelector<State>(streamFeatureKey);

export const {selectAll: selectStreams} = adapter.getSelectors(selectStreamState)
