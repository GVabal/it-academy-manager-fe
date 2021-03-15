import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPageComponent} from './admin-page/admin-page.component';
import { StudentListComponent } from './admin-page/student-list/student-list.component';

const routes: Routes = [
  {path: 'admin-page', component: AdminPageComponent},
  {path: 'students', component: StudentListComponent},
  {path: '', redirectTo: '/admin-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
