import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AuthHttpInterceptor } from './interceptors/AuthHttpInterceptor';
import { HttpErrorInterceptor } from './interceptors/HttpErrorInterceptor';
import { RouterModule } from '@angular/router';
import { RedeemComponent } from './components/redeem.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

@NgModule({ declarations: [AppComponent, RedeemComponent],
    exports: [RedeemComponent],
    bootstrap: [AppComponent], imports: [CommonModule, BrowserModule, BrowserAnimationsModule, RouterModule, AppRoutingModule], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
