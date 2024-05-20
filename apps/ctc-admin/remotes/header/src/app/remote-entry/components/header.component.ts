import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileMenuComponent } from './user-profile-menu/user-profile-menu.component';

@Component({
  selector: 'ctc-admin-header',
  standalone: true,
  imports: [CommonModule, UserProfileMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
