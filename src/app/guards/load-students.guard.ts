import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import {filter, switchMap, take, tap} from 'rxjs/operators';
import {loadStudents} from '../store/students/students.actions';
import {Store} from '@ngrx/store';
import {selectIsStudentsLoaded, selectIsStudentsLoading} from '../store/students/students.selectors';

@Injectable({
  providedIn: 'root'
})
export class LoadStudentsGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isStudentsLoading$ =  this.store.select(selectIsStudentsLoading);
    const isStudentsLoaded$ = this.store.select(selectIsStudentsLoaded);

    return combineLatest([isStudentsLoading$, isStudentsLoaded$]).pipe(
      filter(([loading, loaded]) => !loading && !loaded),
      take(1),
      tap(() => this.store.dispatch(loadStudents())),
      switchMap(() => of(true))
  );
  }
}
