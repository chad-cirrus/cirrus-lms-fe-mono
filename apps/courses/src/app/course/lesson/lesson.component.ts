import { ComponentType } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { IContent, ILesson } from '@cirrus/models';
import {
  CompletionDialogComponent,
  CourseCompletionComponent,
  LESSON_COMPLETION_CTA,
} from '@cirrus/ui';
import { select, Store } from '@ngrx/store';

import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, take, tap, withLatestFrom } from 'rxjs/operators';
import { AppService } from '../../app.service';

import { ContentPlayerDialogService } from '../../content-player/content-player-dialog.service';
import { findNextLesson } from '../../shared/find-next-lesson';
import { fetchLessons, setSideNavOpen } from '../../store/actions';
import { LessonState } from '../../store/reducers/lesson.reducer';
import { selectCirrusUser } from '../../store/selectors/cirrus-user.selector';
import { selectCheckOffRequired, selectLessonWithContentEntities } from '../../store/selectors/lessons.selector';
import {
  selectInstructorView,
  selectIsScreenSmall,
  selectSideNavOpen,
} from '../../store/selectors/view.selector';
import { selectWorkbook } from '../../store/selectors/workbook-routes.selector';
import { TaskService } from '../../task.service';
import { CoursesService } from '../course.service';
import { environment } from '../../../environments/environment';
import { DownloadService } from '../../download.service';

@Component({
  selector: 'cirrus-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit, OnDestroy {
  private _lesson!: ILesson;
  stage_id!: number;
  checkoutOffsRequired$ = this.store.pipe(select(selectCheckOffRequired));
  lesson$: Observable<ILesson> = this.store
    .select(selectLessonWithContentEntities)
    .pipe(tap(lesson => (this._lesson = lesson)));
  instructorView$: Observable<boolean> =
    this.store.select(selectInstructorView);
  isScreenSmall$: Observable<boolean> = this.store.select(selectIsScreenSmall);
  sideNavOpen$: Observable<boolean> = this.store.select(selectSideNavOpen);
  lessonSubscription = new Subscription();

  workbook$ = this.store
    .select(selectWorkbook)
    .pipe(filter(workbook => workbook.id !== 0));

  coursId!: number;
  lessonId!: number;
  @ViewChild('snav') sidenav!: MatSidenav;
  lessonCompleted$!: Observable<string>;
  defaultMobile = environment.defaultMobile;
  defaultDesktop = environment.defaultDesktop;

  constructor(
    private route: ActivatedRoute,
    private store: Store<LessonState>,
    private contentPlayerDialogService: ContentPlayerDialogService,
    private router: Router,
    private taskService: TaskService,
    private courseService: CoursesService,
    private dialog: MatDialog,
    private appService: AppService,
    private downloadService: DownloadService
  ) {}

  ngOnInit() {
    this.lessonSubscription.add(
      this.route.params.subscribe(({ courseId, lessonId }) => {
        this.coursId = parseInt(courseId);
        this.lessonId = parseInt(lessonId);
        this.store.dispatch(fetchLessons({ courseId, lessonId }));
      })
    );

    this.lessonCompleted$ = this.courseService.lessonComplete$;
    this.lessonSubscription.add(
      this.lessonCompleted$
        .pipe(
          withLatestFrom(this.workbook$, this.store.select(selectCirrusUser))
        )
        .subscribe(([progress_type, workbook, user]) => {
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
                  badge: 'courses/images/svg/AvionicsCourse2.svg',
                  course: workbook.name,
                  student: user.name,
                };

          this.dialog
            .open(component, {
              data,
              panelClass: 'fullscreen-dialog',
              height: '100%',
              width: '100%',
            })
            .afterClosed()
            .pipe(withLatestFrom(this.workbook$))
            .subscribe(([response, workbook]) => {
              if (response === LESSON_COMPLETION_CTA.nextLesson) {
                const nextLesson = findNextLesson(workbook);
                if (nextLesson > 0) {
                  this.router.navigate([
                    `/courses/${this.coursId}/lessons/${nextLesson}`,
                  ]);
                }
              } else if (
                response === LESSON_COMPLETION_CTA.downloadCertificate
              ) {
                this.downloadService.downloadCertificate(this._lesson.course_attempt_id).subscribe((data: Blob) => {
                  this.downloadPdf(data)
                })
              } else if (
                response === LESSON_COMPLETION_CTA.downloadTranscript
              ) {
                console.log('we will download transcript');
              } else {
                console.log('none of the above');
              }
            });
        })
    );
  }

  downloadPdf(pdf: Blob) {
    const file = new Blob([pdf], { type: 'application/pdf' })
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
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
    this.contentPlayerDialogService.displayContentPlayerComponent(
      this._lesson,
      0,
      undefined,
      undefined,
      undefined,
      overview
    );
  }

  fetchMediaForIntroVideo(content: IContent) {
    this.contentPlayerDialogService.displayContentPlayerComponent(
      this._lesson,
      content.id,
      undefined,
      undefined,
      content
    );
  }

  fetchMedia(content: IContent) {
    if (content.content_type === 9 || content.content_type === 10) {
      const { course_attempt_id, stage_id } = this._lesson;
      const payload = {
        course_attempt_id,
        content_id: content.id,
        lesson_id: this._lesson.id,
        stage_id,
      };
      const tasks$ = this.taskService.getTasks(payload);
      const logbook$ = this.taskService.getLogbook(payload);

      combineLatest([this.lesson$, tasks$, logbook$])
        .pipe(take(1))
        .subscribe(([lessons, tasks, logbook]) => {
          this.contentPlayerDialogService.displayContentPlayerComponent(
            lessons,
            content.id,
            tasks,
            logbook
          );
        });
    } else {
      this.contentPlayerDialogService.displayContentPlayerComponent(
        this._lesson,
        content.id
      );
    }
  }

  fetchScorm(content: IContent) {
    this.lesson$.pipe(take(1)).subscribe(lesson => {
      this.contentPlayerDialogService
        .displayContentPlayerComponent(lesson, content.id)
        .afterClosed()
        .subscribe(() => console.log('scorm is closed'));
    });
  }

  playNextLessonContent($event:any) {
   const nextLesson = findNextLesson($event)
   this.router.navigate([
    `/courses/${this.coursId}/lessons/${nextLesson}`
  ]);
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
  navigate(payload: any) {
    this.sidenav.close();
    this.store.dispatch(setSideNavOpen({ sideNavOpen: false }));
    const { course, lesson } = payload;
    this.router.navigate([`/courses/${course.id}/lessons/${lesson.id}`]);
  }
  scrollToTop() {
    this.appService.scrollTrigger$.next(true)
  }
}
