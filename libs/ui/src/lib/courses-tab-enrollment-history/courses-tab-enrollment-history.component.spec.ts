import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesTabEnrollmentHistoryComponent } from './courses-tab-enrollment-history.component';
import { GenericResponsiveMatTableComponent, UiDownloadService } from '@cirrus/ui';
import { MockComponent } from 'ng-mocks';

describe('CoursesTabEnrollmentHistoryComponent', () => {
  let component: CoursesTabEnrollmentHistoryComponent;
  let fixture: ComponentFixture<CoursesTabEnrollmentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesTabEnrollmentHistoryComponent, MockComponent(GenericResponsiveMatTableComponent) ],
      providers: [
        { provide: UiDownloadService, useClass: MockUIDownloadService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesTabEnrollmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockUIDownloadService {}
