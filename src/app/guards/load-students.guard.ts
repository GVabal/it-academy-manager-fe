import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {mapTo, take, tap} from 'rxjs/operators';
import {loadStudents} from '../store/students/students.actions';
import {Store} from '@ngrx/store';
import {getIsStudentsLoaded, getIsStudentsLoading} from '../store/students/students.selectors';

@Injectable({
  providedIn: 'root'
})
export class LoadStudentsGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    const isStudentsLoading$ =  this.store.select(getIsStudentsLoading);
    const isStudentsLoaded$ = this.store.select(getIsStudentsLoaded);

    return combineLatest([isStudentsLoading$, isStudentsLoaded$]).pipe(
      tap(([isStudentsLoading, isStudentsLoaded]) => {
        if (!isStudentsLoading && !isStudentsLoaded) {
          this.store.dispatch(loadStudents());
        }
      }),
      mapTo(true),
      take(1)
  );
  }
}
