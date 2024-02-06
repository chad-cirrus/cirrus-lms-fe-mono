import { AfterViewInit, ChangeDetectorRef, Component, Inject, NgZone, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LESSON_COMPLETION_CTA } from './LessonCompletionCtas';
import { BehaviorSubject } from 'rxjs';
import { UiDownloadService } from '../course-completion/ui-download.service';
import { ICertificate, ICourseOverview } from '@cirrus/models';
import { downloadPdf } from '../helpers/DownloadPdf';

@Component({
  selector: 'cirrus-completion-dialog',
  templateUrl: './completion-dialog.component.html',
  styleUrls: ['./completion-dialog.component.scss'],
})
export class CompletionDialogComponent implements AfterViewInit, OnInit {
  private _lesson = new BehaviorSubject<string>('');
  lesson$ = this._lesson.asObservable();

  certificate: ICertificate | undefined;

  get lessonCompletionCta() {
    return LESSON_COMPLETION_CTA;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      lesson: string;
      course: ICourseOverview;
      stageId: number;
    },
    public dialogRef: MatDialogRef<CompletionDialogComponent>,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    private uiDownloadService: UiDownloadService,
  ) {}

  ngOnInit() {
    this.ngZone.run(() => {
      const lesson = this.data.lesson ?? 'the lesson!';
      this._lesson.next(lesson);
      this.changeDetectorRef.detectChanges();
    });
    this.changeDetectorRef.detectChanges();
    this.uiDownloadService.getCourse(this.data.course.id).subscribe(course => {
      this.certificate =
        course.awarded_certificates?.find(cert => cert.certifiable_name === this.getStageName(this.data.stageId)) ??
        undefined;
    });
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  downloadCertificate() {
    if (this.certificate === undefined) return;
    this.uiDownloadService.downloadCertificate(this.certificate.id).subscribe(pdf => {
      downloadPdf(pdf);
    });
  }

  getStageName(stageId: number) {
    return this.data.course.stages.find(stage => stage.id === stageId)?.title ?? '';
  }

  close(closeType: string) {
    this.ngZone.run(() => {
      this.dialogRef.close(
        closeType === 'next' ? this.lessonCompletionCta.nextLesson : this.lessonCompletionCta.reviewLesson,
      );
    });
  }
}
