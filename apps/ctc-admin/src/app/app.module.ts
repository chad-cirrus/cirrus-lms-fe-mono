import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { UserProfileMenuComponent } from './components/user-profile-menu/user-profile-menu.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MobileMenuService } from '../../../../shared/services/mobile-menu.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActivityComponent } from './components/activity/activity.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { ClientsComponent } from './components/clients/clients.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AuthHttpInterceptor } from './interceptors/AuthHttpInterceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ProfilePageComponent,
    UserProfileMenuComponent,
    DashboardComponent,
    ActivityComponent,
    InstructorsComponent,
    ClientsComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgApexchartsModule,
  ],
  providers: [
    MobileMenuService,
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
    {
      provide: 'environment',
      useValue: environment,
    },
  ],
  exports: [HeaderComponent, SidebarComponent, UserProfileMenuComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
