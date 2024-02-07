import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionDialogComponent } from './completion-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UiDownloadService } from '../course-completion/ui-download.service';
import { ContentCounts, IBadge, ICertificate, IContent, ICourseContentStat, ICourseOverview, ICourseOverviewLesson, ICourseOverviewStage, IEnrollmentHistory, IHoursAndLandingsStat, ILessonsstats, IProgress, UserCourse } from '@cirrus/models';
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
        { provide: UiDownloadService, useClass: MockUIDownloadService}
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionDialogComponent);
    component = fixture.componentInstance;
    component.data = {
      lesson: 'lesson',
      course: _mockCourseOverview,
      stageId: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockUIDownloadService {
  getCourse(course_id: number): unknown {
    return of('');
  }
}


const _mockCourseOverview: ICourseOverview = {
  id: 1,
  name: 'name',
  major_version: 1,
  minor_version: 1,
  title: 'title',
  subtitle: 'subtitle',
  has_agreement: true,
  certificate: {} as ICertificate,
  completed_at: 'completed_at',
  course_content_stats: [] as ICourseContentStat[],
  agreement_body: 'agreement_body',
  started_at: 'started_at',
  overview: 'overview',
  list_price: 10,
  completion_time: 'completion_time',
  course_attempt: { id: 1, user_course: {} as UserCourse },
  minimum_flight_hours: 10,
  desktop_hero_image_url: 'desktop_hero_image_url',
  mobile_hero_image_url: 'mobile_hero_image_url',
  thumbnail_image_url: 'thumbnail_image_url',
  can_reenroll: true,
  hours_and_landings_stats: [] as IHoursAndLandingsStat[],
  lessons_stats: {} as ILessonsstats,
  summary_counts: {} as ContentCounts,
  stages: [] as ICourseOverviewStage[],
  progress: {} as IProgress,
  enrollments: [] as IEnrollmentHistory[],
  next_lesson: {} as Partial<ICourseOverviewLesson>,
  badge: {} as IBadge,
  course_overview_video: {} as IContent,
  sales_desc: 'sales_desc',
  awarded_certificates: [] as ICertificate[],
};
