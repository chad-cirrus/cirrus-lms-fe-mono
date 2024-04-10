import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentImageComponent } from './content-image.component';
import { CirrusSanitizerService } from '../shared/cirrus-sanitizer.service';
import { IContent, IProgress } from '@cirrus/models';

describe('ContentImageComponent', () => {
  let component: ContentImageComponent;
  let fixture: ComponentFixture<ContentImageComponent>;
  const progress: IProgress = { id: 0, status: '' };
  const content: IContent = {
    blob_directory: '',
    content_file: '',
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
    progress,
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
      declarations: [ ContentImageComponent ],
      providers: [
        { provide: CirrusSanitizerService, useClass: CirrusSanitizerService },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentImageComponent);
    component = fixture.componentInstance;
    component.content = content;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
