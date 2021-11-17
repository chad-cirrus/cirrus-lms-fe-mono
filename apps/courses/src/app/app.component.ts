import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchConfig } from './store/actions';

@Component({
  selector: 'cirrus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'courses';

  constructor(private store: Store<{ config: any }>) {}

  ngOnInit() {
    this.store.dispatch(fetchConfig());
  }
}
