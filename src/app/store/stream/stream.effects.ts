import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { StreamService } from 'src/app/service/stream.service';
import { loadStreams, loadStreamFailure, loadStreamSuccess } from './stream.actions';
import {of} from 'rxjs';



@Injectable()
export class StreamEffects {

  constructor(private actions$: Actions, private streamService: StreamService) {}

 loadStreams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStreams),
      switchMap(() => this.streamService.loadStreams().pipe(
        map(streams => {
          console.log(streams);
          return loadStreamSuccess({streams});
        }),    
        catchError(error => of(loadStreamFailure({error})))
        )
      )
    )
  );


}
