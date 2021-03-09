import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { SampleEffects } from './store/sample.effects';
import { SampleComponent } from './sample/sample.component';
import {StoreModule} from '@ngrx/store';
import {sampleFeatureKey, sampleReducer} from './store/sample.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    SampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EffectsModule.forRoot([SampleEffects]),
    StoreModule.forRoot({
      [sampleFeatureKey]: sampleReducer
    }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
