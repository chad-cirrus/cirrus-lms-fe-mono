import { TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { UiCourseService } from './ui-course.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UiCourseService', () => {
  let service: UiCourseService;
  let dialog: MatDialog;
  const environment: Record<string, unknown> = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientTestingModule],
      providers: [
        UiCourseService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: 'environment', useValue: environment }
      ],
    });
    service = TestBed.inject(UiCourseService);
    dialog = TestBed.inject(MatDialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
