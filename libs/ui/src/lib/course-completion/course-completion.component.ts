import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LESSON_COMPLETION_CTA } from '../completion-dialog/LessonCompletionCtas';

export interface ICourseCompletionData {
  badge: string;
  student: string;
  course: string;
}

@Component({
  selector: 'cirrus-course-completion',
  templateUrl: './course-completion.component.html',
  styleUrls: ['./course-completion.component.scss'],
})
export class CourseCompletionComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ICourseCompletionData
  ) {}

  get lessonCompletionCta() {
    return LESSON_COMPLETION_CTA;
  }
}
