import { Component, Input } from '@angular/core';
import { ASSESSMENT_TYPE, ILesson, LessonProgress } from '@cirrus/models';

@Component({
  selector: 'cirrus-lesson-progress',
  templateUrl: './lesson-progress.component.html',
  styleUrls: ['./lesson-progress.component.scss'],
})
export class LessonProgressComponent {
  @Input() sideNavOpen!: boolean;
  @Input() lesson: ILesson = {
    id: 0,
    system_desc: '',
    created_at: '',
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
    lesson_progress: LessonProgress.Unknown,
    self_study_progress: LessonProgress.Unknown,
    assessment_progress: LessonProgress.Unknown,
    assessment: ASSESSMENT_TYPE.none,
    self_study: false,
    order: null,
    overview_image_url: '',
    student_intro_video: '',
    instructor_intro_video: '',
    estimated_time: '',
  };
  @Input() selfStudy = false;

  get assessmentType() {
    return ASSESSMENT_TYPE;
  }

  private progressIconMapper = {
    0: 'images/svg/not-started.svg',
    1: 'images/svg/not-started.svg',
    2: 'images/svg/in_progress.svg',
    3: 'images/svg/complete_check.svg',
    4: null,
  };

  get selfStudyProgressIcon() {
    return this.progressIconMapper[this.lesson.self_study_progress ?? 0];
  }

  get assessmentProgressIcon() {
    return this.progressIconMapper[this.lesson.assessment_progress ?? 0];
  }

  get lessonProgress() {
    return LessonProgress;
  }
}
