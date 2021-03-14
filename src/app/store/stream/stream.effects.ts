import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { StreamService } from 'src/app/service/stream.service';
import {loadStreams, loadStreamFailure, loadStreamSuccess, deleteStream, deleteStreamFailure, deleteStreamSuccess} from './stream.actions';
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

  deleteStream$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteStream),
      switchMap(action => this.streamService.deleteStream(action.id).pipe(
        map(() => deleteStreamSuccess()),
        catchError(error => of(deleteStreamFailure({error})))
        )
      )
    )
  );
}
