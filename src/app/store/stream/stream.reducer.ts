import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Stream } from 'src/app/shared/stream';
import {deleteStream, deleteStreamFailure, deleteStreamSuccess, loadStreamFailure, loadStreams, loadStreamSuccess} from './stream.actions';


export const streamFeatureKey = 'stream';

export interface StreamState extends EntityState<Stream> {
  loading: boolean;
  loaded: boolean;
  error: Error | null;
  idToDelete: number;
}
export const adapter = createEntityAdapter<Stream>();

export const initialState: StreamState =  adapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
  idToDelete: 0
});



export const streamReducer = createReducer(
  initialState,
  on(loadStreams, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    };
  }),

  on(loadStreamSuccess, (state, action) => {
    return adapter.addMany(action.streams, {
      ...state,
      loading: false,
      loaded: true
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
  on(deleteStream, (state, action) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null,
      idToDelete: action.id
    };
  }),
  on(deleteStreamSuccess, (state) => {
    return adapter.removeOne(state.idToDelete, {
      ...state,
      loading: false,
      loaded: true,
      idToDelete: 0
    });
  }),
  on(deleteStreamFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: action.error,
      idToDelete: 0
    };
  })
);

