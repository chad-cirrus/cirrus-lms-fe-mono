import { ComponentType } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IContent,
  ICourseOverview,
  ICourseOverviewLesson,
  ILesson,
  PROGRESS_STATUS,
} from '@cirrus/models';
import {
  CompletionDialogComponent,
  CourseCompletionComponent,
  LESSON_COMPLETION_CTA,
} from '@cirrus/ui';
import { select, Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { AppService } from '../../app.service';

import { ContentPlayerDialogService } from '../../content-player/content-player-dialog.service';
import { fetchLessons, setSideNavOpen } from '../../store/actions';
import { LessonState } from '../../store/reducers/lesson.reducer';
import { selectCirrusUser } from '../../store/selectors/cirrus-user.selector';
import {
  selectCheckOffRequired,
  selectLesson,
} from '../../store/selectors/lessons.selector';
import {
  selectInstructorView,
  selectIsScreenSmall,
  selectSideNavOpen,
} from '../../store/selectors/view.selector';
import { CoursesService } from '../course.service';
import { environment } from '../../../environments/environment';
import { fetchCourseOverview } from '../../store/actions/course.actions';
import {
  selectCourseOverview,
  selectNextLessonPath,
} from '../../store/selectors/course.selector';

@Component({
  selector: 'cirrus-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit, OnDestroy {
  private _lesson!: ILesson;
  stage_id!: number;
  checkoutOffsRequired$ = this.store.pipe(select(selectCheckOffRequired));
  lesson$: Observable<ILesson> = this.store.select(selectLesson).pipe(
    tap(lesson => {
      this._lesson = lesson;
    })
  );
  instructorView$: Observable<boolean> =
    this.store.select(selectInstructorView);
  isScreenSmall$: Observable<boolean> = this.store.select(selectIsScreenSmall);
  sideNavOpen$: Observable<boolean> = this.store.select(selectSideNavOpen);
  lessonSubscription = new Subscription();

  courseOverview$ = this.store.select(selectCourseOverview);
  stages$ = this.courseOverview$.pipe(map(overview => overview.stages));

  coursId!: number;
  lessonId!: number;
  @ViewChild('snav') sidenav!: MatSidenav;
  lessonCompleted$!: Observable<string>;
  defaultMobile = environment.defaultMobileLesson;
  defaultDesktop = environment.defaultDesktopLesson;

  nextLesson$ = this.store.select(selectNextLessonPath);

  constructor(
    private route: ActivatedRoute,
    private store: Store<LessonState>,
    private contentPlayerDialogService: ContentPlayerDialogService,
    private router: Router,
    private courseService: CoursesService,
    private dialog: MatDialog,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.nextLesson$.subscribe(path => {
      console.log('Next lesson path', path);
    });

    this.lessonSubscription.add(
      this.route.params.subscribe(({ courseId, stageId, lessonId }) => {
        this.coursId = parseInt(courseId);
        this.lessonId = parseInt(lessonId);
        this.store.dispatch(fetchLessons({ courseId, stageId, lessonId }));
        this.store.dispatch(fetchCourseOverview({ courseId }));
      })
    );

    this.lessonCompleted$ = this.courseService.lessonComplete$;

    this.lessonSubscription.add(
      this.lessonCompleted$
        .pipe(
          withLatestFrom(
            this.courseOverview$,
            this.store.select(selectCirrusUser),
            this.lesson$
          )
        )
        .subscribe(([progress_type, courseOverview, user, lesson]) => {
          const component: ComponentType<
            CompletionDialogComponent | CourseCompletionComponent
          > =
            progress_type === 'lesson'
              ? CompletionDialogComponent
              : CourseCompletionComponent;
          const data =
            progress_type === 'lesson'
              ? {
                  lesson: this._lesson.title,
                }
              : {
                  badge: courseOverview?.badge_image
                    ? courseOverview?.badge_image
                    : 'courses/images/svg/AvionicsCourse2.svg',
                  course: courseOverview.name,
                  student: user.name,
                  course_attempt_id: this._lesson.course_attempt_id,
                };

          const showCompletionDialog =
            progress_type === 'lesson'
              ? lesson.progress.status !== PROGRESS_STATUS.completed
              : courseOverview.progress.status !== PROGRESS_STATUS.completed;

          if (showCompletionDialog) {
            this.dialog
              .open(component, {
                data,
                panelClass: 'fullscreen-dialog',
                height: '100%',
                width: '100%',
              })
              .afterClosed()
              .pipe(withLatestFrom(this.nextLesson$))
              .subscribe(([response, nextLesson]) => {
                if (response === LESSON_COMPLETION_CTA.nextLesson) {
                  this.router.navigate([nextLesson]);
                } else {
                  console.log('none of the above');
                }
                this.dialog.closeAll();
              });
          }
        })
    );
  }

  downloadPdf(pdf: Blob) {
    const file = new Blob([pdf], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = fileURL;
    a.target = '_blank';
    a.download = 'cirrus-certificate.pdf';
    document.body.appendChild(a);
    a.click();
  }

  ngOnDestroy(): void {
    this.lessonSubscription.unsubscribe();
  }

  displayOverview(overview: string) {
    this.contentPlayerDialogService.displayContentPlayerBComponent(0, overview);
  }

  fetchMediaForIntroVideo(content: IContent) {
    this.contentPlayerDialogService.displayContentPlayerBComponent(
      content.id,
      '',
      true,
      content
    );
  }

  fetchMedia(content: IContent) {
    this.contentPlayerDialogService.displayContentPlayerBComponent(content.id);
  }

  playNextLessonContent() {
    this.nextLesson$.subscribe(nextLesson =>
      this.router.navigate([nextLesson])
    );
  }

  openSideNav() {
    this.store.dispatch(setSideNavOpen({ sideNavOpen: true }));
    this.sidenav.toggle();
  }

  close() {
    this.store.dispatch(setSideNavOpen({ sideNavOpen: false }));
    this.sidenav.toggle();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigate(payload: {
    lesson: ICourseOverviewLesson;
    course: ICourseOverview;
  }) {
    this.sidenav.close();
    this.store.dispatch(setSideNavOpen({ sideNavOpen: false }));
    const { course, lesson } = payload;
    this.router.navigate([
      `/courses/${course.id}/stages/${lesson.stage_id}/lessons/${lesson.id}`,
    ]);
  }
  scrollToTop() {
    this.appService.scrollTrigger$.next(true);
  }
}
