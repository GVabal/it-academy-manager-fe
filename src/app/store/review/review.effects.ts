import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of} from 'rxjs';
import { ReviewService } from 'src/app/service/review.service';
import { loadReviews, loadReviewsFailure, loadReviewsSuccess } from './review.action';
import { loadStudentsSuccess } from '../students/students.actions';
import { isReviewDataInStore } from './review.selectors';
import { Store } from '@ngrx/store';


@Injectable()
export class ReviewsEffects {

  constructor(private actions$: Actions, private reviewService: ReviewService, private store: Store) {}


  loadReviews$: any = createEffect(() =>
    this.actions$.pipe(
      ofType(loadReviews),
      withLatestFrom(this.store.select(isReviewDataInStore)),
      filter(([_, isInStore]) => !isInStore),
      switchMap(([{id}, _]) => {
        return this.reviewService.getReviewsByStudentId(id).pipe(
          map(reviews => loadReviewsSuccess({reviews})),
          catchError(error => of(loadReviewsFailure({error})))
        );
         })
    )
    );

  initialLoadReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStudentsSuccess),
      map(({students}) => loadReviews({id: students[0].id}))
    )
  );
}