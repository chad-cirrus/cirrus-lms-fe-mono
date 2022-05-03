import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContent, ILesson } from '@cirrus/models';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ContentPlayerDialogService } from '../../content-player/content-player-dialog.service';
import { fetchLessons, setSideNavOpen } from '../../store/actions';
import { LessonState } from '../../store/reducers/lesson.reducer';
import { selectLesson } from '../../store/selectors/lessons.selector';
import {
  selectInstructorView,
  selectIsScreenSmall,
  selectSideNavOpen,
} from '../../store/selectors/view.selector';
import { selectWorkBookRoutes } from '../../store/selectors/workbook-routes.selector';

@Component({
  selector: 'cirrus-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit, OnDestroy {
  private _lesson!: ILesson;
  lesson$: Observable<ILesson> = this.store
    .select(selectLesson)
    .pipe(tap(lesson => (this._lesson = lesson)));
  instructorView$: Observable<boolean> =
    this.store.select(selectInstructorView);
  isScreenSmall$: Observable<boolean> = this.store.select(selectIsScreenSmall);
  sideNavOpen$: Observable<boolean> = this.store.select(selectSideNavOpen);
  lessonSubscription = new Subscription();
  workbook$: Observable<any> = this.store.select(selectWorkBookRoutes);

  constructor(
    private route: ActivatedRoute,
    private store: Store<LessonState>,
    private contentPlayerDialogService: ContentPlayerDialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.instructorView$.subscribe(console.log);

    this.lessonSubscription.add(
      this.route.params.subscribe(({ courseId, lessonId }) => {
        this.store.dispatch(fetchLessons({ courseId, lessonId }));
      })
    );
  }

  ngOnDestroy(): void {
    this.lessonSubscription.unsubscribe();
  }

  fetchMedia(content: IContent) {
    this.contentPlayerDialogService.displayContentPlayerComponent(
      this._lesson,
      content.id
    );
  }

  fetchScorm(content: IContent) {
    this.lesson$.pipe(take(1)).subscribe(lesson => {
      console.log(lesson);
      this.contentPlayerDialogService
        .displayContentPlayerComponent(lesson, content.id)
        .afterClosed()
        .subscribe(() => console.log('scorm is closed'));
    });
  }

  openSideNav() {
    this.store.dispatch(setSideNavOpen({ sideNavOpen: true }));
  }

  navigate(payload: any) {
    const { course, lesson } = payload;
    this.router.navigate([`/courses/${course.id}/lessons/${lesson.id}`]);
  }
}
