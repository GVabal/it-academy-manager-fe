import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPageComponent} from './admin-page/admin-page.component';
<<<<<<< HEAD
import { StudentEditFormComponent } from './admin-page/student-edit-form/student-edit-form.component';
=======
import {LoadStreamsGuard} from './guards/load-streams.guard';
import {LoadStudentsGuard} from './guards/load-students.guard';
>>>>>>> development

const routes: Routes = [
  {path: 'admin-page', component: AdminPageComponent, canActivate: [LoadStreamsGuard, LoadStudentsGuard]},
  {path: '', redirectTo: '/admin-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
