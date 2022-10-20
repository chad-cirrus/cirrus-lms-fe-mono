import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageFormatter',
})
export class ImageFormatterPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const myMap = new Map<string, string>([
      [
        'completed_total_hours',
        'recent-activity/images/svg/ground-hours-icon.svg',
      ],
      ['completed_sim_hours', 'recent-activity/images/svg/simulator_icon.svg'],
      [
        'completed_actual_instrument_hours',
        'recent-activity/images/svg/instrument-hours.svg',
      ],
      [
        'completed_ground_instruction_hours',
        'recent-activity/images/svg/ground-hours-icon.svg',
      ],
      [
        'completed_cross_country_hours',
        'recent-activity/images/svg/ground-hours-icon.svg',
      ],
      [
        'lesson',
        'recent-activity/images/svg/course-progress-lessons-completed.svg',
      ],
      [
        'flight_assessment',
        'recent-activity/images/svg/flight-assessments.svg',
      ],
      [
        'ground_assessment',
        'recent-activity/images/svg/ground-assessment-progress-icon.svg',
      ],
      ['course', 'recent-activity/images/svg/my-courses.svg'],
      ['scorm', 'recent-activity/images/svg/file-pen.svg'],

      [
        'completed_dual_received_hours',
        'recent-activity/images/svg/dual-received.svg',
      ],
      ['completed_solo_hours', 'recent-activity/images/svg/solo.svg'],
      [
        'completed_cross_country_hours',
        'recent-activity/images/svg/cross-country-solo.svg',
      ],
      ['completed_pic_hours', 'recent-activity/images/svg/pic.svg'],
      [
        'completed_night_takeoffs',
        'recent-activity/images/svg/night-takeoffs.svg',
      ],
      [
        'completed_night_landings',
        'recent-activity/images/svg/night-landings.svg',
      ],

      [
        'completed_total_hours',
        'recent-activity/images/svg/flight-hours-icon.svg',
      ],
      [
        'completed_cross_country_dual_hours',
        'recent-activity/images/svg/cross-country-dual.svg',
      ],
      [
        'completed_cross_country_pic_hours',
        'recent-activity/images/svg/cross-country-icon.svg',
      ],
      [
        'completed_night_dual_received_hours',
        'recent-activity/images/svg/completed-night-pic.svg',
      ],
      ['completed_night_pic_hours', 'recent-activity/images/svg/pic.svg'],
    ]);

    return myMap.get(value);
  }
}
