import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CONTENT_STATUS, IContent } from '@cirrus/models';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CirrusMaterialModule } from '@cirrus/ui';

import { LessonContentItemComponent } from './lesson-content-item.component';

const contentItem: IContent = {
  id: 630,
  title: 'Primary Flight Controls',
  subtitle: 'test b',
  status: '',
  score: 0,
  url: '377578235',
  created_at: '2019-12-05T20:12:31.880Z',
  updated_at: '2019-12-19T23:53:49.943Z',
  content_type: 0,
  meta_tags: [],
  content_html: '',
  link_id: '',
  desc: 'Primary Flight Controls video from the SR2X systems video series.',
  placeholder_image:
    'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/scorm/a84173672f8f9d5c5aa4dd32e91068Primary Flight Controls.png',
  content_file: '',
  jet_scoring: false,
  created_by: 'Cirrus Aircraft',
  upload_image: '',
  content_filename: '',
  blob_directory: '',
  starter_file: '',
  version: 3,
  show_comments: true,
  order: 0,
  content_tasks: [],
  estimated_time: '',
  quiz: undefined,
};

describe('LessonContentItemComponent', () => {
  let component: LessonContentItemComponent;
  let fixture: ComponentFixture<LessonContentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirrusMaterialModule, FlexLayoutModule],
      declarations: [LessonContentItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.content = contentItem;
    expect(component).toBeTruthy();
  });

  it('should display a title', async () => {
    component.content = contentItem;
    fixture.detectChanges();
    const titleElement = fixture.debugElement.nativeElement;

    expect(titleElement.querySelector('.title').textContent).toContain(
      'Primary Flight Controls'
    );
  });

  it('should display in progress when not completed', () => {
    component.content = contentItem;
    component.content.status = CONTENT_STATUS.InProgress;
    fixture.detectChanges();
    const titleElement = fixture.debugElement.nativeElement;

    expect(titleElement.querySelector('span').textContent).toContain(
      'In Progress'
    );
  });

  it('should display in completd when status is completed', () => {
    component.content = contentItem;
    component.content.status = CONTENT_STATUS.Completed;
    fixture.detectChanges();
    const titleElement = fixture.debugElement.nativeElement;

    expect(titleElement.querySelector('span').textContent).toContain(
      'Completed'
    );
  });
});
