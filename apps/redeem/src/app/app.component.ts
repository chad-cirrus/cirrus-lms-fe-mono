import { Component, enableProdMode } from '@angular/core';
import { environment } from 'apps/redeem/src/environments/environment';

if (environment.production) {
  enableProdMode();
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'redeem';

  constructor() {}
}
