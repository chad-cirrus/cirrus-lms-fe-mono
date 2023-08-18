import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSideNavComponent } from './global-side-nav.component';
import { ICirrusUser } from '@cirrus/models';
import { BadgeComponent } from '@cirrus/badge';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { SidenavHeaderService } from '../sidenav-header.service';

describe('GlobalSideNavComponent', () => {
  let component: GlobalSideNavComponent;
  let fixture: ComponentFixture<GlobalSideNavComponent>;
  const nullCirrusUser: ICirrusUser = {
    authentication_token: '',
    ctc_admin: false,
    deactivated: false,
    email: '',
    firstname: '',
    full_sfid: '',
    id: 0,
    lastname: '',
    name: '',
    role: 'pilot',
    salesforce_id: '',
    sf_lms_role: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalSideNavComponent, MockComponent(BadgeComponent)],
      providers: [
        { provide: SidenavHeaderService, useClass: MockSidenavHeaderService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSideNavComponent);
    component = fixture.componentInstance;
    component.cirrusUser = nullCirrusUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockSidenavHeaderService {
  isFeatureFlagEnabled() {
    return of(true);
  }
}
