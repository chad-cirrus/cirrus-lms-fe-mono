import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IacraStat } from '../../../models/IRecentActivity';
import {
  selectIsScreenSmall,
  selectIsScreenTablet,
} from '../../../store/selectors/view.selector';

@Component({
  selector: 'cirrus-iacra',
  templateUrl: './iacra.component.html',
  styleUrls: ['./iacra.component.scss'],
})
export class IACRAComponent {
  mobile$ = this.store.select(selectIsScreenSmall);
  tablet$ = this.store.select(selectIsScreenTablet);

  constructor(private store: Store) {}

  @Input() iacraStats!: IacraStat[];
}
