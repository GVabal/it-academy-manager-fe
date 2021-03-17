import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {mapTo, take, tap} from 'rxjs/operators';

import {Store} from '@ngrx/store';
import { loadReviews } from '../store/review/review.action';
import { getIsReviewsLoaded, getIsReviewsLoading } from '../store/review/review.selectors';


@Injectable({
  providedIn: 'root'
})
export class LoadReviewsGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    const isReviewsLoading$ =  this.store.select(getIsReviewsLoading);
    const isReviewsLoaded$ = this.store.select(getIsReviewsLoaded);

    return combineLatest([isReviewsLoading$, isReviewsLoaded$]).pipe(
      tap(([isReviewsLoading, isReviewsLoaded]) => {
        if (!isReviewsLoading && !isReviewsLoaded) {
          this.store.dispatch(loadReviews());
        }
      }),
      mapTo(true),
      take(1)
  );
  }
}
