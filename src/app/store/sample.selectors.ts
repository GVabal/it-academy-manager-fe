import { createFeatureSelector, createSelector } from '@ngrx/store';
import {adapter, sampleFeatureKey, SampleState} from './sample.reducer';

export const selectSampleState = createFeatureSelector<SampleState>(sampleFeatureKey);

export const {
  selectAll: selectSamples,
} = adapter.getSelectors(selectSampleState);
