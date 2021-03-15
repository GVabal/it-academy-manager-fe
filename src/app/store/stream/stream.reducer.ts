import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Stream } from 'src/app/shared/stream';
import {
  addStream, addStreamFailure, addStreamSuccess,
  loadStreamFailure, loadStreams, loadStreamSuccess,
  deleteStream, deleteStreamFailure, deleteStreamSuccess
} from './stream.actions';

export const streamFeatureKey = 'stream';

export interface StreamState extends EntityState<Stream> {
  loading: boolean;
  loaded: boolean;
  hasLoadFailed: boolean;
  hasStreamAddFailed: boolean;
  error: Error | null;
}
export const adapter = createEntityAdapter<Stream>();

export const initialState: StreamState =  adapter.getInitialState({
  loading: false,
  loaded: false,
  hasLoadFailed: false,
  hasStreamAddFailed: false,
  error: null,
});

export const streamReducer = createReducer(
  initialState,
  on(loadStreams, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
    };
  }),

  on(loadStreamSuccess, (state, action) => {
    return adapter.addMany(action.streams, {
      ...state,
      loading: false,
      loaded: true,
    });
  }),

  on(loadStreamFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: action.error
    };
  }),

  on(deleteStream, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false
    };
  }),

  on(deleteStreamSuccess, (state, action) => {
    return adapter.removeOne(action.id, {
      ...state,
      loading: false,
      loaded: true
    });
  }),

  on(deleteStreamFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: action.error
    };
  }),

  on(addStream, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
    };
  }),

  on(addStreamSuccess, (state, action) => {
    return adapter.addOne(action.stream, {
      ...state,
      loading: false,
      loaded: true,
    });
  }),

  on(addStreamFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      hasStreamAddFailed: true,
      error: action.error
    };
  })
);

