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
import {ReactiveFormsModule} from '@angular/forms';
import { StreamListComponent } from './admin-page/stream-list/stream-list.component';
import { StreamEffects } from './store/stream/stream.effects';
import { streamFeatureKey, streamReducer } from './store/stream/stream.reducer';
import { StudentEditFormComponent } from './admin-page/student-edit-form/student-edit-form.component';
import { LecturerPageComponent } from './lecturer-page/lecturer-page.component';
import { StudentReviewFormComponent } from './lecturer-page/student-review-form/student-review-form.component';
import { ReviewsEffects } from './store/reviews/reviews.effects';

import { StudentListComponent } from './shared-components/student-list/student-list.component';
import { ManagerPageComponent } from './manager-page/manager-page.component';
import { reviewsFeatureKey, reviewsReducer } from './store/review/review.reducer';
import { StudentCardComponent } from './manager-page/student-card/student-card.component';
import { ChartsModule } from 'ng2-charts';
import { RadarChartComponent } from './shared-components/radar-chart/radar-chart.component';
import { StudentFormComponent } from './admin-page/student-form/student-form.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    StreamListComponent,
    StudentListComponent,
    LecturerPageComponent,
    StudentReviewFormComponent,
    ManagerPageComponent,
    StudentCardComponent,
    RadarChartComponent,
    StudentFormComponent
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([
      StudentsEffects,
      StreamEffects,
      ReviewsEffects
    ]),
    StoreModule.forRoot({
      [studentsFeatureKey]: studentsReducer,
      [streamFeatureKey]: streamReducer,
      [reviewsFeatureKey]: reviewsReducer
    }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
