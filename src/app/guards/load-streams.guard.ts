import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {loadStreams} from '../store/stream/stream.actions';
import {filter, take, tap, switchMap} from 'rxjs/operators';
import {getIsStreamLoaded, getIsStreamLoading} from '../store/stream/stream.selectors';

@Injectable({
  providedIn: 'root'
})
export class LoadStreamsGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isStreamsLoading$ = this.store.select(getIsStreamLoading);
    const isStreamsLoaded$ = this.store.select(getIsStreamLoaded);

    return combineLatest([isStreamsLoading$, isStreamsLoaded$]).pipe(
      filter(([loading, loaded]) => !loading && !loaded),
      take(1),
      tap(() => this.store.dispatch(loadStreams())),
      switchMap(() => of(true))
    );
  }
}
