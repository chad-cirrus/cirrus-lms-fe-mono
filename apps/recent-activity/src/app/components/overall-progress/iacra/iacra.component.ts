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

  public get formattedIacraStats(): IacraStat[] {
    if (!this.iacraStats) {
      return [];
    }
    
    return this.iacraStats.map((iacraStat) => ({
      ...iacraStat,
      completed: this.shouldConvertToFloat(iacraStat.type, iacraStat.completed)
        ? Number(iacraStat.completed).toFixed(1)
        : iacraStat.completed,
    }));
  }

  shouldConvertToFloat(statType: string, statValue: any): boolean {
    const chartValuesToNotFloat = ['completed_night_takeoffs', 'completed_night_landings'];
    return (typeof statValue === 'number' && !chartValuesToNotFloat.includes(statType));
  }
}
