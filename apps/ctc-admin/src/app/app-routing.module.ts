import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ShellContainerComponent } from './components/shell-container.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

export const appRoutes: Route[] = [
  {
    path: 'ctc-admin',
    component: ShellContainerComponent,
  },
  {
    path: 'ctc-admin/profile-page',
    component: ProfilePageComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
