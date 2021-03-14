import { createAction, props } from '@ngrx/store';
import { Stream } from 'src/app/shared/stream';

export const loadStreams = createAction(
  '[Stream] Load Streams'
);

export const loadStreamSuccess = createAction(
  '[Stream] Load Streams Success',
  props<{streams: Stream[]}>()
);

export const loadStreamFailure = createAction(
  '[Stream] Load Streams Failure',
  props<{error: Error}>()
);

export const deleteStream = createAction(
  '[Stream] Delete Stream',
  props<{id: number}>()
);

export const deleteStreamSuccess = createAction(
  '[Stream] Delete Stream Success',
);

export const deleteStreamFailure = createAction(
  '[Stream] Delete Stream Failure',
  props<{error: Error}>()
);
