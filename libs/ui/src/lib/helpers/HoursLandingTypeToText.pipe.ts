import { Pipe, PipeTransform } from '@angular/core';
import { HoursAndLandingStatType } from '@cirrus/models';

@Pipe({ name: 'hoursLandingTypeToText' })
export class HoursLandingTypeToTextPipe implements PipeTransform {
  transform(value: any): string {
    const dictionary: { [key: string]: string } = {
      [HoursAndLandingStatType.completed_total_hours]: 'Flight Hrs',
      [HoursAndLandingStatType.completed_ground_instruction_hours]:
        'Ground Hrs',
      [HoursAndLandingStatType.completed_sim_hours]: 'Simulator Hrs',
      [HoursAndLandingStatType.completed_cross_country_hours]:
        'Cross Country Hrs',
      [HoursAndLandingStatType.completed_total_landings]: 'Landings',
    };

    return dictionary[value];
  }
}
