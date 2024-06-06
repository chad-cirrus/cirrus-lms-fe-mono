import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ShellContainerComponent } from './components/shell-container.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { UserProfileMenuComponent } from './components/user-profile-menu/user-profile-menu.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MobileMenuService } from '../../../../shared/services/mobile-menu.service';

@NgModule({
  declarations: [
    AppComponent,
    ShellContainerComponent,
    HeaderComponent,
    SidebarComponent,
    ProfilePageComponent,
    UserProfileMenuComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatTableModule,
    MatCheckboxModule
  ],
  providers: [
    MobileMenuService
  ],
  exports: [],
  bootstrap: [AppComponent],
})

export class AppModule {}