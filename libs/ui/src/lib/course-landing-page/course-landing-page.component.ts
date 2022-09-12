import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICourseOverview, ICoursePlayerConfig } from '@cirrus/models';
import { produceConfig } from './produce-config';
import { Breakpoints } from '@angular/cdk/layout';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from '../../../../../apps/courses/src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cirrus-course-landing-page',
  templateUrl: './course-landing-page.component.html',
  styleUrls: ['./course-landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseLandingPageComponent {
  coursePlayerConfig: ICoursePlayerConfig = {
    index: '',
    header: '',
    title: '',
    buttonText: 'Get Started',
    thumbnail: 'courses/images/lesson-thumbnail.png',
  };
  background = new BehaviorSubject({});

  private _course!: ICourseOverview;

  @Input()
  set course(value: ICourseOverview) {
    this._course = value;
    this.coursePlayerConfig = produceConfig(value.next_lesson);
  }

  get course() {
    return this._course;
  }

  @Input()
  set size(value: string) {
    const uri =
      value === Breakpoints.XSmall
        ? this.course.mobile_hero_image_url || environment.defaultMobile
        : this.course.desktop_hero_image_url || environment.defaultDesktop;
    console.log(uri);
    this.background.next({
      ['background']: `linear-gradient(90deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.33) 44.11%, rgba(0, 0, 0, 0) 61.94%),
                  linear-gradient(360deg,#000000 1.79%,rgba(0,0,0,.24) 19.37%,rgba(0,0,0,0) 25%),
                  url(${encodeURI(uri)}) no-repeat center`,
      ['background-size']: 'cover',
      ['-webkit-background-size']: 'cover',
      ['-moz-background-size']: 'cover',
      ['-o-background-size']: 'cover',
    });
  }

  constructor(private router: Router) {}

  navigateToCourses() {
    this.router.navigate([`/my-courses`]);
  }

  navigateToNextLesson() {
    this.router.navigate([
      `/courses/${this._course.id}/stages/${this._course.next_lesson.stage_id}/lessons/${this._course.next_lesson.id}`,
    ]);
  }
}
