import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseLandingPageComponent, UiDownloadService } from '@cirrus/ui';
import { StoreModule } from '@ngrx/store';
import { coursesReducers } from '../store/reducers';

import { MatIcon } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { FeatureFlagService } from '@cirrus/ui';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { CourseComponent } from './course.component';
class MockFeatureFlagService {
  isFeatureEnabled() {
    return of(false);
  }
}

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot(coursesReducers), MatIconTestingModule, MatTabsModule],
      declarations: [CourseComponent, MockComponent(CourseLandingPageComponent)],
      providers: [
        { provide: UiDownloadService, useClass: MockUIDownloadService },
        { provide: FeatureFlagService, useClass: MockFeatureFlagService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockUIDownloadService {}
