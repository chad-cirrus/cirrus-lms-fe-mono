import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  NgZone,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LESSON_COMPLETION_CTA } from './LessonCompletionCtas';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cirrus-completion-dialog',
  templateUrl: './completion-dialog.component.html',
  styleUrls: ['./completion-dialog.component.scss'],
})
export class CompletionDialogComponent implements AfterViewInit, OnInit {
  private _lesson = new BehaviorSubject<string>('');
  lesson$ = this._lesson.asObservable();

  get lessonCompletionCta() {
    return LESSON_COMPLETION_CTA;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      lesson: string;
    },
    public dialogRef: MatDialogRef<CompletionDialogComponent>,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.ngZone.run(() => {
      const lesson = this.data.lesson ?? 'the lesson!';
      this._lesson.next(lesson);
    });
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

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
