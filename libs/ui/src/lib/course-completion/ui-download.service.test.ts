import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UiDownloadService } from './ui-download.service';
import { ContentCounts, IBadge, ICertificate, ICertificatestats, ICourseOverview, ICourseOverviewLesson, ILessonsstats, IProgress, UserCourse } from '@cirrus/models';

describe('UiDownloadService', () => {
  let service: UiDownloadService;
  let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          UiDownloadService,
          { provide: 'environment', useValue: {} }, // Provide a mock value for the 'environment' dependency
        ],
      });
      service = TestBed.inject(UiDownloadService);
      httpMock = TestBed.inject(HttpTestingController);
    });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve the course overview', () => {
    const course_id = 123;
    const expectedCourse: ICourseOverview = {
      id: course_id,
      name: 'Sample Course',
      major_version: 0,
      minor_version: 0,
      title: '',
      subtitle: '',
      has_agreement: false,
      certificate: {} as ICertificate,
      completed_at: '',
      course_content_stats: [],
      agreement_body: '',
      started_at: '',
      course_attempt: {
        id: 0,
        user_course: {} as UserCourse,
      },
      minimum_flight_hours: 0,
      desktop_hero_image_url: '',
      mobile_hero_image_url: '',
      thumbnail_image_url: '',
      can_reenroll: false,
      hours_and_landings_stats: [],
      lessons_stats: {} as ILessonsstats,
      certificate_stats: {} as ICertificatestats,
      summary_counts: {} as ContentCounts,
      stages: [],
      progress: {} as IProgress,
      next_lesson: {} as Partial<ICourseOverviewLesson>,
      badge: {} as IBadge,
    };

    service.getCourse(course_id).subscribe(course => {
      expect(course).toEqual(expectedCourse);
    });

  const req = httpMock.expectOne(`undefined/api/v4/courses/${course_id}`);
  expect(req.request.method).toBe('GET');
  req.flush(expectedCourse);
  httpMock.verify();
  });
});
