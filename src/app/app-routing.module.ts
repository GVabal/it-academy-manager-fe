import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SampleComponent} from './sample/sample.component';
import { StreamComponent } from './stream/stream.component';
import {AdminPageComponent} from './admin-page/admin-page.component';

const routes: Routes = [
  {path: 'streams', component: StreamComponent},
  {path: '', component: AdminPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
