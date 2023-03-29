import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureDirective } from './feature.directive';
import { RecentActivityFacade } from '../../facade.service';
import { Observable, of } from 'rxjs';

class MockRecentActivityFacade {
  isFeatureFlagEnabled(featureName: string): Observable<boolean> {
    if (featureName === 'cirrusFeature') {
      return of(true);
    } else {
      return of(false);
    }
  }
}

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
  let facadeService: RecentActivityFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureDirective, TestComponent],
      providers: [
        { provide: RecentActivityFacade, useClass: MockRecentActivityFacade },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    facadeService = TestBed.inject(RecentActivityFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display content when feature flag is enabled', () => {
    spyOn(facadeService, 'isFeatureFlagEnabled').and.returnValue(of(true));

    fixture.detectChanges();

    const pElement = fixture.nativeElement.querySelector('p');
    expect(pElement.textContent).toContain('My feature is enabled');
  });

  it('should not display content when feature flag is disabled', () => {
    spyOn(facadeService, 'isFeatureFlagEnabled').and.returnValue(of(false));

    fixture.detectChanges();

    const pElement = fixture.nativeElement.querySelector('p');
    expect(pElement).toBeFalsy();
  });
});
