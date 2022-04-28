import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CONTENT_TYPE, IContent, ILesson, IPlayListItem } from '@cirrus/models';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { CoursesDialogService } from '../../dialog-service/cirrus-dialog.service';
import { fetchLessons, setSideNavOpen } from '../../store/actions';
import { LessonState } from '../../store/reducers/lesson.reducer';
import { selectLesson } from '../../store/selectors/lessons.selector';
import {
  selectInstructorView,
  selectSideNavOpen,
} from '../../store/selectors/view.selector';

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
  sideNavOpen$: Observable<boolean> = this.store.select(selectSideNavOpen);
  lessonSubscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store<LessonState>,
    private coursesDialog: CoursesDialogService
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
    console.log(content, this._lesson);

    this.coursesDialog.displayContentPlayerComponent(this._lesson, content);

    // this.coursesDialog
    //   .displayMediaContent(content)
    //   .afterClosed()
    //   .subscribe(() => console.log('closed'));

    // if (content.content_type === CONTENT_TYPE.vimeo) {
    //   this.fetchVimeo(content);
    // } else {
    //   this.fetchUnknownMedia(content);
    // }
  }

  fetchUnknownMedia(content: IContent) {
    this.coursesDialog.displayUnknownMedia(content).subscribe(console.log);
  }

  fetchScorm(content: IContent) {
    this.lesson$.pipe(take(1)).subscribe(lesson => {
      console.log(lesson);
      this.coursesDialog
        .displayContentPlayerComponent(lesson, content)
        .afterClosed()
        .subscribe(() => console.log('scorm is closed'));
    });
  }

  fetchVimeo(content: IContent) {
    const trimmedUrl = content.url?.trim();

    if (typeof trimmedUrl != 'undefined' && trimmedUrl && trimmedUrl.length) {
      this.store
        .select(selectInstructorView)
        .pipe(
          take(1),
          switchMap(view => {
            console.log('view', view); // todo: switch videos based on instructor view
            return this.coursesDialog
              .displayMediaContent(content)
              .afterClosed();
          })
        )
        .subscribe(() => console.log('callback goes here'));
    }
  }

  openSideNav() {
    this.store.dispatch(setSideNavOpen({ sideNavOpen: true }));
  }
}
