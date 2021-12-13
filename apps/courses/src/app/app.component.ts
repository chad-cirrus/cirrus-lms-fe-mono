import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IConfig } from '@cirrus/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { fetchConfig } from './store/actions';
import { AppState } from './store/reducers';
import { selectConfigs } from './store/selectors/config.selectors';
import { selectLessonStateBusy } from './store/selectors/lessons.selector';

@Component({
  selector: 'cirrus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'courses';
  config$: Observable<IConfig> = this.store.select(selectConfigs);
  lessonStateBusy$ = this.store.select(selectLessonStateBusy).pipe(delay(1));

  lessons = [
    'lesson 1',
    'lesson 2',
    'lesson 3',
    'lesson 4',
    'lesson 5',
    'lesson 6',
  ];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(fetchConfig());
  }
}
