import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayModule } from '@angular/cdk/overlay';
import { ICirrusUser } from '@cirrus/models';
import { FeatureFlagService, NameToInitialsPipe } from '@cirrus/ui';
import { MockComponent } from 'ng-mocks';
import { GlobalHeaderDropdownComponent } from '../global-header-dropdown/global-header-dropdown.component';
import { GlobalUserMenusComponent } from './global-user-menus.component';
import { of } from 'rxjs';

class MockFeatureFlagService {
  isFeatureEnabled() {
    return of(false);
  }
}


describe('GlobalUserMenusComponent', () => {
  let component: GlobalUserMenusComponent;
  let fixture: ComponentFixture<GlobalUserMenusComponent>;
  const environment: Record<string, unknown> = {};
  const user: ICirrusUser = {
    authentication_token: '',
    ctc_admin: false,
    deactivated: false,
    email: '',
    firstname: '',
    full_sfid: '',
    id: 0,
    lastname: '',
    name: '',
    role: '',
    salesforce_id: '',
    sf_lms_role: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalUserMenusComponent, MockComponent(GlobalHeaderDropdownComponent), NameToInitialsPipe],
      providers: [
        { provide: 'environment', useValue: environment },
        { provide: FeatureFlagService, useClass: MockFeatureFlagService },
      ],
      imports: [OverlayModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalUserMenusComponent);
    component = fixture.componentInstance;
    component.cirrusUser = user;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
