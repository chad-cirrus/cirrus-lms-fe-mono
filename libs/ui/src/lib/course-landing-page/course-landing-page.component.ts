import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICourseOveview, ICoursePlayerConfig } from '@cirrus/models';
import { produceConfig } from './produce-config';

@Component({
  selector: 'cirrus-course-landing-page',
  templateUrl: './course-landing-page.component.html',
  styleUrls: ['./course-landing-page.component.scss'],
})
export class CourseLandingPageComponent {
  coursePlayerConfig: ICoursePlayerConfig = {
    index: '',
    header: '',
    title: '',
    buttonText: 'Get Started',
    thumbnail: 'courses/images/lesson-thumbnail.png',
  };

  private _course!: ICourseOveview;

  @Input()
  set course(value: ICourseOveview) {
    this._course = value;
    this.coursePlayerConfig = produceConfig(value.next_lesson);
  }

  get course() {
    return this._course;
  }

  @Input() size = 'desktop';
  defaultMobile =
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-mobile.jpg';
  defaultDesktop =
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-desktop.jpg';
  uri = this.size === 'desktop' ? this.defaultDesktop : this.defaultMobile;
  background = {
    ['background']: `linear-gradient(90deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.33) 44.11%, rgba(0, 0, 0, 0) 61.94%),
                  linear-gradient(360deg,#000000 1.79%,rgba(0,0,0,.24) 19.37%,rgba(0,0,0,0) 25%),
                  url(${encodeURI(this.uri)}) no-repeat center`,
    ['background-size']: 'cover',
    ['-webkit-background-size']: 'cover',
    ['-moz-background-size']: 'cover',
    ['-o-background-size']: 'cover',
  };

  constructor(private router: Router) {}

  navigateToCourses() {
    this.router.navigate([`/my-courses`]);
  }
}
