import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../service/user.service';
import {catchError, map, switchMap, take, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  loadUser,
  loadUserSuccess,
  loginUser,
  loginUserFailure,
  loginUserSuccess,
  logoutUser,
  registerUser,
  registerUserFailure,
  registerUserSuccess
} from './users.actions';
import {Router} from '@angular/router';
import {User} from '../../shared/user';


@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private router: Router, private userService: UserService) {}

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

  loginUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUserSuccess),
      tap(({user}) => {
        document.cookie = `token=${user.token}`;
      }),
      take(1)
    )
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutUser),
      tap(() => {
        document.cookie = 'token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
        location.reload();
      }),
      take(1)
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      map(({token}) => {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const user: User = {
          fullName: decodedToken.fullName,
          email: decodedToken.sub,
          role: decodedToken.role,
          token
        };
        return loadUserSuccess({user});
      })
    )
  );
}
