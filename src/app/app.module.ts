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
import { StreamComponent } from './stream/stream.component';
import {HttpClientModule} from '@angular/common/http';
import { StreamEffects } from './store/stream/stream.effects';
import { streamFeatureKey, streamReducer } from './store/stream/stream.reducer';

@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    StreamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([SampleEffects, StreamEffects]),
    StoreModule.forRoot({
      [sampleFeatureKey]: sampleReducer,
      [streamFeatureKey]: streamReducer
    }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
