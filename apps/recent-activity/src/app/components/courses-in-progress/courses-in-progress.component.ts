import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { InProgressCourses } from '../../models/IRecentActivity';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { environment } from '../../../environments/environment';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'cirrus-courses-in-progress',
  templateUrl: './courses-in-progress.component.html',
  styleUrls: ['./courses-in-progress.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CoursesInProgressComponent implements OnInit {
  private _inProgressCourses: InProgressCourses[] = [];

  @Input()
  set inProgressCourses(value: InProgressCourses[]) {
    this._inProgressCourses = value.map(course => ({
      ...course,
      thumbnail_image_url: course.thumbnail_image_url
        ? course.thumbnail_image_url
        : environment.defaultLessonThumbnail,
    }));
  }

  get inProgressCourses() {
    return this._inProgressCourses;
  }

  @Output() navigateToCourse = new EventEmitter<number>();
  searchParameter = new FormControl();
  filteredCourses$: Observable<InProgressCourses[]> = of([]);

  ngOnInit() {
    this.filteredCourses$ = this.searchParameter.valueChanges.pipe(
      startWith(''),
      switchMap((param: string) => {
        return typeof param === 'string' &&
          param.trim().toLocaleLowerCase().length > 0
          ? of(
              this.inProgressCourses.filter(course =>
                course.name
                  .toLocaleLowerCase()
                  .includes(param && param.trim().toLocaleLowerCase())
              )
            )
          : of(this.inProgressCourses);
      })
    );
  }

  navigateTo({ option }: MatAutocompleteSelectedEvent) {
    const { id } = option.value as InProgressCourses;
    this.navigateToCourse.emit(id);
  }

  displayFn(course: InProgressCourses): string {
    return course && course.name ? course.name : '';
  }
}
