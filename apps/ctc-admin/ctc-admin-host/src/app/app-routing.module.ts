import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ShellContainerComponent } from './components/shell-container.component';

export const appRoutes: Route[] = [
  {
    path: 'ctc-admin',
    component: ShellContainerComponent,
  },
  {
    path: 'ctc-admin/profile-page',
    loadChildren: () => import('profile-page/Routes').then(m => m.remoteRoutes)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
