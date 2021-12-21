import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILesson, IPlayListItem } from '@cirrus/models';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoursesDialogService } from '../../dialog-service/cirrus-dialog.service';
import { fetchLessons } from '../../store/actions';
import { LessonState } from '../../store/reducers/lesson.reducer';
import { selectLesson } from '../../store/selectors/lessons.selector';

@Component({
  selector: 'cirrus-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit, OnDestroy {
  lesson$: Observable<ILesson> = this.store.select(selectLesson);
  lessonSubscripton = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store<LessonState>,
    private coursesDialog: CoursesDialogService
  ) {}

  ngOnInit() {
    this.lessonSubscripton.add(
      this.route.params
        .pipe(map(params => params['lessonId']))
        .subscribe(lessonId => {
          console.log('lesson id', lessonId);
          this.store.dispatch(fetchLessons({ lessonId }));
        })
    );
  }

  ngOnDestroy(): void {
    this.lessonSubscripton.unsubscribe();
  }

  fetchMedia(item: IPlayListItem) {
    const trimmedUrl = item.url?.trim();
    if (typeof trimmedUrl != 'undefined' && trimmedUrl && trimmedUrl.length) {
      this.coursesDialog
        .displayMediaContent(item)
        .afterClosed()
        .subscribe(() => console.log('callback goes here'));
    }
  }
}
