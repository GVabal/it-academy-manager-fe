import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ReviewService } from 'src/app/service/review.service';
import { loadReviews, loadReviewsFailure, loadReviewsSuccess } from './review.action';
import { loadStudentsSuccess } from '../students/students.actions';


@Injectable()
export class ReviewsEffects {

  constructor(private actions$: Actions, private reviewService: ReviewService) {}

  loadReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadReviews),
      switchMap(({id}) => this.reviewService.getReviewsByStudentId(id)
        .pipe(
          map(reviews => loadReviewsSuccess({reviews})),
          catchError(error => of(loadReviewsFailure({error})))
        )
      )
    )
  );

  intialLoadReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStudentsSuccess),
      map(({students}) => loadReviews({id: students[0].id}))
    )
  );
}
