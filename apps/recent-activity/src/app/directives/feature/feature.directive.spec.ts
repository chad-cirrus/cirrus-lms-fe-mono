import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureDirective } from './feature.directive';
import { of } from 'rxjs';
import { RecentActivityFacade } from '../../recent-activity-facade.service';

@Component({
  template: `
    <ng-container *cirrusFeature="'cirrusFeature'">
      <p>My feature is enabled</p>
    </ng-container>
  `,
})
class TestComponent {
  @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;
  constructor(public facadeService: RecentActivityFacade) {}
}

describe('FeatureDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  const facadeService = {
    isFeatureFlagEnabled: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureDirective, TestComponent],
      providers: [
        { provide: RecentActivityFacade, useValue: facadeService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display content when feature flag is enabled', () => {
    facadeService.isFeatureFlagEnabled.mockReturnValue(of(true));

    fixture.detectChanges();

    const pElement = fixture.nativeElement.querySelector('p');
    expect(pElement.textContent).toContain('My feature is enabled');
  });

  it('should not display content when feature flag is disabled', () => {
    facadeService.isFeatureFlagEnabled.mockReturnValue(of(false));

    fixture.detectChanges();

    const pElement = fixture.nativeElement.querySelector('p');
    expect(pElement).toBeFalsy();
  });
});
