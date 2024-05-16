import { Route } from '@angular/router';
import { ShellContainerComponent } from './components/shell-container.component';

export const appRoutes: Route[] = [
  {
    path: 'profile-page',
    loadChildren: () => import('profile-page/Routes').then(m => m.remoteRoutes),
  },
  {
    path: '',
    component: ShellContainerComponent
  },
];
