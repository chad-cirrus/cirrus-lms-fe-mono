import { Component, Input, OnInit } from '@angular/core';
import { IContent } from '@cirrus/models';
import { LessonContentComponent } from '@cirrus/ui';
import { IQuizRequest, QuizService } from './quiz.service';

@Component({
  selector: 'cirrus-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['quiz.component.scss'],
})
export class QuizComponent extends LessonContentComponent implements OnInit {
  constructor(private quizService: QuizService) {
    super();
    this.quizService.getQuiz(0).subscribe((response) => {
      this.quiz = response['quiz'];
    });

  }
  quiz!: IQuizRequest;

  @Input()
  override set content(content: IContent) {
    super.content = content;
  }

  override get content(): IContent {
    return super.content;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.hidePrevAndNext.emit(true);
  }

  getQuestionCount(): number {
    return !this.quiz.quiz_questions ? 0 : this.quiz.quiz_questions.length;
  }
}
