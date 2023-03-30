import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsPageComponent } from './achievements-page.component';
import { RecentActivityFacade } from '../../recent-activity-facade.service';
import { Achievements } from '../../models/IRecentActivity';
import { of } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { CertificatesFullComponent } from './certificates-full/certificates-full.component';
import { BadgesFullComponent } from './badges-full/badges-full.component';

describe('AchievementsPageComponent', () => {
  let component: AchievementsPageComponent;
  let fixture: ComponentFixture<AchievementsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTabsModule, NoopAnimationsModule],
      declarations: [AchievementsPageComponent, MockComponent(CertificatesFullComponent), MockComponent(BadgesFullComponent)],
      providers: [
        { provide: RecentActivityFacade, useClass: MockRecentActivityFacade },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockRecentActivityFacade {
  nullAchievements: Achievements = { badges: [], certificates: [] };
  getRecentActivityPayload(): void {}
  achievements$ = of(this.nullAchievements);
}
