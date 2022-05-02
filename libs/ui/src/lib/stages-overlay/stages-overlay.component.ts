import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Lesson } from '@cirrus/models';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'cirrus-stages-overlay',
  templateUrl: './stages-overlay.component.html',
  styleUrls: ['./stages-overlay.component.scss']
})
export class StagesOverlayComponent implements OnInit {
  @Input() workbook: any
  @Output() navigateToLesson = new EventEmitter<any>();
  expandedIndex = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>){}


  ngOnInit(): void {
      if(this.data.id) {
        this.workbook = this.data
      }
  }

  get completeCheck() {
    return 'courses/images/svg/complete_check.svg';
  }

  get inProgress() {
    return 'courses/images/svg/in_progress.svg';
  }

  get notStarted() {
    return 'courses/images/svg/not-started.svg';
  }

  navigate(lesson: Lesson) {
    if(this.data.id) {
      this.close(lesson)
    }
    const payload = {lesson, course: this.workbook}
    this.navigateToLesson.emit(payload)
  }

  close(lesson?: Lesson) {
    this.dialogRef.close(lesson)
  }


}
