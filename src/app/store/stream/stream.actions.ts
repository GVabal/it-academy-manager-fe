import { createAction, props } from '@ngrx/store';
import { Stream } from 'src/app/shared/stream';

export const loadStreams = createAction(
  '[Stream] Load Streams'
);

export const loadStreamSuccess = createAction(
  '[Stream] Load Streams Succes',
  props<{streams: Stream[]}>()
);

export const loadStreamFailure = createAction(
  '[Stream] Load Streams Failure',
  props<{error: Error}>()
);





