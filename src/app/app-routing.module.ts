import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {LoadStreamsGuard} from './guards/load-streams.guard';
import {LoadStudentsGuard} from './guards/load-students.guard';
import { LecturerPageComponent } from './lecturer-page/lecturer-page.component';
import { ManagerPageComponent } from './manager-page/manager-page.component';
import {UserRegistrationFormComponent} from './admin-page/user-registration-form/user-registration-form.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthGuard} from './guards/auth.guard';
import {UserRole} from './shared/userRole';
import {LoggedInGuard} from './guards/logged-in.guard';
import {LoadUserGuard} from './guards/load-user.guard';

const routes: Routes = [
  {
    path: 'admin-page',
    component: AdminPageComponent,
    canActivate: [LoadStreamsGuard, LoadStudentsGuard, AuthGuard],
    data: {role: UserRole.ADMIN}
  },
  {
    path: 'manager-page',
    component: ManagerPageComponent,
    canActivate: [LoadStudentsGuard, AuthGuard],
    data: {role: UserRole.MANAGER}
  },
  {
    path: 'lecturer-page',
    component: LecturerPageComponent,
    canActivate: [LoadStreamsGuard, LoadStudentsGuard, AuthGuard],
    data: {role: UserRole.LECTURER}
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoadUserGuard, LoggedInGuard]
  },
  {path: 'register', component: UserRegistrationFormComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
