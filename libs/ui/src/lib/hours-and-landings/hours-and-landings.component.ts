import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { IHoursAndLandingsStat } from '@cirrus/models';

@Component({
  selector: 'cirrus-hours-and-landings',
  templateUrl: './hours-and-landings.component.html',
  styleUrls: ['./hours-and-landings.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoursAndLandingsComponent {
  @Input() stats!: IHoursAndLandingsStat[];
}
