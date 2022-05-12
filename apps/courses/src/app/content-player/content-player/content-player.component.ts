import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IContent, IContentPlayerMenuItem } from '@cirrus/models';
import { LessonContentComponent } from '@cirrus/ui';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PlaceholderDirective } from '../PlaceHolderDirective';
import { AppState } from '../../store/reducers';
import { selectContentPlayerSubState } from '../../store/selectors/lessons.selector';
import { componentDictionary } from '../component-dictionary';
import { selectIsScreenSmall } from '../../store/selectors/view.selector';

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

  menuIcon = 'courses/images/svg/LcpMenuIcon.svg';
  closeIcon = 'courses/images/svg/content-player-close.svg';
  private _menuOpen = new BehaviorSubject<boolean>(false);
  menuOpen$ = this._menuOpen.asObservable();
  menuItems!: IContentPlayerMenuItem[];
  contents!: IContent[];

  tasks: any;
  logbook: any;
  system_name!: string;

  lesson_title!: string;

  title!: string;
  id!: number;
  isScreenSmall$: Observable<boolean> = this.store.select(selectIsScreenSmall);
  addPadding = false;



  @ViewChild(PlaceholderDirective) vcref!: PlaceholderDirective;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
    },
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.tasks = this.data['tasks']
    this.logbook = this.data['logbook']
    this.subscription.add(
      this.subState$.subscribe(state => {
        (this.contents = state.contents),
          (this.menuItems = state.menuItems),
          (this.lesson_title = state.lesson_title),
          (this.title = state.contents.filter(
            c => c.id === this.data.id
          )[0].title);
          console.log('state', state)

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

  playContent(id: number) {
    this.addPadding = false;
    this.vcref.ViewContainerRef.clear();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const content = this.contents.find(c => c.id === id)!;
    this.id = id;
    this.title = content.title;
    this.addPadding = [9, 10].indexOf(content.content_type) < 0


    const lessonContentComponentRef =
      this.vcref.ViewContainerRef.createComponent(
        componentDictionary[content.content_type]
      );

    const component =
      lessonContentComponentRef.instance as LessonContentComponent;
    component.content = content;
    component.tasks = this.tasks
    component.logbook = this.logbook
    this.menuOpen$.subscribe(data => component.menuOpen = data)
  }
}
