import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UiDownloadService } from './ui-download.service';
import {
  ContentCounts,
  IBadge,
  ICertificate,
  ICertificatestats,
  ICourseOverview,
  ICourseOverviewLesson,
  ILessonsstats,
  IProgress,
  UserCourse,
} from '@cirrus/models';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UiDownloadService', () => {
  let service: UiDownloadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        UiDownloadService,
        { provide: 'environment', useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
});
    service = TestBed.inject(UiDownloadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // getCourse tests
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

  it('should parse the filename from content disposition with filename*=UTF-8 encoding', () => {
    const service = TestBed.inject(UiDownloadService);
    const contentDisposition = "attachment; filename*=UTF-8''%E6%B5%8B%E8%AF%95.txt";
    const expectedFilename = '测试.txt';

    const result = service.parseFilename(contentDisposition);

    expect(result).toEqual(expectedFilename);
  });

  it('should parse the filename from content disposition with filename="..." encoding', () => {
    const service = TestBed.inject(UiDownloadService);
    const contentDisposition = 'attachment; filename="test.txt"';
    const expectedFilename = 'test.txt';

    const result = service.parseFilename(contentDisposition);

    expect(result).toEqual(expectedFilename);
  });

  it('should return an empty string if the filename cannot be parsed', () => {
    const service = TestBed.inject(UiDownloadService);
    const contentDisposition = 'attachment; filename=invalid';
    const expectedFilename = '';

    const result = service.parseFilename(contentDisposition);

    expect(result).toEqual(expectedFilename);
  });

  it('should set the selected ID', () => {
    const service = TestBed.inject(UiDownloadService);
    const value = 123;

    service.setSelectedId(value);

    service.selectedRowId$.subscribe(selectedId => {
      expect(selectedId).toEqual(value);
    });
  });
});
