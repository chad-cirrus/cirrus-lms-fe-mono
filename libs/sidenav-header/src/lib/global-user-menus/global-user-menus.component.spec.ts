import { ComponentFixture, TestBed } from '@angular/core/testing';
import { jest } from '@jest/globals';
import { OverlayModule } from '@angular/cdk/overlay';
import { ICirrusUser } from '@cirrus/models';
import { FeatureFlagService, NameToInitialsPipe } from '@cirrus/ui';
import { MockComponent } from 'ng-mocks';
import { GlobalHeaderDropdownComponent } from '../global-header-dropdown/global-header-dropdown.component';
import { GlobalUserMenusComponent } from './global-user-menus.component';
import { of } from 'rxjs';

class MockFeatureFlagService {
  isFeatureEnabled(feature: string) {
    return of(true);
  }
}


describe('GlobalUserMenusComponent', () => {
  let component: GlobalUserMenusComponent;
  let fixture: ComponentFixture<GlobalUserMenusComponent>;
  const environment: Record<string, unknown> = {};
  const user: ICirrusUser = {
    authentication_token: '',
    ctc_admin: true,
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
    fixture = TestBed.createComponent(GlobalUserMenusComponent); // Initialize the fixture variable
    component = fixture.componentInstance;
    component.cirrusUser = user;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component', () => {
    // Arrange
    const mockIsFeatureEnabled = jest
      .spyOn(MockFeatureFlagService.prototype, 'isFeatureEnabled')
      .mockReturnValue(of(true));
    const isEnabled2024 = true;
    const isEnabledAdmin = true;
    const cirrusUser: ICirrusUser = {
      authentication_token: '',
      ctc_admin: true,
      deactivated: false,
      email: '',
      firstname: '',
      full_sfid: '',
      id: 1,
      lastname: '',
      name: '',
      role: '',
      salesforce_id: '',
      sf_lms_role: '',
    };
    mockIsFeatureEnabled.mockReturnValueOnce(of(isEnabled2024));
    mockIsFeatureEnabled.mockReturnValueOnce(of(isEnabledAdmin));

    // Act
    component.cirrusUser = cirrusUser;
    component.ngOnInit();

    // Assert
    expect(mockIsFeatureEnabled).toHaveBeenCalledTimes(2);
    expect(mockIsFeatureEnabled).toHaveBeenCalledWith('ctc_admin_2024');
    expect(mockIsFeatureEnabled).toHaveBeenCalledWith('ctc_admin');
    expect(component.ctcAdminFeatureFlag).toBe(isEnabledAdmin && cirrusUser.ctc_admin);
    expect(component.ctcAdmin2024FeatureFlag).toBe(isEnabled2024 && cirrusUser.ctc_admin);
  });


});
