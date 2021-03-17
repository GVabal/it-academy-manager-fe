import { LoadReviewsGuard } from './guards/load-reviews.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {LoadStreamsGuard} from './guards/load-streams.guard';
import {LoadStudentsGuard} from './guards/load-students.guard';
import { ManagerPageComponent } from './manager-page/manager-page.component';

const routes: Routes = [
  {path: 'admin-page', component: AdminPageComponent, canActivate: [LoadStreamsGuard, LoadStudentsGuard]},
  {path: 'manager-page', component: ManagerPageComponent, canActivate: [LoadStudentsGuard, LoadReviewsGuard]},
  {path: '', redirectTo: '/admin-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
