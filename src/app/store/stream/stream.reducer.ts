import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Stream } from 'src/app/shared/stream';
import { loadStreamFailure, loadStreams, loadStreamSuccess } from './stream.actions';


export const streamFeatureKey = 'stream';

export interface State extends EntityState<Stream> {

}
export const adapter = createEntityAdapter<Stream>();

export const initialState: State =  adapter.getInitialState({});



export const streamReducer = createReducer(
  initialState,
  on(loadStreams, (state) => {
    return {
      ...state
    };
  }),

  on(loadStreamSuccess, (state, action) => {
    return adapter.addMany(action.streams, {
      ...state
    });
  }),

  on(loadStreamFailure, (state) => {
    return {
      ...state
    };
  })

);

