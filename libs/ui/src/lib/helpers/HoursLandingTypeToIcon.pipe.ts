import { Pipe, PipeTransform } from '@angular/core';
import { HoursAndLandingStatType } from '@cirrus/models';

@Pipe({ name: 'hoursLandingTypeToIcon' })
export class HoursLandingTypeToIconPipe implements PipeTransform {
  transform(value: any): string {
    const dictionary: { [key: string]: string } = {
      [HoursAndLandingStatType.completed_total_hours]: 'flight_hrs',
      [HoursAndLandingStatType.completed_ground_instruction_hours]:
        'ground_hrs',
      [HoursAndLandingStatType.completed_sim_hours]: 'sim_hrs',
      [HoursAndLandingStatType.completed_cross_country_hours]:
        'cross_country_hrs',
      [HoursAndLandingStatType.completed_total_landings]: 'landings',
    };

    return dictionary[value];
  }
}
