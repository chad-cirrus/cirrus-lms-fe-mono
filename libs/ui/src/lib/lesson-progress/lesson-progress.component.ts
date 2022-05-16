import { Component, Input } from '@angular/core';
import { ASSESSMENT_TYPE, ILesson } from '@cirrus/models';
import { progressIconMapper } from '../helpers/ProgressIconMapper';

@Component({
  selector: 'cirrus-lesson-progress',
  templateUrl: './lesson-progress.component.html',
  styleUrls: ['./lesson-progress.component.scss'],
})
export class LessonProgressComponent {
  private _selfStudy = false;
  private _selfStudyIconSrc = '';
  private _groundAssessment = false;
  private _flightAssessment = false;
  private _assessmentProgressIcon = '';
  private _lesson: ILesson = {
    id: 0,
    system_desc: '',
    updated_at: '',
    system_name: '',
    lesson_type: 0,
    title: '',
    overview: '',
    is_archived: false,
    contents_are_linear: false,
    is_preview: false,
    major_version: 0,
    minor_version: 0,
    contents: [],
    order: 0,
    overview_image_url: '',
    student_intro_video: '',
    instructor_intro_video: '',
    instructor_overview: '',
    instructor_contents: [],
    progress: {
      id: 0,
      status: 'unknown',
    },
    course_id: 0,
    course_attempt_id: 0,
    stage_id: 0,
  };

  @Input() sideNavOpen!: boolean;

  @Input()
  set lesson(value: ILesson) {
    this._lesson = value;
    this._selfStudy = value.lesson_type === 0;
    if (this._selfStudy) {
      this._selfStudyIconSrc = progressIconMapper(this.lesson.progress.status);
    }
    this._flightAssessment =
      value.lesson_type === 2 ||
      value.contents.map(c => c.content_type).filter(ct => ct === 9).length > 0;
    this._groundAssessment =
      value.lesson_type === 1 ||
      value.contents.map(c => c.content_type).filter(ct => ct === 10).length >
        0;

    if (this._flightAssessment || this._groundAssessment) {
      const status = this.getStatus(value);
      this._assessmentProgressIcon = progressIconMapper(status);
    }
  }

  get lesson() {
    return this._lesson;
  }

  get selfStudy() {
    return this._selfStudy;
  }

  get groundAssessment() {
    return this._groundAssessment;
  }

  get flightAssessment() {
    return this._flightAssessment;
  }

  get assessmentType() {
    return ASSESSMENT_TYPE;
  }

  get selfStudyIconSrc() {
    return this._selfStudyIconSrc;
  }

  get assessmentProgressIcon() {
    return this._assessmentProgressIcon;
  }

  private getStatus(lesson: ILesson): string {
    if (lesson.lesson_type !== 0) {
      return lesson.progress.status;
    }
    return lesson.contents[0].progress.status;
  }
}
