import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../service/user.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {loginUser, loginUserFailure, loginUserSuccess, registerUser, registerUserFailure, registerUserSuccess} from './users.actions';



@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      switchMap((action) => this.userService.registerUser(action.request).pipe(
        map(() => registerUserSuccess()),
        catchError(error => of(registerUserFailure({error})))
        )
      )
    )
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap(action => this.userService.login(action.request).pipe(
        map(user => loginUserSuccess({user})),
        catchError(error => of(loginUserFailure({error})))
        )
      )
    )
  );
}
