import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionDialogComponent } from './completion-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UiDownloadService } from '../course-completion/ui-download.service';
import { ICourseOverview } from '@cirrus/models';
import { of } from 'rxjs';

describe('CompletionDialogComponent', () => {
  let component: CompletionDialogComponent;
  let fixture: ComponentFixture<CompletionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletionDialogComponent],
      imports: [MatMenuModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: UiDownloadService, useValue: { getCourse: () => jest.fn().mockReturnValue(of({}))} }, // Provide a mock implementation for getCourse
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionDialogComponent);
    component = fixture.componentInstance;
    component.data = {
      lesson: 'lesson',
      course: {} as ICourseOverview,
      stageId: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    // Provide a mock implementation for uiDownloadService
    const uiDownloadService = TestBed.inject(UiDownloadService);
    uiDownloadService.getCourse = ;
    expect(component).toBeTruthy();
  });
});

