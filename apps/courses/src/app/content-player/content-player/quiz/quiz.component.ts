import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IContent } from '@cirrus/models';
import { LessonContentComponent } from '@cirrus/ui';
import { IQuizRequest, QuizService, Answer } from './quiz.service';

/**
 * Component for displaying a quiz
 */
@Component({
  selector: 'cirrus-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['quiz.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class QuizComponent extends LessonContentComponent implements OnInit {
  /**
   * Constructor for the QuizComponent
   * @param quizService Injects the QuizService to get the quiz
   */
  constructor(private quizService: QuizService) {
    super();
    this.quizService.getQuiz(0).subscribe(response => {
      this.quiz = response;
    });
  }

  quiz!: IQuizRequest;
  inProcess = false;
  quizCompleted = false;
  currentQuestion = -1;
  quizStartTime: Date | undefined;
  answers: Answer[] = [];

  /// TODO: replace next line when api returns actual value
  approximateDuration = '3 million minutes';

  /// Timed Quiz properties
  // TODO: implement the following timer logic correctly, placeholder for now
  isQuizTimed = true;
  quizTimeUsed = 0;

  // Answer properties
  selectedAnswer: Answer = new Answer();

  /**
   * @Input() override set content player content
   *
   * Sets the content object of the component.
   *
   * @param content IContent - The content to be set to the component.
   */
  @Input()
  override set content(content: IContent) {
    super.content = content;
  }

  /**
   * Retrieves the content from the super class.
   * @returns {IContent} The content from the super class.
   */
  override get content(): IContent {
    return super.content;
  }

  /**
   * This method is part of the Angular Component Lifecycle. It is called after the constructor and is used to initialize data and other components.
   *
   * @override
   * @ngOnInit
   *
   * This method overrides the ngOnInit method of the parent component. It emits an event with a boolean value of false to hide the previous and next buttons on the content player.
   */
  override ngOnInit(): void {
    super.ngOnInit();
    this.hidePrevAndNext.emit(false);
  }

  /**
   * getQuestionCount()
   *
   * Returns the number of questions in a quiz
   *
   * @returns {number} The number of questions in the quiz
   */
  getQuestionCount(): number {
    return !this.quiz || !this.quiz.quiz_questions ? 0 : this.quiz.quiz_questions.length;
  }

  /**
   * getSubjectList
   *
   * Gets a list of subjects from a quiz object
   *
   * @returns {string[]} An array of strings representing the subjects in the quiz
   */
  getSubjectList(): string[] {
    // TODO: remove the next line once the api endpoint correctly populates this array
    return ['#FakeSubject1', '#fakeSubject2', '#fakeSubject3'];
    // TODO: uncomment the next line once the api endpoint correctly populates this array
    //return !this.quiz || !this.quiz.subjects ? [] : this.quiz.subjects;
  }

  /**
   * startQuiz
   *
   * Starts a quiz by setting the inProcess flag to true and setting the currentQuestion to 0.
   * It also emits an event to hide the previous and next buttons on the content player.
   *
   * @returns {void}
   */
  startQuiz(): void {
    this.inProcess = true;
    this.quizStartTime = new Date();
    this.currentQuestion = 0;
    this.hidePrevAndNext.emit(true);
  }

  /**
   * goBack()
   *
   * Moves the student back a question in the quiz, or resets to overview if on first question.
   *
   * @returns void
   */
  goBack() {
    this.currentQuestion--;
    if (this.currentQuestion == -1) {
      this.inProcess = false;
    }
  }

  /**
   * Select an answer for a given question
   * @param {number} questionId - The id of the question
   * @param {number} answerId - The id of the answer
   */
  selectAnswer(questionId: number, answerId: number) {
    this.selectedAnswer = { quiz_id: this.quiz.id, question_id: questionId, answer: answerId, timestamp: new Date() };
  }

  /**
   * Submits the selected answer for the current question and increments the currentQuestion index.
   * If the current question is the last question in the quiz, the quizCompleted boolean is set to true.
   */
  submitAnswer() {
    this.answers[this.currentQuestion] = this.selectedAnswer;
    this.currentQuestion++;
    this.selectedAnswer = new Answer();
    if (this.currentQuestion === this.quiz.quiz_questions.length - 1) {
      console.log('answers:', this.answers);
      this.quizCompleted = true;
      this.hidePrevAndNext.emit(false);
    }
  }
}
