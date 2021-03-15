import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { StreamService } from 'src/app/service/stream.service';
import { loadStreams, loadStreamFailure, loadStreamSuccess, addStream, addStreamFailure, addStreamSuccess, deleteStream, deleteStreamFailure, deleteStreamSuccess } from './stream.actions';
import {of} from 'rxjs';

@Injectable()
export class StreamEffects {

  constructor(private actions$: Actions, private streamService: StreamService) {}

 loadStreams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStreams),
      switchMap(() => this.streamService.loadStreams().pipe(
        map(streams => loadStreamSuccess({streams})),
        catchError(error => of(loadStreamFailure({error})))
        )
      )
    )
  );

  addStream$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addStream),
      switchMap((action) => this.streamService.addStream(action.stream).pipe(
          map(stream => addStreamSuccess({stream})),
          catchError(error => of(addStreamFailure({error})))
          )
      )
    )
  );

  deleteStream$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteStream),
      switchMap(action => this.streamService.deleteStream(action.id).pipe(
        map(() => deleteStreamSuccess({id: action.id})),
        catchError(error => of(deleteStreamFailure({error})))
        )
      )
    )
  );
}
