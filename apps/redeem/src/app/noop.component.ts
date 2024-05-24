import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noop.component.html',
  styleUrl: './noop.component.scss',
})
export class NoopComponent {}
