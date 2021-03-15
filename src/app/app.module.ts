import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {HttpClientModule} from '@angular/common/http';
import { StudentsEffects } from './store/students/students.effects';
import {studentsFeatureKey, studentsReducer} from './store/students/students.reducer';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { StudentAddFormComponent } from './admin-page/student-add-form/student-add-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { StreamListComponent } from './admin-page/stream-list/stream-list.component';
import { StreamEffects } from './store/stream/stream.effects';
import { streamFeatureKey, streamReducer } from './store/stream/stream.reducer';
import { StudentListComponent } from './admin-page/student-list/student-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    StudentAddFormComponent,
    StreamListComponent,
    StudentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([
      StudentsEffects,
      StreamEffects
    ]),
    StoreModule.forRoot({
      [studentsFeatureKey]: studentsReducer,
      [streamFeatureKey]: streamReducer
    }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
