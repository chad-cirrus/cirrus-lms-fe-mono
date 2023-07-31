enum EventName {
  interactiveQuestion = 'interactiveQuestion',
  quizQuestion = 'quizQuestion',
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
}
