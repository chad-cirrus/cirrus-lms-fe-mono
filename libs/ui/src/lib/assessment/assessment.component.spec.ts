import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentComponent } from './assessment.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MockComponent } from 'ng-mocks';
import { TaskComponent } from '../task/task.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LogbookComponent } from '../logbook/logbook.component';
import { AttemptFeedbackComponent } from '../attempt-feedback/attempt-feedback.component';
import { IContent, IProgress } from '@cirrus/models';

describe('AssessmentComponent', () => {
  let component: AssessmentComponent;
  let fixture: ComponentFixture<AssessmentComponent>;
  const progress: IProgress = { id: 0, scorm: { grade: 0, pass: false }, status: '' };
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
      imports: [
        MatTabsModule,
        NoopAnimationsModule,
      ],
      declarations: [
        AssessmentComponent,
        MockComponent(TaskComponent),
        MockComponent(LogbookComponent),
        MockComponent(AttemptFeedbackComponent),
      ],
      providers: [
        { provide: BreakpointObserver, useClass: BreakpointObserver },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentComponent);
    component = fixture.componentInstance;
    component.menuOpen = false;
    component.content = content;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
