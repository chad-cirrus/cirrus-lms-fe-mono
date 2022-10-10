import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RecentActivityFacade } from '../../facade.service';
import { Observable } from 'rxjs';
import { Achievements } from '../../models/IRecentActivity';

@Component({
  selector: 'cirrus-achievements-page',
  templateUrl: './achievements-page.component.html',
  styleUrls: ['./achievements-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AchievementsPageComponent implements OnInit {
  achievements$!: Observable<Achievements>;

  constructor(private facade: RecentActivityFacade) {}

  ngOnInit(): void {
    this.facade.getRecentActivityPayload();
    this.achievements$ = this.facade.achievements$;
  }
}
