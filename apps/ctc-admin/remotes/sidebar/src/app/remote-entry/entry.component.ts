import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CtcAdminSidebarComponent } from './components/ctc-admin-sidebar.component';

@Component({
  standalone: true,
  imports: [CommonModule, CtcAdminSidebarComponent],
  selector: 'app-sidebar-entry',
  template: `<ctc-admin-sidebar></ctc-admin-sidebar>`,
})
export class RemoteEntryComponent {}
