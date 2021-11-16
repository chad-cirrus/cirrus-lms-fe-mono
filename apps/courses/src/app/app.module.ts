import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CirrusMaterialModule } from '@cirrus/ui';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, CirrusMaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
