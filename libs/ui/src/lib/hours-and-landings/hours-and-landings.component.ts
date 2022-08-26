import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'cirrus-hours-and-landings',
  templateUrl: './hours-and-landings.component.html',
  styleUrls: ['./hours-and-landings.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoursAndLandingsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
