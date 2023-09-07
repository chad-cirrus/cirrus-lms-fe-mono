import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentStudentsComponent } from './recent-students.component';
import { SidenavHeaderService } from '@cirrus/sidenav-header';
import { RecentActivityFacade } from '../../recent-activity-facade.service';
import { of } from 'rxjs';

class MockSideNavHeaderService {}

class MockRecentActivityFacade {
  isFeatureFlagEnabled(featureName: string) {
    return of(true)
  }
}

jest.mock('swiper', () => ({
  Swiper: { use() {} },
  Navigation: () => null,
  Pagination: () => null,
}));

describe('RecentStudentsComponent', () => {
  let component: RecentStudentsComponent;
  let fixture: ComponentFixture<RecentStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentStudentsComponent],
      providers: [
        {provide: SidenavHeaderService, useClass: MockSideNavHeaderService},
        {provide: RecentActivityFacade, useClass: MockRecentActivityFacade}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
