import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './components/profile-page.component';

@Component({
  standalone: true,
  imports: [CommonModule, ProfilePageComponent],
  selector: 'app-profile-page-entry',
  template: `<app-profile-page></app-profile-page>`,
})
export class RemoteEntryComponent {}
