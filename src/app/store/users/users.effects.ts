import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../service/user.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {registerUser, registerUserFailure, registerUserSuccess} from './users.actions';



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
}
