import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header.component'

@Component({
  
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  selector: 'app-header-entry',
  template: `<ctc-admin-header></ctc-admin-header>`,
})
export class RemoteEntryComponent {}
