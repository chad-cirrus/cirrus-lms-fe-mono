import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CirrusMaterialModule, UiModule } from '@cirrus/ui';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { configReducer } from './store/reducers/config.reducer';
import { extModules } from './build-specifics';
import { EffectsModule } from '@ngrx/effects';
import { ConfigEffects } from './store/effects/config.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CirrusMaterialModule,
    UiModule,
    StoreModule.forRoot({ config: configReducer }),
    extModules,
    EffectsModule.forRoot([ConfigEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
