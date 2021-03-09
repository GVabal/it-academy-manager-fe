import {Action, createReducer, on, } from '@ngrx/store';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Sample} from '../shared/Sample';
import {loadSamples, loadSamplesFailure, loadSamplesSuccess} from './sample.actions';


export const sampleFeatureKey = 'sample';

export interface SampleState extends EntityState<Sample>{

}

export const adapter = createEntityAdapter<Sample>();

export const initialState: SampleState = adapter.getInitialState({});

export const sampleReducer = createReducer(
  initialState,
  on(loadSamples, (state) => {
    return {
      ...state
    };
  }),
  on(loadSamplesSuccess, (state, action) => {
    return adapter.addMany(action.samples, {
      ...state
    });
  }),
  on(loadSamplesFailure, (state) => {
    return {
      ...state
    };
  })
);

