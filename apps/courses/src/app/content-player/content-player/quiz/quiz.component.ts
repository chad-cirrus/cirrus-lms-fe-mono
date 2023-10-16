import { Component, Input, OnInit } from '@angular/core';
import { IContent } from '@cirrus/models';
import { LessonContentComponent } from '@cirrus/ui';

@Component({
  selector: 'cirrus-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['quiz.component.scss'],
})
export class QuizComponent extends LessonContentComponent implements OnInit {
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
}
