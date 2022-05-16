import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { IContent, ILesson } from '@cirrus/models';
import { Store } from '@ngrx/store';

import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

import { ContentPlayerDialogService } from '../../content-player/content-player-dialog.service';
import { fetchLessons, setSideNavOpen } from '../../store/actions';
import { LessonState } from '../../store/reducers/lesson.reducer';
import { selectLessonWithContentEntities } from '../../store/selectors/lessons.selector';
import {
  selectInstructorView,
  selectIsScreenSmall,
  selectSideNavOpen,
} from '../../store/selectors/view.selector';
import { selectWorkbook } from '../../store/selectors/workbook-routes.selector';
import { TaskService } from '../../task.service';

@Component({
  selector: 'cirrus-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit, OnDestroy {
  private _lesson!: ILesson;
  stage_id: any;
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
  lessonId!: number;
  @ViewChild('snav') sidenav!: MatSidenav;

  constructor(
    private route: ActivatedRoute,
    private store: Store<LessonState>,
    private contentPlayerDialogService: ContentPlayerDialogService,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.lessonSubscription.add(
      this.route.params.subscribe(({ courseId, lessonId }) => {
        this.lessonId = parseInt(lessonId);
        this.store.dispatch(fetchLessons({ courseId, lessonId }));
      })
    );
  }

  ngOnDestroy(): void {
    this.lessonSubscription.unsubscribe();
  }

  fetchMedia(content: IContent) {
    if (content.content_type === 9 || content.content_type === 10) {
      const { course_attempt_id, stage_id, course_id } = this._lesson;
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

  openSideNav() {
    this.store.dispatch(setSideNavOpen({ sideNavOpen: true }));
    this.sidenav.toggle();
  }

  close() {
    this.store.dispatch(setSideNavOpen({ sideNavOpen: false }));
    this.sidenav.toggle();
  }

  navigate(payload: any) {
    this.sidenav.close();
    this.store.dispatch(setSideNavOpen({ sideNavOpen: false }));
    const { course, lesson } = payload;
    this.router.navigate([`/courses/${course.id}/lessons/${lesson.id}`]);
  }
}
