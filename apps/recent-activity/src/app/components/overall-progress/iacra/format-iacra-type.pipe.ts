import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatIacraType',
})
export class FormatIacraTypePipe implements PipeTransform {
  transform(value: string) {
    const myMap = new Map<string, string>([
      ['completed_dual_received_hours', 'Dual Received'],
      ['completed_solo_hours', 'Solo'],
      ['completed_cross_country_hours', 'Cross Country Solo'],
      ['completed_pic_hours', 'PIC'],
      ['completed_night_takeoffs', 'Night Takeoffs'],
      ['completed_night_landings', 'Night Landings'],
      ['completed_actual_instrument_hours', 'Instrument Hours'],
      ['completed_total_hours', 'Flight Hours'],
      ['completed_cross_country_dual_hours', 'Cross Country Dual'],
      ['completed_cross_country_pic_hours', 'Cross Country PIC'],
      ['completed_night_dual_received_hours', 'Night Dual'],
      ['completed_night_pic_hours', 'Night PIC'],
    ]);

    return myMap.get(value);
  }
}
