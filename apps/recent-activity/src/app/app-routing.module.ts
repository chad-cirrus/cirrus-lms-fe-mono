import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecentActivityComponent } from './components/recent-activity/recent-activity.component';

const routes: Routes = [
  { path: 'recent', component: RecentActivityComponent },
  { path: '', redirectTo: 'recent', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
