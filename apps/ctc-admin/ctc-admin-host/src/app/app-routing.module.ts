import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
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

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
