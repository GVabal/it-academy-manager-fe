import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {LoadStreamsGuard} from './guards/load-streams.guard';
import {LoadStudentsGuard} from './guards/load-students.guard';
import { LecturerPageComponent } from './lecturer-page/lecturer-page.component';
import { ManagerPageComponent } from './manager-page/manager-page.component';
import {UserRegistrationFormComponent} from './admin-page/user-registration-form/user-registration-form.component';
import {LoginPageComponent} from './login-page/login-page.component';

const routes: Routes = [
  {path: 'admin-page', component: AdminPageComponent, canActivate: [LoadStreamsGuard, LoadStudentsGuard]},
  {path: 'manager-page', component: ManagerPageComponent, canActivate: [LoadStudentsGuard]},
  {path: 'lecturer-page', component: LecturerPageComponent, canActivate: [LoadStreamsGuard, LoadStudentsGuard]},
  {path: 'register', component: UserRegistrationFormComponent},
  {path: 'login', component: LoginPageComponent},
  {path: '', redirectTo: '/admin-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
