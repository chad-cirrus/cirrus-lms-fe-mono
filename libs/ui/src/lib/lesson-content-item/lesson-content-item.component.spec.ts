import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CONTENT_STATUS, IContent, IProgress } from '@cirrus/models';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CirrusMaterialModule } from '@cirrus/ui';

import { LessonContentItemComponent } from './lesson-content-item.component';

const progress: IProgress = { id: 0, status: '' };
const contentItem: IContent = {
  progress: progress,
  id: 630,
  title: 'Primary Flight Controls',
  subtitle: 'test b',
  score: 0,
  url: '377578235',
  content_type: 0,
  meta_tags: [],
  content_html: '',
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
  show_comments: true,
  order: 0,
  content_tasks: [],
  quiz: undefined
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
    component.content = contentItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title', async () => {
    const titleElement = fixture.debugElement.nativeElement;

    expect(titleElement.textContent).toContain(
      'Primary Flight Controls'
    );
  });

  it('should display in progress when not completed', () => {
    contentItem.progress.status = CONTENT_STATUS.InProgress;
    component.content = contentItem;
    fixture.detectChanges();
    const titleElement = fixture.debugElement.nativeElement;

    expect(titleElement.querySelector('.lesson-content-item__progress').textContent).toContain(
      'In Progress'
    );
  });

  it('should display in completd when status is completed', () => {
    contentItem.progress.status = CONTENT_STATUS.Completed;
    component.content = contentItem;
    fixture.detectChanges();
    const titleElement = fixture.debugElement.nativeElement;

    expect(titleElement.querySelector('.lesson-content-item__progress').textContent).toContain(
      'Completed'
    );
  });
});
