import { Component, enableProdMode } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RedeemComponent } from './components/redeem.component';
import { environment } from '../environments/environment';

if (environment.production) {
  enableProdMode();
}

@Component({
  standalone: true,
  imports: [RedeemComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'redirector';

  constructor() {
    localStorage.setItem('cirrus-token', '-RbGUXN9KbpZKwyaR5Z1');
  }
}
