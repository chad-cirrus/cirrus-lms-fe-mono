import { Component, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    },
    public dialogRef: MatDialogRef<CompletionDialogComponent>,
    private ngZone: NgZone
  ) {}

  close(closeType: string) {
    this.ngZone.run(() => {
      this.dialogRef.close(
        closeType === 'next'
          ? this.lessonCompletionCta.nextLesson
          : this.lessonCompletionCta.reviewLesson
      );
    });
  }
}
