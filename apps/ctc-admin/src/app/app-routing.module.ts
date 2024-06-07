import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActivityComponent } from './components/activity/activity.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { ClientsComponent } from './components/clients/clients.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

export const appRoutes: Route[] = [
  {
    path: 'ctc-admin',
    component: DashboardComponent,
  },
  {
    path: 'ctc-admin/profile-page',
    component: ProfilePageComponent,
  },
  {
    path: 'ctc-admin/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'ctc-admin/activity',
    component: ActivityComponent,
  },
  {
    path: 'ctc-admin/instructors',
    component: InstructorsComponent,
  },

  {
    path: 'ctc-admin/clients',
    component: ClientsComponent,
  },
  {
    path: 'ctc-admin/notifications',
    component: NotificationsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
