import { createAction, props } from '@ngrx/store';
import {Sample} from '../shared/Sample';

export const loadSamples = createAction(
  '[Sample] Load Samples'
);

export const loadSamplesSuccess = createAction(
  '[Sample] Load Samples Succes',
  props<{samples: Sample[]}>()
);

export const loadSamplesFailure = createAction(
  '[Sample] Load Samples Failure',
  props<{error: Error}>()
);
