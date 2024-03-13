/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'apps/courses/src/environments/environment';
import { LessonContentComponent } from 'libs/ui/src/lib/LessonContentComponent';
import { MediaServerService } from '../../../media.service';
import { ScormAPI } from './scorm-api';
import { filter, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { CoursesFacadeService } from '../../../courses-facade.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import { selectCourseOverview } from '../../../store/selectors/course.selector';

@Component({
  selector: 'cirrus-scorm',
  templateUrl: './scorm.component.html',
  styleUrls: ['./scorm.component.scss'],
})
export class ScormComponent
  extends LessonContentComponent
  implements AfterViewInit
{
  @ViewChild('frame') frame: any;
  @ViewChild('wrapper', { static: true }) wrapper: any;
  url: SafeResourceUrl | null = null;
  api: any;
  loading = false;
  loadingSubject = new BehaviorSubject(false);
  courseTitle!: string;
  courseTitle$ = this.store.select(selectCourseOverview).pipe(
    tap(course => this.courseTitle = course.title)
  ).subscribe();

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private mediaServerService: MediaServerService,
    private facadeService: CoursesFacadeService,
    private store: Store<AppState>
  ) {
    super();
  }

  // override base ngOnInit and ngOnDestroy
  ngOnInit() {
    super.ngOnInit();

    this.api = new ScormAPI(
      this.content.progress,
      this.updateProgress,
      this.hidePrevAndNext,
      this.mediaServerService,
      this.facadeService,
      this.lessonTitle,
      this.courseTitle,
      this.content
    );

    this.loadingSubject.subscribe(isLoading => {
      this.loading = isLoading;
    });
  }

  ngOnDestroy() {
    this.hidePrevAndNext.next(false);
  }

  ngAfterViewInit() {
    this.loadingSubject.next(true);
    const { blob_directory } = this.content || '';
    this.mediaServerService
      .scormStartingUrl(blob_directory)
      .pipe(filter(url => url !== undefined && url !== null))
      .subscribe(
        url => {
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
            `${environment.baseUrl}/${url.toString()}`
          );
          window['API' as keyof object] = this.api;
          this.loadingSubject.next(false);
          this.hidePrevAndNext.emit(true);
        },
        error => {
          console.log(error);
          this.loadingSubject.next(false);
        }
      );
  }
}
