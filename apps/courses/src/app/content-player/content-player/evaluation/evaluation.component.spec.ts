import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EvaluationComponent } from './evaluation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { coursesReducers } from '../../../store/reducers';
import { EvaluationService } from './evaluation.service';
import { IContent } from '@cirrus/models';
import { IEvalRequest } from './models/IEvalRequest';
import { IEvalAttempt } from './models/IEvalAttempt';
import { IQuestionOption } from './models/IQuestionOption';
import { IEvalAttemptQuestion } from './models/IEvalAttemptQuestion';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FullStoryEventData, FullstoryService } from '@cirrus/ui';

describe('QuizComponent', () => {
  let component: EvaluationComponent;
  let fixture: ComponentFixture<EvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationComponent, HttpClientTestingModule, StoreModule.forRoot(coursesReducers), MatDialogModule],
      providers: [
        EvaluationService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: FullstoryService, useClass: MockFullstoryService}
      ],
      declarations: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationComponent);
    component = fixture.componentInstance;
    component.content = getContent();
    fixture.detectChanges();
  });

  it('should create quiz component', () => {
    expect(component).toBeTruthy();
  });

});

function getContent(): IContent {
  return {
    id: 1234,
    order: 1,
    title: 'Mock quiz content',
    subtitle: 'Mock quiz subtitle',
    progress: {
      id: 12345,
      status: 'not_started',
    },
    score: 0,
    url: 'mockquizcontent.com',
    meta_tags: ['mock', 'quiz', 'content'],
    content_tasks: [
      {
        id: 1234,
        task: {
          id: 1234,
          name: '',
          standards: [],
          task_category: {
            id: 1,
            name: '',
            desc: '',
            created_at: '',
            updated_at: '',
          },
          is_archived: false,
          task_type: 'quiz',
          required_successful_attempts: 1,
          passed_count: 1,
          missed_count: 1,
          status: '',
          task_attempts: [],
        },
        content_id: 12345,
        required_successful_attempts: 1,
        order: 1,
        task_id: 1,
        task_type: 'quiz',
      },
    ],
    evaluation: 'mock quiz',
    content_type: 5,
    desc: 'Mock quiz description',
    content_file: '',
    placeholder_image: '',
    jet_scoring: false,
    content_html: '',
    created_by: 'Mock user',
    upload_image: '',
    content_filename: '',
    starter_file: '',
    blob_directory: '',
    show_comments: false,
    courseTitle: 'Mock quiz course',
    evaluation_id: 1,
  };
}

function getIQuizRequest(): IEvalRequest {
  const mockQuizAttempt: IEvalAttempt = {

    id: 1,
    course_attempt_id: 1,
    stage_id: 1,
    lesson_id: 1,
    content_id: 1,
    exam_id: 0,
    quiz_id: 1,
    snapshot: 'mock snapshot',
    score: 100,
    created_at: '2022-01-01T00:00:00Z',
    updated_at: '2022-01-01T00:00:00Z',
    graded_at: '2022-01-01T00:00:00Z',
    evaluation_attempt_questions: [],
  };
  return { evaluation_attempt: mockQuizAttempt } as IEvalRequest;
}

function fnGenerateMockIQuestionOption(): IQuestionOption {
  const _id = Math.floor(Math.random() * 10);
  return {
    id: _id,
    description: 'Option ' + _id,
  };
}

const fnGenerateMockIQuizAttemptQuestion = (): IEvalAttemptQuestion => {
  return {
    id: Math.floor(Math.random() * 10),
    quiz_attempt_id: Math.floor(Math.random() * 10),
    correct: true,
    quiz_question_id: 37,
    question_option_id: 37,
    body: 'Isnt this a silly question?',
    options: [fnGenerateMockIQuestionOption(), fnGenerateMockIQuestionOption()],
    image_url: '',
    image_title: '',
    responded_at: '2024-01-17T21:05:02.013Z',
    created_at: '2024-01-17T21:05:02.013Z',
  } as IEvalAttemptQuestion;
};

const fnGetMockQuizAttempt = (): IEvalAttempt => {
  return {
    id: 1,
    course_attempt_id: 1,
    stage_id: 1,
    lesson_id: 1,
    content_id: 1,
    quiz_id: 1,
    snapshot: '',
    created_at: '2024-01-17T21:05:02.013Z',
    updated_at: '2024-01-17T21:05:02.013Z',
    graded_at: '2024-01-17T21:05:02.013Z',
    score: 80,
    evaluation_attempt_questions: [fnGenerateMockIQuizAttemptQuestion()],
    exam_id: 0,
  };
};

class MockFullstoryService {
  init() {}
  event(eventName: string, eventProperties: FullStoryEventData) {}
  identify(cirrusUser: any) {}
}
