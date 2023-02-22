import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'cirrus-total-flight-hours',
  templateUrl: './total-flight-hours.component.html',
  styleUrls: ['./total-flight-hours.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TotalFlightHoursComponent {
  @Input() hours!: number | null;
}
