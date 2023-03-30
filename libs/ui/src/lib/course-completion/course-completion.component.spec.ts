import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCompletionComponent } from './course-completion.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UiDownloadService } from '@cirrus/ui';
import { of } from 'rxjs';

describe('CourseCompletionComponent', () => {
  let component: CourseCompletionComponent;
  let fixture: ComponentFixture<CourseCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCompletionComponent ],
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: UiDownloadService, useClass: MockUIDownloadService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockUIDownloadService {
  getCourse(course_id: number): any {
    return of('');
  }
}
