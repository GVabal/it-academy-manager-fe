import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap, map, catchError} from 'rxjs/operators';
import {loadSamples, loadSamplesFailure, loadSamplesSuccess} from './sample.actions';
import {of} from 'rxjs';
import {SampleService} from '../service/sample.service';


@Injectable()
export class SampleEffects {
  constructor(private actions$: Actions,
              private sampleService: SampleService) {}

  loadSamples$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSamples),
      switchMap(() => this.sampleService.getAll().pipe(
        map(samples => loadSamplesSuccess({samples})),
        catchError(error => of(loadSamplesFailure({error})))
        )
      )
    )
  );
}
