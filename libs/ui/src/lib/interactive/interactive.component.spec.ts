import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveComponent } from './interactive.component';
import { CirrusSanitizerService } from '../shared/cirrus-sanitizer.service';
import { IContent, IProgress } from '@cirrus/models';

describe('InteractiveComponent', () => {
  let component: InteractiveComponent;
  let fixture: ComponentFixture<InteractiveComponent>;
  const progress: IProgress = { id: 0, status: 'not_started' };
  const content: IContent = {
    blob_directory: '',
    content_file: 'https://example.com',
    content_filename: '',
    content_html: '',
    content_tasks: [],
    content_type: 0,
    created_by: '',
    desc: '',
    id: 0,
    jet_scoring: false,
    meta_tags: [],
    order: 0,
    placeholder_image: '',
    progress: progress,
    evaluation: undefined,
    score: 0,
    show_comments: false,
    starter_file: '',
    subtitle: '',
    title: '',
    upload_image: '',
    url: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractiveComponent ],
      providers: [
        { provide: CirrusSanitizerService, useClass: CirrusSanitizerService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveComponent);
    component = fixture.componentInstance;
    component.content = content;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
