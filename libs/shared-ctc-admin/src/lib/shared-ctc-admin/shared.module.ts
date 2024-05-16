import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserProfileMenuComponent } from './components/user-profile-menu/user-profile-menu.component';

@NgModule({
    declarations: [
      UserProfileMenuComponent
    ],
    exports: [
      UserProfileMenuComponent
    ],
    providers: [
    ],
    imports: [
      CommonModule
    ]
})

export class SharedCtcAdminModule {}
