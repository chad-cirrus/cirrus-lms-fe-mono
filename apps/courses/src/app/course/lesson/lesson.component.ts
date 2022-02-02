import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILesson, IVideoMediaItem } from '@cirrus/models';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CoursesDialogService } from '../../dialog-service/cirrus-dialog.service';
import { fetchLessons } from '../../store/actions';
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
  lesson$: Observable<ILesson> = this.store.select(selectLesson);
  instructorView$: Observable<boolean> =
    this.store.select(selectInstructorView);
  sideNavOpen$: Observable<boolean> = this.store.select(selectSideNavOpen);
  lessonSubscripton = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store<LessonState>,
    private coursesDialog: CoursesDialogService
  ) {}

  ngOnInit() {
    this.instructorView$.subscribe(console.log);

    this.lessonSubscripton.add(
      this.route.params.subscribe(({ courseId, lessonId }) => {
        this.store.dispatch(fetchLessons({ courseId, lessonId }));
      })
    );
  }

  ngOnDestroy(): void {
    this.lessonSubscripton.unsubscribe();
  }

  fetchMedia(item: IVideoMediaItem) {
    const trimmedUrl = item.url?.trim();

    console.log(this.store);

    if (typeof trimmedUrl != 'undefined' && trimmedUrl && trimmedUrl.length) {
      this.store
        .select(selectInstructorView)
        .pipe(
          take(1),
          switchMap(view => {
            console.log('view', view);
            return this.coursesDialog.displayMediaContent(item).afterClosed();
          })
        )
        .subscribe(() => console.log('callback goes here'));
    }
  }
}
