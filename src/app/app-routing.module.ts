import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamComponent } from './stream/stream.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import { StreamGuard } from './stream.guard';
import { StudentListComponent } from './admin-page/student-list/student-list.component';

const routes: Routes = [
  {path: 'streams', component: StreamComponent, canActivate: [StreamGuard]},
  {path: 'admin-page', component: AdminPageComponent},
  {path: 'students', component: StudentListComponent},
  {path: '', redirectTo: '/admin-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
