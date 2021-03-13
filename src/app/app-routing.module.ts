import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamComponent } from './stream/stream.component';
import {AdminPageComponent} from './admin-page/admin-page.component';

const routes: Routes = [
  {path: 'streams', component: StreamComponent},
  {path: 'admin-page', component: AdminPageComponent},
  {path: '', redirectTo: '/admin-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
