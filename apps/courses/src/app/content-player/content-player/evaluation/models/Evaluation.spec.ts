import { IAnswerResponse } from './IAnswerResponse';
import { IQuestionOption } from './IQuestionOption';
import { IEvalAttempt } from './IEvalAttempt';
import { IEvalAttemptQuestion } from './IEvalAttemptQuestion';
import { IEvalRequest } from './IEvalRequest';
import { IStartEvalResponse } from './IStartEvalResponse';
import { EvaluationClass } from './Evaluation'; // Import the QuizClass from the correct module
import { EvaluationGradeEnum } from './EvaluationGradeEnum';
import { EvaluationStatusEnum } from './EvaluationStatusEnum';
describe('QuizClass', () => {
  let quiz: EvaluationClass;

  beforeEach(() => {
    quiz = new EvaluationClass();
  });

  it('should initialize with default values', () => {
    expect(quiz.id).toBe(-1);
    expect(quiz.status).toBe(EvaluationStatusEnum.NotStarted);
    expect(quiz.grade).toBe(EvaluationGradeEnum.NotGraded);
    expect(quiz.currentQuestionIndex).toBe(-1);
    expect(quiz.questions).toEqual([]);
    expect(quiz.approximateDuration).toBe(0);
    expect(quiz.attempt).toBeUndefined();
    expect(quiz.timeLimit).toBe(0);
    expect(quiz.elapsedSeconds).toBe(-1);
    expect(quiz.selectedOptionId).toBe(-1);
    expect(quiz.currentAttemptCount).toBe(-1);
  });

  it('should load quiz from the API', () => {
    const quizRequest: IEvalRequest = getQuizContent(); // Replace with your own implementation
    quiz.loadEvaluation(quizRequest);

    expect(quiz.id).toBe(quizRequest.id);
    expect(quiz.approximateDuration).toBe(quizRequest.approximate_duration);
    expect(quiz.timeLimit).toBe(quizRequest.time_limit_in_minutes);
    expect(quiz.questions).toEqual(quizRequest.quiz_questions);
    expect(quiz.attempt).toBe(quizRequest.quiz_attempt);
  });

  it('should check if the quiz is timed', () => {
    quiz.timeLimit = 0;
    expect(quiz.isEvaluationTimed()).toBe(false);

    quiz.timeLimit = 10;
    expect(quiz.isEvaluationTimed()).toBe(true);
  });

  it('should check if the quiz has attempts', () => {
    quiz.attempt = undefined;
    expect(quiz.hasAttempts()).toBe(false);

    quiz.attempt = {} as IEvalAttempt; // Replace with your own implementation
    expect(quiz.hasAttempts()).toBe(true);
  });

  it('should set status to TimedOut if elapsed time is greater than time limit', () => {
    quiz.status = EvaluationStatusEnum.InProgress;
    quiz.timeLimit = 1;
    quiz.elapsedSeconds = 50;
    quiz.incrementTimeElapsed();
    expect(quiz.status).toBe(EvaluationStatusEnum.InProgress);
    expect(quiz.elapsedSeconds).toBe(51);

    quiz.elapsedSeconds = 600; // 10 minutes
    quiz.timeLimit = 10;
    quiz.incrementTimeElapsed();
    expect(quiz.status).toBe(EvaluationStatusEnum.TimedOut);
  });

  it('should start the quiz with the provided response', () => {
    const startQuizResponse: IStartEvalResponse = {
      evaluation_attempt: getMockQuizAttempt(),
    } as IStartEvalResponse; // Replace with your own implementation
    startQuizResponse.evaluation_attempt.evaluation_attempt_questions = [
      generateMockQuizAttemptQuestion(),
      generateMockQuizAttemptQuestion(),
    ];
    quiz.startEvaluation(startQuizResponse);

    expect(quiz.status).toBe(EvaluationStatusEnum.InProgress);
    expect(quiz.attempt).toBe(startQuizResponse.evaluation_attempt);
    expect(quiz.currentQuestionIndex).toBe(0);
    expect(quiz.questions).toEqual(startQuizResponse.evaluation_attempt.evaluation_attempt_questions);
  });

  it('should calculate the time remaining for the quiz', () => {
    quiz.timeLimit = 10;
    quiz.elapsedSeconds = 300; // 5 minutes

    expect(quiz.getTimeRemaining()).toBe('5:00');
  });

  it('should select an answer', () => {
    const optionId = 1;
    quiz.selectAnswer(optionId);

    expect(quiz.selectedOptionId).toBe(optionId);
  });

  it('should submit an answer for the current question', () => {
    const answerResponse: IAnswerResponse = {
      evaluation_attempt_question: generateMockQuizAttemptQuestion(),
    } as IAnswerResponse; // Replace with your own implementation
    quiz.currentQuestionIndex = 0;
    quiz.processAnswer(answerResponse);

    expect(quiz.questions[0]).toBe(answerResponse.evaluation_attempt_question);
    expect(quiz.currentAttemptCount).toBe(0);
  });

  it('should move to the next question', () => {
    quiz.currentQuestionIndex = 0;
    quiz.questions = [{}, {}] as IEvalAttemptQuestion[];

    quiz.nextQuestion();

    expect(quiz.currentQuestionIndex).toBe(1);
    expect(quiz.selectedOptionId).toBe(-1);
    expect(quiz.currentAttemptCount).toBe(-1);

    quiz.currentQuestionIndex = 1;
    quiz.nextQuestion();

    expect(quiz.status).toBe(EvaluationStatusEnum.Complete);
  });

  it('should end the quiz', () => {
    const quizAttempt: IEvalAttempt = {} as IEvalAttempt; // Replace with your own implementation
    quiz.endEvaluation(quizAttempt);

    expect(quiz.status).toBe(EvaluationStatusEnum.Submitted);
    expect(quiz.currentQuestionIndex).toBe(-1);
  });

  it('should reset the quiz', () => {
    quiz.status = EvaluationStatusEnum.InProgress;
    quiz.currentQuestionIndex = 1;
    quiz.elapsedSeconds = 300;
    quiz.selectedOptionId = 1;
    quiz.currentAttemptCount = 2;
    quiz.grade = EvaluationGradeEnum.Passed;
    quiz.passPercentage = 80;

    quiz.resetEvaluation();

    expect(quiz.status).toBe(EvaluationStatusEnum.NotStarted);
    expect(quiz.currentQuestionIndex).toBe(-1);
    expect(quiz.elapsedSeconds).toBe(-1);
    expect(quiz.selectedOptionId).toBe(-1);
    expect(quiz.currentAttemptCount).toBe(-1);
    expect(quiz.grade).toBe(EvaluationGradeEnum.NotGraded);
    expect(quiz.passPercentage).toBe(-1);
  });

  it('should check if the current question has an image', () => {
    quiz.currentQuestionIndex = 0;
    const question1 = generateMockQuizAttemptQuestion();
    const question2 = generateMockQuizAttemptQuestion();
    question1.image_url = '';
    question2.image_url = 'https://example.com/image.jpg';
    quiz.questions = [question1, question2];

    expect(quiz.questionHasImage()).toBe(false);

    quiz.currentQuestionIndex = 1;
    expect(quiz.questionHasImage()).toBe(true);
  });
  describe('isTrueFalse()', () => {
    it('should check if the current question is true/false', () => {
      quiz.currentQuestionIndex = 0;
      const question1 = generateMockQuizAttemptQuestion();
      const question2 = generateMockQuizAttemptQuestion();
      question1.options = [fnGenerateMockIQuestionOption(), fnGenerateMockIQuestionOption()];
      question2.options = [
        fnGenerateMockIQuestionOption(),
        fnGenerateMockIQuestionOption(),
        fnGenerateMockIQuestionOption(),
      ];
      quiz.questions = [question1, question2];

      expect(quiz.isTrueFalse()).toBe(true);

      quiz.currentQuestionIndex = 1;
      expect(quiz.isTrueFalse()).toBe(false);
    });
  });

  // ...

  describe('questionHasBeenAnswered()', () => {
    it('should return false if current question index is less than 0', () => {
      quiz.currentQuestionIndex = -1;
      expect(quiz.questionHasBeenAnswered()).toBe(false);
    });

    it('should return false if current question index is greater than or equal to the number of questions', () => {
      quiz.currentQuestionIndex = quiz.questions.length;
      expect(quiz.questionHasBeenAnswered()).toBe(false);

      quiz.currentQuestionIndex = quiz.questions.length + 1;
      expect(quiz.questionHasBeenAnswered()).toBe(false);
    });

    it('should return false if the current question has not been answered', () => {
      quiz.currentQuestionIndex = 0;
      const _question: IEvalAttemptQuestion = generateMockQuizAttemptQuestion();
      _question.responded_at = null;
      quiz.questions = [_question];
      expect(quiz.questionHasBeenAnswered()).toBe(false);
    });

    it('should return true if the current question has been answered', () => {
      quiz.currentQuestionIndex = 0;
      const _question: IEvalAttemptQuestion = generateMockQuizAttemptQuestion();
      _question.responded_at = '2024-03-02T00:18:05.298Z';
      quiz.questions = [_question];
      expect(quiz.questionHasBeenAnswered()).toBe(true);
    });
  });

  describe('isMultipleChoice()', () => {
    it('should check if the current question is multiple choice', () => {
      quiz.currentQuestionIndex = 0;
      const _fourOptions = [
        fnGenerateMockIQuestionOption(),
        fnGenerateMockIQuestionOption(),
        fnGenerateMockIQuestionOption(),
        fnGenerateMockIQuestionOption(),
      ];
      const _threeOptions = [
        fnGenerateMockIQuestionOption(),
        fnGenerateMockIQuestionOption(),
        fnGenerateMockIQuestionOption(),
      ];
      const _twoOptions = [fnGenerateMockIQuestionOption(), fnGenerateMockIQuestionOption()];
      const _oneOptions = [fnGenerateMockIQuestionOption()];
      const _question1 = generateMockQuizAttemptQuestion();
      _question1.options = _fourOptions;
      const _question2 = generateMockQuizAttemptQuestion();
      _question2.options = _threeOptions;
      const _question3 = generateMockQuizAttemptQuestion();
      _question3.options = _twoOptions;
      const _question4 = generateMockQuizAttemptQuestion();
      _question4.options = _oneOptions;
      const _question5 = generateMockQuizAttemptQuestion();
      _question5.options = [];

      quiz.questions = [_question1, _question2, _question3, _question4];

      expect(quiz.isMultipleChoice()).toBe(true);

      quiz.currentQuestionIndex = 1;
      expect(quiz.isMultipleChoice()).toBe(true);

      quiz.currentQuestionIndex = 2;
      expect(quiz.isMultipleChoice()).toBe(false);

      quiz.currentQuestionIndex = 3;
      expect(quiz.isMultipleChoice()).toBe(false);
    });
  });

  it('should check if the selected option is correct', () => {
    quiz.currentQuestionIndex = 0;
    const question: IEvalAttemptQuestion = generateMockQuizAttemptQuestion();
    question.correct_option_id = 1;
    quiz.questions = [question];

    expect(quiz.isCorrectOptionId(1)).toBe(true);
    expect(quiz.isCorrectOptionId(2)).toBe(false);
  });
});

const fnGenerateMockIQuestionOption = (): IQuestionOption => {
  const _id = Math.floor(Math.random() * 10);
  return {
    id: _id,
    description: 'Option ' + _id,
  };
};

function getSubmissionResponse(): IEvalAttempt {
  const _obj = {
    quiz_attempt: {
      id: 311,
      course_attempt_id: 108010,
      stage_id: 486,
      lesson_id: 318,
      content_id: 234,
      quiz_id: 5,
      score: 100,
      graded_at: '2024-03-02T00:18:16.700Z',
      started_at: '2024-03-02T00:18:01.232Z',
      quiz_attempt_questions: [
        {
          id: 400,
          quiz_question_id: 33,
          question_option_id: 5,
          correct: true,
          responded_at: '2024-03-02T00:18:05.298Z',
          created_at: '2024-03-02T00:18:01.261Z',
          body: 'Which option below says Pick Me!!!! ?',
          image_title: null,
          image_url: null,
          options: [
            {
              id: 5,
              description: 'Pick me!!!!!',
            },
            {
              id: 6,
              description: 'a really bad option',
            },
            {
              id: 7,
              description: 'an even worse option',
            },
            {
              id: 8,
              description: 'A terrible, horrible, no good, very bad option',
            },
          ],
        },
        {
          id: 401,
          quiz_question_id: 34,
          question_option_id: 9,
          correct: true,
          responded_at: '2024-03-02T00:18:14.786Z',
          created_at: '2024-03-02T00:18:01.273Z',
          body: 'Is this question really silly?',
          image_title: null,
          image_url: null,
          options: [
            {
              id: 9,
              description: 'True',
            },
            {
              id: 10,
              description: 'False',
            },
          ],
        },
      ],
    },
  };
  const response: IEvalAttempt = {
    id: 311,
    course_attempt_id: 108010,
    stage_id: 486,
    lesson_id: 318,
    content_id: 234,
    exam_id: 0,
    quiz_id: 5,
    score: 100,
    snapshot: 'mock snapshot',
    graded_at: '2024-03-02T00:18:16.700Z',
    created_at: '2024-03-02T00:18:01.232Z',
    updated_at: '2024-03-02T00:18:16.700Z',
    evaluation_attempt_questions: [],
  };

  return response;
}
function getMockQuizAttempt(): IEvalAttempt {
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
  return mockQuizAttempt;
}
function getQuizContent(): IEvalRequest {

  const mockQuizRequest: IEvalRequest = {
    id: 1,
    name: 'Mock Quiz',
    desc: 'This is a mock quiz',
    quiz_questions: [],
    pass_percentage: 80,
    approximate_duration: 30,
    subjects: ['Math', 'Science'],
    quiz_attempt: getMockQuizAttempt(),
    time_limit_in_minutes: 60,
  };

  return mockQuizRequest;
}
const generateMockQuizAttemptQuestion = (): IEvalAttemptQuestion => {
  return {
    id: 1,
    desc: 'Sample description',
    quiz_attempt_id: 1,
    quiz_question_id: 1,
    question_option_id: 1,
    correct: true,
    correct_option_id: 1,
    body: 'Sample question body',
    options: [
      { id: 1, description: 'Option 1' },
      { id: 2, description: 'Option 2' },
      { id: 3, description: 'Option 3' },
    ],
    image_url: 'https://example.com/image.jpg',
    image_title: 'Sample image',
    responded_at: '2022-01-01T00:00:00Z',
    created_at: '2022-01-01T00:00:00Z',
  };
};
