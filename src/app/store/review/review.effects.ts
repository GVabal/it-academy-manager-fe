import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { ReviewService } from 'src/app/service/review.service';
import { loadReviews, loadReviewsFailure, loadReviewsSuccess } from './review.action';


@Injectable()
export class ReviewsEffects {

  constructor(private actions$: Actions, private reviewService: ReviewService) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadReviews),
      mergeMap(() => this.reviewService.loadReviews()
        .pipe(
          map(reviews => loadReviewsSuccess({reviews})),
          catchError(error => of(loadReviewsFailure({error})))
        )
      )
    )
  );

}