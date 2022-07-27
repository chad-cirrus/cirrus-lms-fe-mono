import { Component, Input } from '@angular/core';
import { ASSESSMENT_TYPE, ILesson, NullLesson } from '@cirrus/models';
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

  private _lesson: ILesson = NullLesson;

  @Input() sideNavOpen!: boolean;
  @Input() checkoutOffsRequired!: boolean | null;
  @Input()
  set lesson(value: ILesson) {
    this._lesson = value;
    const selfStudyStats = this.lesson.progress_stats.find(stat => stat.type === 'self_study') || { status: 'not_started' };
    if (selfStudyStats) {
      this._selfStudy = true;
      this._selfStudyIconSrc = progressIconMapper(selfStudyStats.status);
    }
    this._selfStudy =
      value.contents
        .map(c => c.content_type)
        .filter(ct => ct !== 9 && ct !== 10).length > 0;
    this._flightAssessment =
      value.contents.map(c => c.content_type).filter(ct => ct === 9).length > 0;
    this._groundAssessment =
      value.contents.map(c => c.content_type).filter(ct => ct === 10).length >
      0;

    if (this._flightAssessment || this._groundAssessment) {
      const assessments = value.contents.filter(
        content => content.content_type === 9 || content.content_type === 10
      );
      const status = assessments[0].progress.status;
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
}
