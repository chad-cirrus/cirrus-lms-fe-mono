import { Component, Input } from '@angular/core';
import { FlightHours } from '../../../models/IRecentActivity';

@Component({
  selector: 'cirrus-total-flight-hours-instructor',
  templateUrl: './total-flight-hours-instructor.component.html',
  styleUrls: ['./total-flight-hours-instructor.component.scss'],
})
export class TotalFlightHoursInstructorComponent {
  @Input() instructorHours!: number | null;
  @Input() studentHours!: number | null;
}
