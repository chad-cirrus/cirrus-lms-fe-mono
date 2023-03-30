import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentRichTextComponent } from './content-rich-text.component';
import { CirrusSanitizerService } from '../shared/cirrus-sanitizer.service';
import { IContent, IProgress } from '@cirrus/models';

describe('ContentRichTextComponent', () => {
  Object.defineProperty(global.window, 'scrollTo', () => {});
  let component: ContentRichTextComponent;
  let fixture: ComponentFixture<ContentRichTextComponent>;
  let progress: IProgress = { id: 0, status: 'not_started' };
  let content: IContent = {
    blob_directory: '',
    content_file: '',
    content_filename: '',
    content_html: '<div></div>',
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
    quiz: undefined,
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
      declarations: [ ContentRichTextComponent ],
      providers: [
        { provide: CirrusSanitizerService, useClass: CirrusSanitizerService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentRichTextComponent);
    component = fixture.componentInstance;
    component.content = content;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
