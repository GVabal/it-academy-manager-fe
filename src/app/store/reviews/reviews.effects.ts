import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ReviewService } from 'src/app/service/review.service';
import { addReview, addReviewFailure, addReviewSuccess } from './reviews.actions';



@Injectable()
export class ReviewsEffects {

  constructor(private actions$: Actions, private reviewService$: ReviewService) {}

  addReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addReview),
      switchMap((action) => this.reviewService$.addReview(action.review).pipe(
        map((review) => addReviewSuccess( { review })),
        catchError(error => of(addReviewFailure({ error })))
      )
      )
    )
  );

}
