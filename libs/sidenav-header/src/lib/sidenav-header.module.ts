import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSideNavComponent } from './global-side-nav/global-side-nav.component';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { GlobalHeaderDropdownComponent } from './global-header-dropdown/global-header-dropdown.component';
import { GlobalMenuSliderComponent } from './global-menu-slider/global-menu-slider.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GlobalHamburgerMenuComponent } from './global-hamburger-menu/global-hamburger-menu.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { GlobalUserMenusComponent } from './global-user-menus/global-user-menus.component';
import { MatIconModule } from '@angular/material/icon';
import { GlobalHeaderComponent } from './global-header/global-header.component';
import { CirrusMaterialModule } from '@cirrus/ui';
import { GlobalFooterComponent } from './global-footer/global-footer.component';
import { BadgeModule } from '@cirrus/badge';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MatBadgeModule,
    RouterModule,
    FlexLayoutModule,
    OverlayModule,
    MatIconModule,
    CirrusMaterialModule,
    BadgeModule,
  ],
  declarations: [
    GlobalSideNavComponent,
    GlobalHeaderDropdownComponent,
    GlobalMenuSliderComponent,
    GlobalHamburgerMenuComponent,
    GlobalUserMenusComponent,
    GlobalHeaderComponent,
    GlobalFooterComponent,
  ],
  exports: [
    GlobalSideNavComponent,
    GlobalHeaderDropdownComponent,
    GlobalMenuSliderComponent,
    GlobalHamburgerMenuComponent,
    GlobalUserMenusComponent,
    GlobalHeaderComponent,
    GlobalFooterComponent,
  ],
})
export class SidenavHeaderModule {}
