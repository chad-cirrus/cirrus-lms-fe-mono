import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseLandingPageComponent, UiDownloadService } from '@cirrus/ui';
import { StoreModule } from '@ngrx/store';
import { coursesReducers } from '../store/reducers';

import { CourseComponent } from './course.component';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatIcon } from '@angular/material/icon';
import { MockComponent } from 'ng-mocks';
import { MatTabsModule } from '@angular/material/tabs';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(coursesReducers),
        MatIconTestingModule,
        MatTabsModule,
      ],
      declarations: [
        CourseComponent,
        MockComponent(CourseLandingPageComponent),
        MatIcon,
      ],
      providers: [
        { provide: UiDownloadService, useClass: MockUIDownloadService },
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
