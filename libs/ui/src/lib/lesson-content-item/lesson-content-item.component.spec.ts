import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IContent } from '@cirrus/models';
import { CirrusMaterialModule } from '@cirrus/ui';

import { LessonContentItemComponent } from './lesson-content-item.component';

const contentItem: IContent = {
  id: 630,
  title: 'Primary Flight Controls',
  subtitle: 'test b',
  status: null,
  score: null,
  url: '377578235',
  created_at: '2019-12-05T20:12:31.880Z',
  updated_at: '2019-12-19T23:53:49.943Z',
  content_type: 0,
  meta_tags: [],
  content_html: null,
  link_id: null,
  desc: 'Primary Flight Controls video from the SR2X systems video series.',
  placeholder_image:
    'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/scorm/a84173672f8f9d5c5aa4dd32e91068Primary Flight Controls.png',
  content_file: null,
  jet_scoring: false,
  created_by: 'Cirrus Aircraft',
  upload_image: null,
  content_filename: '',
  blob_directory: null,
  starter_file: null,
  version: 3,
  show_comments: true,
  order: 0,
};

describe('LessonContentItemComponent', () => {
  let component: LessonContentItemComponent;
  let fixture: ComponentFixture<LessonContentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirrusMaterialModule],
      declarations: [LessonContentItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title', () => {
    component.item = contentItem;
    fixture.detectChanges();
    const titleElement = fixture.debugElement.nativeElement;

    expect(titleElement.querySelector('.title').textContent).toContain(
      'Primary Flight Control'
    );
  });

  it('should display a subtitle', () => {
    component.item = contentItem;
    fixture.detectChanges();
    const titleElement = fixture.debugElement.nativeElement;

    expect(titleElement.querySelector('.subtitle').textContent).toContain(
      'test b'
    );
  });
});
