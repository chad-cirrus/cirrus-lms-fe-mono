import { ComponentFixture, TestBed } from '@angular/core/testing';
import { jest } from '@jest/globals';
import { OverlayModule } from '@angular/cdk/overlay';
import { ICirrusUser } from '@cirrus/models';
import { FeatureFlagService, NameToInitialsPipe } from '@cirrus/ui';
import { MockComponent } from 'ng-mocks';
import { GlobalHeaderDropdownComponent } from '../global-header-dropdown/global-header-dropdown.component';
import { GlobalUserMenusComponent } from './global-user-menus.component';
import { Observable, of } from 'rxjs';

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
    fixture = TestBed.createComponent(GlobalUserMenusComponent); // Initialize the fixture variable
    component = fixture.componentInstance;
    component.cirrusUser = user;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show new CTC link if feature flag is enabled and user is CTC admin', () => {
    // Arrange
    const featureFlagServiceSpy = jest.spyOn(MockFeatureFlagService.prototype, 'isFeatureEnabled').mockReturnValue(of(true));
    component.cirrusUser = { ...user, ctc_admin: true };

    // Act
    const result: Observable<boolean> = of(component.shouldShowNewCTCLink());

    // Assert
    result.subscribe(value => {
      expect(value).toBeTruthy();
      expect(featureFlagServiceSpy).toHaveBeenCalledWith('ctc_admin_2024');
    });
  });

  it('should NOT show new CTC link if feature flag is disabled and user is CTC admin', () => {
    // Arrange
    const featureFlagServiceSpy = jest
      .spyOn(MockFeatureFlagService.prototype, 'isFeatureEnabled')
      .mockReturnValue(of(false));
    component.cirrusUser = { ...user, ctc_admin: true };

    // Act
    const result: Observable<boolean> = of(component.shouldShowNewCTCLink());

    // Assert
    result.subscribe(value => {
      expect(value).toBeFalsy();
      expect(featureFlagServiceSpy).toHaveBeenCalledWith('jibberish');
    });
  });

  it('should NOT show new CTC link if feature flag is enabled but user is NOT CTC admin', () => {
    // Arrange
    const featureFlagServiceSpy = jest
      .spyOn(MockFeatureFlagService.prototype, 'isFeatureEnabled')
      .mockReturnValue(of(false));
    component.cirrusUser = { ...user, ctc_admin: false };

    // Act
    const result: Observable<boolean> = of(component.shouldShowNewCTCLink());

    // Assert
    result.subscribe(value => {
      expect(value).toBeFalsy();
      expect(featureFlagServiceSpy).toHaveBeenCalledWith('ctc_admin_2024');
    });
  });

  it('should show CTC admin link if feature flag is enabled and user is CTC admin', () => {
    // Arrange
    const featureFlagServiceSpy = jest
      .spyOn(MockFeatureFlagService.prototype, 'isFeatureEnabled')
      .mockReturnValue(of(true));
    component.cirrusUser = { ...user, ctc_admin: true };

    // Act
    const result: Observable<boolean> = of(component.shouldShowCTCLink());

    // Assert
    result.subscribe(value => {
      expect(value).toBeTruthy();
      expect(featureFlagServiceSpy).toHaveBeenCalledWith('ctc_admin');
    });
  });

  it('should NOT show CTC admin link if feature flag is disabled and user is CTC admin', () => {
    // Arrange
    const featureFlagServiceSpy = jest
      .spyOn(MockFeatureFlagService.prototype, 'isFeatureEnabled')
      .mockReturnValue(of(false));
    component.cirrusUser = { ...user, ctc_admin: true };

    // Act
    const result: Observable<boolean> = of(component.shouldShowCTCLink());

    // Assert
    result.subscribe(value => {
      expect(value).toBeFalsy();
      expect(featureFlagServiceSpy).toHaveBeenCalledWith('jibberish');
    });
  });

  it('should NOT show CTC link if feature flag is enabled but user is NOT CTC admin', () => {
    // Arrange
    const featureFlagServiceSpy = jest
      .spyOn(MockFeatureFlagService.prototype, 'isFeatureEnabled')
      .mockReturnValue(of(false));
    component.cirrusUser = { ...user, ctc_admin: false };

    // Act
    const result: Observable<boolean> = of(component.shouldShowCTCLink());

    // Assert
    result.subscribe(value => {
      expect(value).toBeFalsy();
      expect(featureFlagServiceSpy).toHaveBeenCalledWith('ctc_admin');
    });
  });
});
