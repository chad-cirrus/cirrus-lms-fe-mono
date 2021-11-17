import { Component } from '@angular/core';
import { IConfig } from '@cirrus/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchConfig } from './store/actions';
import { selectConfigs } from './store/selectors/config.selectors';

@Component({
  selector: 'cirrus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'courses';
  config$: Observable<IConfig> = this.store.select(selectConfigs);

  constructor(private store: Store<{ config: any }>) {}

  ngOnInit() {
    this.store.dispatch(fetchConfig());
  }
}
