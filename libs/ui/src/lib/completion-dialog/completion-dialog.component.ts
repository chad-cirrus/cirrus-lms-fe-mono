import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LESSON_COMPLETION_CTA } from './LessonCompletionCtas';

@Component({
  selector: 'cirrus-completion-dialog',
  templateUrl: './completion-dialog.component.html',
  styleUrls: ['./completion-dialog.component.scss'],
})
export class CompletionDialogComponent {
  get lessonCompletionCta() {
    return LESSON_COMPLETION_CTA;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      lesson: string;
    }
  ) {}
}
