import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ILesson } from '@cirrus/models';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { testData } from './testData';

@Component({
  selector: 'cirrus-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  courseId$ = this.route.params.pipe(map(params => params['courseId']));

  lesson$: Observable<ILesson> = of(testData.lesson);

  constructor(private route: ActivatedRoute) {}
}
