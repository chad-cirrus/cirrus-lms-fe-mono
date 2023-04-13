import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogRef as MatDialogRef,
} from '@angular/material/dialog';
import {
  IContent,
  ILessonFlightLog,
  IProgress,
  ITask,
  PROGRESS_STATUS,
} from '@cirrus/models';
import { LessonContentComponent } from '@cirrus/ui';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import {
  delay,
  map,
  startWith,
  take,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { completeProgress, startProgress } from '../../store/actions';
import { AppState } from '../../store/reducers';
import {
  selectCheckOffRequired,
  selectLesson,
  selectMenuItems,
} from '../../store/selectors/lessons.selector';
import { TaskService } from '../../task.service';

import { componentDictionary } from '../component-dictionary';
import { IContentPlayerData } from '../content-player-dialog.service';
import { PlaceholderDirective } from '../PlaceHolderDirective';
import { CONTENT_PLAYER_ICONS } from './content-player-icons';
import { findNextContent, INextContentResponse } from './findNextContent';
import { selectIsScreenTabletOrSmaller } from '../../store/selectors/view.selector';

export interface INextContentRequest {
  type: string;
  id?: number;
}

@Component({
  selector: 'cirrus-content-player',
  templateUrl: './content-player.component.html',
  styleUrls: ['./content-player.component.scss'],
})
export class ContentPlayerComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  destroy$: Subject<boolean> = new Subject<boolean>();
  firstContentId = 0;
  menuItems$ = this.store.select(selectMenuItems);
  lesson$ = this.store
    .select(selectLesson)
    .pipe(tap(lesson => (this.lesson_title = lesson.title)));

  private _nextContentRequest = new Subject<INextContentRequest>();
  nextContentRequest$ = this._nextContentRequest.asObservable();

  private _currentId = new BehaviorSubject<number>(0);
  currentId$ = this._currentId.asObservable();

  private _currentContentType = new BehaviorSubject<string>('content_item');
  currentContentType$ = this._currentContentType.asObservable();

  checkoutOffsRequired$ = this.store.select(selectCheckOffRequired);

  showPreviousBtn$ = this.nextContentRequest$.pipe(
    startWith(true),
    withLatestFrom(this.currentId$, this.currentContentType$),
    map(([prev, id, content_type]) => {
      return id !== this.firstContentId && content_type === 'content_item';
    })
  );

  // mutatable props
  _hideBtns = new BehaviorSubject<boolean>(false);
  hideBtns$ = this._hideBtns.asObservable();
  addPadding = false;
  lesson_title = '';
  title = '';
  currentContentType = -1;
  //

  currentContentItem$: Observable<INextContentResponse> =
    this.nextContentRequest$.pipe(
      withLatestFrom(this.lesson$, this.menuItems$, this.currentId$),
      map(([contentRequest, lesson, menuItems, currentId]) => {
        return findNextContent(contentRequest, lesson, menuItems, currentId);
      }),
      tap(response => this._currentId.next(response.content?.id as number))
    );

  private _menuOpen = new BehaviorSubject<boolean>(false);
  menuOpen$ = this._menuOpen.asObservable();

  get icons() {
    return CONTENT_PLAYER_ICONS;
  }

  @ViewChild(PlaceholderDirective) vcref!: PlaceholderDirective;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IContentPlayerData,
    private store: Store<AppState>,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<ContentPlayerComponent>,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.menuItems$.pipe(take(1)).subscribe(item => {
      this.firstContentId = item[0].id;
    });

    combineLatest([
      this.currentContentItem$,
      this.taskService.tasksAndLogBooks$,
    ])
      .pipe(delay(0), takeUntil(this.destroy$))
      .subscribe(([{ content }, [tasks, logbook]]) => {
        if (content !== undefined) {
          this.vcref.ViewContainerRef.clear();
          this.addPadding = [9, 10].indexOf(content.content_type) < 0;
          this.currentContentType = content.content_type;
          this.title = content.title;
          this.createComponent(content, tasks, logbook);

          this.store
            .select(selectIsScreenTabletOrSmaller)
            .pipe(take(1))
            .subscribe(isScreenTabletOrSmaller => {
              if (isScreenTabletOrSmaller) {
                this.handleCloseMenu();
              }
            });
        } else {
          this.dialogRef.close();
        }
      });
  }

  ngAfterViewInit(): void {
    if (this.data.overview) {
      this.playOverview(this.data.overview);
    } else if (this.data.intro) {
      this.playIntroContent(this.data.content as IContent);
    } else {
      this._nextContentRequest.next({ type: 'initial', id: this.data.id });
    }
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  createComponent(
    content: IContent,
    tasks: ITask[],
    logbook: ILessonFlightLog[]
  ) {
    const lessonContentComponentRef =
      this.vcref.ViewContainerRef.createComponent(
        componentDictionary[content.content_type]
      );

    const component =
      lessonContentComponentRef.instance as LessonContentComponent;

    component.content = content;
    component.tasks = tasks;
    component.logbook = logbook;
    component.hidePrevAndNext.subscribe(value => {
      console.log('content player hiding', value);
      this._hideBtns.next(value);
      this.changeDetectorRef.detectChanges();
    });
    this.menuOpen$.subscribe(data => (component.menuOpen = data));
    component.updateProgress.subscribe(progress =>
      this.updateProgress(progress)
    );
  }

  playOverview(overview: string) {
    this.title = 'Overview';
    this._currentContentType.next('overview');
    const lessonContentComponentRef =
      this.vcref.ViewContainerRef.createComponent(componentDictionary[8]);

    const component =
      lessonContentComponentRef.instance as LessonContentComponent;
    component.overview = overview;
  }

  playIntroContent(content: IContent) {
    this._currentContentType.next('intro');
    this.addPadding = true;

    const lessonContentComponentRef =
      this.vcref.ViewContainerRef.createComponent(componentDictionary[0]);

    const component =
      lessonContentComponentRef.instance as LessonContentComponent;
    component.content = content;
  }

  handleSideNavSelect(contentId: number) {
    this._currentContentType.next('content_item');
    this._nextContentRequest.next({ type: 'initial', id: contentId });
  }

  handleCloseMenu() {
    this._menuOpen.next(false);
  }

  toggleMenu() {
    this._menuOpen.next(true);
  }

  previousContent() {
    this._nextContentRequest.next({ type: 'prev' });
  }

  nextContent() {
    this._currentContentType.next('content_item');
    this._nextContentRequest.next({ type: 'next' });
  }

  updateProgress(progress: IProgress) {
    this.lesson$.pipe(take(1)).subscribe(lesson => {
      const contentToBeUpdated = lesson.contents.filter(
        c => c.progress.id === progress.id
      )[0];
      const { content_type } = contentToBeUpdated;
      if ([9, 10].includes(content_type)) {
        return;
      }
      if (
        contentToBeUpdated &&
        contentToBeUpdated.progress &&
        contentToBeUpdated.progress.status !== 'completed'
      ) {
        if (progress.status === PROGRESS_STATUS.in_progress) {
          this.store.dispatch(
            startProgress({
              id: progress.id,
              courseId: lesson.course_id,
              stageId: lesson.stage_id,
              lessonId: lesson.id,
              assessment: [9, 10].includes(content_type),
            })
          );
        } else {
          this.store.dispatch(
            completeProgress({
              id: progress.id,
              courseId: lesson.course_id,
              stageId: lesson.stage_id,
              lessonId: lesson.id,
              progress,
              assessment: [9, 10].includes(content_type),
            })
          );
        }
      }
    });
  }
}
