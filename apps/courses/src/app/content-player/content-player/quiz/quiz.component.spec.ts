import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizComponent } from './quiz.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { coursesReducers } from '../../../store/reducers';
import { QuizService } from './quiz.service';
import { IContent } from '@cirrus/models';
import { IQuizRequest } from './quiz.types';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(async () => {
    await TestBed
      .configureTestingModule({
        imports: [
          QuizComponent,
          HttpClientTestingModule,
          StoreModule.forRoot(coursesReducers),
          MatDialogModule,
        ],
        providers: [QuizService,
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialogRef, useValue: {} },],
        declarations: [],
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    component.content = getContent();
    fixture.detectChanges();
  });

  describe('isQuizCompleted', () => {
    it('should return true if quiz attempt score is defined', () => {
      component.quiz = {
        id: 1,
        name: 'Quiz 1',
        desc: 'Quiz description',
        quiz_questions: [],
        quiz_category_id: 0,
        quiz_questions_count: 0,
        pass_percentage: 0,
        approximate_duration: 0,
        quiz_attempt: {
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
        },
      };

      expect(component.isQuizCompleted()).toBe(true);
    });

    it('should return true if quiz is timed and elapsed time exceeds time limit', () => {
      component.quiz = {
        id: 1,
        name: 'Quiz 1',
        desc: 'Quiz description',
        quiz_questions: [],
        quiz_category_id: 0,
        quiz_questions_count: 0,
        pass_percentage: 0,
        approximate_duration: 0,
        time_limit_in_minutes: 10,
      };
      component.quizTracker.elapsed_time_in_seconds = 600; // 10 minutes

      expect(component.isQuizCompleted()).toBe(true);
    });

    it('should return true if all questions are answered and current question is the last question', () => {
      component.quiz = {
        id: 1,
        name: 'Quiz 1',
        desc: 'Quiz description',
        quiz_questions: [
          {
            id: 1,
            body: 'Question 1',
            desc: '',
            correct_option: { id: 1, description: 'Option 1' },
            question_options: [
              { id: 1, description: 'Option 1' },
              { id: 2, description: 'Option 2' },
            ],
            image_url: '',
            image_title: '',
          },
          {
            id: 2,
            body: 'Question 2',
            desc: '',
            correct_option: { id: 1, description: 'Option 1' },
            question_options: [
              { id: 1, description: 'Option 1' },
              { id: 2, description: 'Option 2' },
            ],
            image_url: '',
            image_title: '',
          },
        ],
        quiz_category_id: 0,
        quiz_questions_count: 2,
        pass_percentage: 0,
        approximate_duration: 0,
      };
      component.quizTracker.responses = [
        {
          quiz_attempt_response: {
            id: 1,
            quiz_attempt_id: 1,
            correct: true,
            quiz_question: component.quiz.quiz_questions[0],
            question_option_id: 1,
          },
        },
        {
          quiz_attempt_response: {
            id: 2,
            quiz_attempt_id: 1,
            correct: true,
            quiz_question: component.quiz.quiz_questions[1],
            question_option_id: 1,
          },
        },
      ];
      component.quizTracker.current_question = 2;

      expect(component.isQuizCompleted()).toBe(true);
    });

    it('should return false if none of the completion conditions are met', () => {
      component.quiz = {
        id: 1,
        name: 'Quiz 1',
        desc: 'Quiz description',
        quiz_questions: [],
        quiz_category_id: 0,
        quiz_questions_count: 0,
        pass_percentage: 0,
        approximate_duration: 0,
      };
      component.quizTracker.elapsed_time_in_seconds = 300; // 5 minutes

      expect(component.isQuizCompleted()).toBe(false);
    });
  });
  it('should create quiz component', () => {
    expect(component).toBeTruthy();
  });

  it('should not hide submit button and not show correct answer for multiple choice questions if there are no attempts', () => {
    component.quiz = getQuizContent();
    component.quizTracker = {
      current_question: 1,
      answers: [],
      responses: [
        {
          quiz_attempt_response: {
            id: 1,
            quiz_attempt_id: 1,
            correct: true,
            quiz_question: getQuizContent().quiz_questions[1],
            question_option_id: 37,
          },
        },
      ],
      attempt_id: 1,
      started_at: new Date('01-01-1970'),
      elapsed_time_in_seconds: 0,
    };
    expect(component.shouldHideSubmitButton()).toBeFalsy();
    expect(component.showCorrectAnswer(4)).toBeFalsy();
    expect(component.showCorrectAnswer(5)).toBeFalsy();
    expect(component.showCorrectAnswer(6)).toBeFalsy();
  });

  it('should not hide submit button and not show correct answer for multiple choice questions if there is only one attempt', () => {
    component.quiz = getQuizContent();
    component.quizTracker = component.quizTracker = {
      current_question: 1,
      answers: [
        { answer: 1, question_id: 37, attempt_count: 1 },
        { answer: 2, question_id: 34, attempt_count: 1 },
      ],
      responses: [
        {
          quiz_attempt_response: {
            id: 1,
            quiz_attempt_id: 1,
            correct: true,
            quiz_question: getQuizContent().quiz_questions[0],
            question_option_id: 37,
          },
        },
        {
          quiz_attempt_response: {
            id: 34,
            quiz_attempt_id: 1,
            correct: false,
            quiz_question: getQuizContent().quiz_questions[1],
            question_option_id: 5,
          },
        },
      ],
      attempt_id: 1,
      started_at: new Date('01-01-1970'),
      elapsed_time_in_seconds: 0,
    };

    expect(component.shouldHideSubmitButton()).toBeFalsy();
    expect(component.showCorrectAnswer(4)).toBeFalsy();
    expect(component.showCorrectAnswer(5)).toBeFalsy();
    expect(component.showCorrectAnswer(6)).toBeFalsy();
  });

  it('should hide submit button and show correct answer for multiple choice questions if there is more than one attempt', () => {
    component.quiz = getQuizContent();
    component.quizTracker = component.quizTracker = {
      current_question: 1,
      answers: [
        { answer: 1, question_id: 37, attempt_count: 1 },
        { answer: 2, question_id: 34, attempt_count: 2 },
      ],
      responses: [
        {
          quiz_attempt_response: {
            id: 1,
            quiz_attempt_id: 1,
            correct: true,
            quiz_question: getQuizContent().quiz_questions[0],
            question_option_id: 37,
          },
        },
        {
          quiz_attempt_response: {
            id: 34,
            quiz_attempt_id: 1,
            correct: false,
            quiz_question: getQuizContent().quiz_questions[1],
            question_option_id: 5,
          },
        },
      ],
      attempt_id: 1,
      started_at: new Date('01-01-1970'),
      elapsed_time_in_seconds: 0,
    };

    expect(component.shouldHideSubmitButton()).toBeTruthy();
    expect(component.showCorrectAnswer(4)).toBeTruthy();
    expect(component.showCorrectAnswer(5)).toBeFalsy();
    expect(component.showCorrectAnswer(6)).toBeFalsy();
  });

  it('should correctly evaluate a question with less than two options as not multiple choice', () => {
    component.quiz = getQuizContent();
    component.quizTracker = {
      current_question: 0,
      answers: [],
      responses: [],
      attempt_id: -1,
      started_at: new Date('01-01-1970'),
      elapsed_time_in_seconds: 0,
    };

    expect(component.isMultipleChoiceQuestion()).toBeFalsy();
  });
  it('should return 0 if quiz or quiz time limit is not defined', () => {
    component.quiz = {
      id: 1,
      name: 'Quiz 1',
      desc: 'Quiz description',
      quiz_questions: [],
      quiz_category_id: 0,
      quiz_questions_count: 0,
      pass_percentage: 0,
      approximate_duration: 0,
    };
    expect(component.getQuizTimeLimit()).toBe(0);

    component.quiz.time_limit_in_minutes = undefined;
    expect(component.getQuizTimeLimit()).toBe(0);
  });

  it('should return the quiz time limit if it is defined', () => {
    component.quiz = {
      id: 1,
      name: 'Quiz 1',
      desc: 'Quiz description',
      quiz_questions: [],
      quiz_category_id: 0,
      quiz_questions_count: 0,
      pass_percentage: 0,
      approximate_duration: 0,
      time_limit_in_minutes: 10,
    };
    expect(component.getQuizTimeLimit()).toBe(10);
  });

  it('should correctly evaluate a question with three or more options is multiple choice', () => {
    component.quiz = getQuizContent();
    component.quizTracker = {
      current_question: 1,
      answers: [],
      responses: [],
      attempt_id: -1,
      started_at: new Date('01-01-1970'),
      elapsed_time_in_seconds: 0,
    };

    expect(component.isMultipleChoiceQuestion()).toBeTruthy();
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
    quiz: 'mock quiz',
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
    quiz_id: 1,
  };
}

function getQuizContent(): IQuizRequest {
  return {
    id: 6,
    name: 'Gobi Bears',
    quiz_category_id: 1,
    pass_percentage: 80,
    quiz_questions_count: 3,
    desc: '',
    approximate_duration: 10,
    quiz_questions: [
      {
        id: 37,
        body: 'What country do Gobi Bears primarily reside?',
        desc: '',
        correct_option: { id: 11, description: 'Mongolia' },
        question_options: [
          { id: 11, description: 'Mongolia' },
          { id: 12, description: 'China' },
        ],
        image_url: '',
        image_title: '',
      },
      {
        id: 34,
        body: 'What percent of a Gobi Bears diet is animal protein?',
        desc: '',
        correct_option: { id: 4, description: '6-10%' },
        question_options: [
          { id: 4, description: '6-10%' },
          { id: 5, description: '10-20%' },
          { id: 6, description: '30-40%' },
        ],
        image_url: '',
        image_title: '',
      },
      {
        id: 33,
        body: 'How many Gobi Bears are left in the wild?',
        desc: '',
        correct_option: { id: 1, description: '36-48 bears' },
        question_options: [
          { id: 1, description: '36-48 bears' },
          { id: 2, description: '100-200 bears' },
          { id: 3, description: '10-20 bears' },
        ],
        image_url: '',
        image_title: '',
      },
    ],
  };
}