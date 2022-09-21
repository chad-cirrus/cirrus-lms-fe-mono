import { Component, Input } from '@angular/core';
import { IacraStat } from '../../../models/IRecentActivity';

@Component({
  selector: 'cirrus-iacra',
  templateUrl: './iacra.component.html',
  styleUrls: ['./iacra.component.scss'],
})
export class IACRAComponent {
  @Input() iacraStats!: IacraStat[];
}
