import { Component } from '@angular/core';

@Component({
  selector: 'cirrus-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  course = {
    title: 'Private Pilot License Course',
    subTitle: 'An Introductory subhead to the Private Pilot License course',
  };
}
