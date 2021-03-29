import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UserService} from '../service/user.service';
import {Store} from '@ngrx/store';
import {loadUser} from '../store/users/users.actions';

@Injectable({
  providedIn: 'root'
})
export class LoadUserGuard implements CanActivate {
  constructor(private userService: UserService, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.userService.getToken()) {
      this.store.dispatch(loadUser({token: this.userService.getToken()}));
    }
    return true;
  }

}
