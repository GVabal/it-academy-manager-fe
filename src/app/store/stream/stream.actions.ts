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

export const addStream = createAction(
  '[Stream] Add Stream',
  props<{stream: Stream}>()
);

export const addStreamSuccess = createAction(
  '[Stream] Add Stream Success',
  props<{stream: Stream}>()
);

export const addStreamFailure = createAction(
  '[Stream] Add Stream Failure',
  props<{error: Error}>()
);

export const deleteStream = createAction(
  '[Stream] Delete Stream',
  props<{id: number}>()
);

export const deleteStreamSuccess = createAction(
  '[Stream] Delete Stream Success',
  props<{id: number}>()
);

export const deleteStreamFailure = createAction(
  '[Stream] Delete Stream Failure',
  props<{error: Error}>()
);
