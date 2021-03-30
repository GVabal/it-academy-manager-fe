import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of} from 'rxjs';
import { ReviewService } from 'src/app/service/review.service';
import { addReview, addReviewFailure, addReviewSuccess, loadReviews, loadReviewsFailure, loadReviewsSuccess } from './review.action';
import { isReviewDataInStore } from './review.selectors';
import { Store } from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';


@Injectable()
export class ReviewsEffects {

  constructor(private actions$: Actions,
              private reviewService: ReviewService,
              private store: Store,
              private toastr: ToastrService) {}


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

  addReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addReview),
      switchMap((action) => this.reviewService.addReview(action.review).pipe(
        map((review) => {
          this.toastr.success('Review submitted.', 'Success!');
          return addReviewSuccess( { review });
        }),
        catchError(error => of(addReviewFailure({ error })))
      )
      )
    )
  );
}
