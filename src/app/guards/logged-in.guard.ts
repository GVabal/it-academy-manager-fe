import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {getIsUserAuthenticated, getUser} from '../store/users/users.selectors';
import {UserRole} from '../shared/userRole';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.store.select(getIsUserAuthenticated).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.store.select(getUser).subscribe(user => {
          if (user?.role === UserRole.ADMIN) {
            this.router.navigate(['/admin-page']);
          }
          if (user?.role === UserRole.MANAGER) {
            this.router.navigate(['/manager-page']);
          }
          if (user?.role === UserRole.LECTURER) {
            this.router.navigate(['/lecturer-page']);
          }
        });
      }
    });

    return true;
  }
}
