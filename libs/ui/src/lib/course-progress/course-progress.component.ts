import { Component, Input } from '@angular/core';
import { ILessonsstats, ICertificatestats } from '@cirrus/models';

@Component({
  selector: 'cirrus-course-progress',
  templateUrl: './course-progress.component.html',
  styleUrls: ['./course-progress.component.scss'],
})
export class CourseProgressComponent {
  @Input() completed_at!: string;
  @Input() lessonStats: ILessonsstats = { total: 0, completed: 0 };
  @Input() certificateStats: ICertificatestats = { total: 0, completed: 0 };
  
  lessonsCompletedIcon =
    'courses/images/svg/course-progress-lessons-completed.svg';

  get progressValue() {
    return this.lessonStats.total > 0
      ? (this.lessonStats.completed / this.lessonStats.total) * 100
      : 0;
  }

  clickAndScroll() {
    const el = document.getElementById("mat-tab-link-3");
    if(el) {
      el.click();

      const tabPanel = document.getElementById("mat-tab-nav-panel-0");
      if(tabPanel) {
        tabPanel.scrollIntoView();
      }
    }
  }

  
}
