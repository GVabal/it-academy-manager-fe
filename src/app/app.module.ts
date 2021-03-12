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

@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    StudentAddFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([
      StudentsEffects
    ]),
    StoreModule.forRoot({
      [studentsFeatureKey]: studentsReducer
    }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
