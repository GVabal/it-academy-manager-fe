import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {loadStreams} from '../store/stream/stream.actions';
import {take, tap, mapTo} from 'rxjs/operators';
import {getIsStreamLoaded, getIsStreamLoading} from '../store/stream/stream.selectors';

@Injectable({
  providedIn: 'root'
})
export class LoadStreamsGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    const isStreamsLoading$ = this.store.select(getIsStreamLoading);
    const isStreamsLoaded$ = this.store.select(getIsStreamLoaded);

    return combineLatest([isStreamsLoading$, isStreamsLoaded$]).pipe(
      tap(([isStreamsLoading, isStreamLoaded]) => {
        if (!isStreamsLoading && !isStreamLoaded) {
          this.store.dispatch(loadStreams());
        }
      }),
      mapTo(true),
      take(1)
    );
  }
}
