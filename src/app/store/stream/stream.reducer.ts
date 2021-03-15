import { Actions } from '@ngrx/effects';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Stream } from 'src/app/shared/stream';
import { loadStreamFailure, loadStreams, loadStreamSuccess } from './stream.actions';


export const streamFeatureKey = 'stream';

export interface State extends EntityState<Stream> {
  loading: boolean;
  loaded: boolean;
  hasLoadFailed: boolean;
  error: Error | null;
}
export const adapter = createEntityAdapter<Stream>();

export const initialState: State =  adapter.getInitialState({
  loading: false,
  loaded: false,
  hasLoadFailed: false,
  error: null,
});



export const streamReducer = createReducer(
  initialState,
  on(loadStreams, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      hasLoadFailed: false,
      error: null,
    };
  }),

  on(loadStreamSuccess, (state, action) => {
    return adapter.addMany(action.streams, {
      ...state,
      loading: false,
      loaded: true,
      hasLoadFailed: false,
      error: null,
    });
  }),

  on(loadStreamFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      hasLoadFailed: true,
      error: action.error,
    };
  })

);

