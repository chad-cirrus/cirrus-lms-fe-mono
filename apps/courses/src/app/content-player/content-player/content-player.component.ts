import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


import { IContent, IContentPlayerMenuItem, ILessonFlightLog, IProgress, ITask, ILesson, PROGRESS_STATUS } from '@cirrus/models';


import { LessonContentComponent } from '@cirrus/ui';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, forkJoin, Observable, of, Subscription } from 'rxjs';
import { PlaceholderDirective } from '../PlaceHolderDirective';
import { AppState } from '../../store/reducers';
import { selectCheckOffRequired, selectContentPlayerSubState } from '../../store/selectors/lessons.selector';
import { componentDictionary } from '../component-dictionary';
import { completeProgress, startProgress } from '../../store/actions';
import { selectIsScreenSmall } from '../../store/selectors/view.selector';
import { TaskService } from '../../task.service';
import { createComponent } from '@angular/compiler/src/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cirrus-content-player',
  templateUrl: './content-player.component.html',
  styleUrls: ['./content-player.component.scss'],
})
export class ContentPlayerComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  subState$ = this.store.pipe(select(selectContentPlayerSubState));
  private subscription = new Subscription();
  checkoutOffsRequired$ = this.store.pipe(
    select(selectCheckOffRequired)
  )
  menuIcon = 'courses/images/svg/LcpMenuIcon.svg';
  closeIcon = 'courses/images/svg/content-player-close.svg';
  private _menuOpen = new BehaviorSubject<boolean>(false);
  menuOpen$ = this._menuOpen.asObservable();
  menuItems!: IContentPlayerMenuItem[];
  contents!: IContent[];
  lesson!: ILesson;


  tasks: any;
  logbook: any;
  system_name!: string;

  lesson_title!: string;

  title!: string;
  id!: number;
  isScreenSmall$: Observable<boolean> = this.store.select(selectIsScreenSmall);
  addPadding = false;
  hideBtns = false;

  @ViewChild(PlaceholderDirective) vcref!: PlaceholderDirective;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
    },
    private store: Store<AppState>,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {

    this.tasks = this.data['tasks']
    this.logbook = this.data['logbook']
    this.lesson = this.data['lesson']


    this.subscription.add(
      this.subState$.subscribe(state => {
        (this.contents = state.contents),
          (this.menuItems = state.menuItems),
          (this.lesson_title = state.lesson_title),
          (this.title = state.contents.filter(
            c => c.id === this.data.id
          )[0].title);
      })
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.playContent(this.data.id);
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleMenu() {
    this._menuOpen.next(true);
  }

  handleCloseMenu() {
    this._menuOpen.next(false);
  }

  previousContent() {
    const previousIndex = this.menuItems.map(i => i.id).indexOf(this.id) - 1;
    if (previousIndex > -1) {
      this.playContent(this.menuItems[previousIndex].id);
    }
  }

  nextContent() {
    const nextIndex = this.menuItems.map(i => i.id).indexOf(this.id) + 1;
    if (nextIndex !== this.menuItems.length) {
      this.playContent(this.menuItems[nextIndex].id);
    }
  }

  getAssessment(content_id: number) {

      const { course_attempt_id, stage_id } = this.lesson;
      const payload = {
        course_attempt_id,
        content_id: content_id,
        lesson_id: this.lesson.id,
        stage_id,
      };
      const tasks$ = this.taskService.getTasks(payload)
      const logbook$ = this.taskService.getLogbook(payload)
      return forkJoin([tasks$, logbook$])

  }


  playContent(id: number) {
    this.vcref.ViewContainerRef.clear();
    let tasks: ITask[] = []
    let logbook: ILessonFlightLog[] = []
    this.addPadding = false;


    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const content = this.contents.find(c => c.id === id)!;
    this.addPadding = [9, 10].indexOf(content.content_type) < 0;

    if (content.content_type === 9 || content.content_type === 10) {
     const assessment = this.getAssessment(content.id);
     assessment.subscribe(data => {
      tasks = data[0];
      logbook = data[1];
      this.createComponent(id, content, tasks, logbook)
     })
    } else {
      this.createComponent(id, content, tasks, logbook)
    }
  }



  createComponent(id: number, content: IContent, tasks: ITask[], logbook: ILessonFlightLog[] ) {
    this.id = id;
    this.title = content.title;

    this.addPadding = [9, 10].indexOf(content.content_type) < 0;


    const lessonContentComponentRef =
      this.vcref.ViewContainerRef.createComponent(
        componentDictionary[content.content_type]
      );

    const component =
      lessonContentComponentRef.instance as LessonContentComponent;

      component.content = content;
      component.tasks = tasks;
      component.logbook = logbook
      component.hidePrevAndNext.subscribe(value => this.hideBtns = value);
    this.menuOpen$.subscribe(data => (component.menuOpen = data));
    component.updateProgress.subscribe(progress =>
      this.updateProgress(progress)
    );
  }

  updateProgress(progress: IProgress) {
    if (progress.status === PROGRESS_STATUS.in_progress) {
      this.store.dispatch(startProgress({ id: progress.id }));
    } else {
      this.store.dispatch(completeProgress({ id: progress.id }));
    }
  }
}
