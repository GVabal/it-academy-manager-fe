import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {getUser} from '../store/users/users.selectors';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.userService.getToken()) {
      this.router.navigate(['/login']);
      return false;
    }

    this.store.select(getUser).subscribe(user => {
      if (user?.role !== route.data.role) {
        this.router.navigate(['/']);
      }
    });

    return true;
  }
}
