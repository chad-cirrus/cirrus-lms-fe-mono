enum EventName {
  interactiveQuestion = 'interactiveQuestion',
  quizQuestion = 'quizQuestion',
}

export interface FullStoryEventData {
  courseTitle: string;
  lessonTitle: string;
  contentTitle: string;
  eventName: EventName;
  quizId: string;
  quizQuestionId: string;
  correctAnswer: string;
  answerResult: string;
  userAnswer: string;
}

export class FullStoryEvent {
  constructor(
    public courseTitle: string,
    public lessonTitle: string,
    public contentTitle: string,
    private data: { [key: string]: unknown }
  ) {}

  get eventName(): EventName {
    return this.quizId ? EventName.quizQuestion : EventName.interactiveQuestion;
  }

  get quizId(): string {
    return this.data['cmi.interactions.undefined.objectives.0.id'] as string;
  }

  get quizQuestionId(): string {
    return this.data['cmi.interactions.undefined.id'] as string;
  }

  get correctAnswer(): string {
    return this.data[
      'cmi.interactions.undefined.correct_responses.0.pattern'
    ] as string;
  }

  get answerResult(): string {
    return this.data['cmi.interactions.undefined.result'] as string;
  }

  get userAnswer(): string {
    return this.data['cmi.interactions.undefined.student_response'] as string;
  }

  get eventData(): FullStoryEventData {
    return {
      courseTitle: this.courseTitle,
      lessonTitle: this.lessonTitle,
      contentTitle: this.contentTitle,
      eventName: this.eventName,
      quizId: this.quizId,
      quizQuestionId: this.quizQuestionId,
      correctAnswer: this.correctAnswer,
      answerResult: this.answerResult,
      userAnswer: this.userAnswer,
    };
  }
}
