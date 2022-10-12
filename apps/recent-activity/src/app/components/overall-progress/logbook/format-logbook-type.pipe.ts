import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatLogbookType',
})
export class FormatLogbookTypePipe implements PipeTransform {
  transform(value: string) {
    const myMap = new Map<string, string>([
      ['completed_total_hours', 'Flight Hrs'],
      ['completed_sim_hours', 'Simulator Hrs'],
      ['completed_actual_instrument_hours', 'Instrument Hrs'],
      ['completed_ground_instruction_hours', 'Ground Hrs'],
      ['completed_cross_country_hours', 'Cross Country Hrs'],
    ]);

    return myMap.get(value);
  }
}
