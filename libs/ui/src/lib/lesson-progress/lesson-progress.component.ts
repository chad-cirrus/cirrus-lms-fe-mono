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
    student_intro_video: {
      content: {
        blob_directory: '',
        order: 0,
        quiz: '',
        content_tasks: [],
        progress: {id: 1, status: 'not_completed'},
        content_file: '',
        content_filename: "",
        content_html: '',
        content_type: 0,
        created_by: "Cirrus Aircraft",
        desc: "Perspective & Perspective+ Avionics Course",
        id: 401,
        jet_scoring: false,
        meta_tags: [],
        placeholder_image: "https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/content-files/5c480eb38443724475091bf0d91ba12.2.png",
        score: 0,
        show_comments: true,
        starter_file: '',
        subtitle: "Hello Cockpit [2.1]",
        title: "Hello Cockpit [2.1]",
        upload_image: '',
        url: "309005652",
      },

      content_id: 401,
      hidden: false,
      required: false,
      id: 1,
      title: '',
      updated_at: '',
      created_at: ''
    },
    instructor_intro_video: {
      content_id: 401,
      created_at: "2022-05-18T15:55:59.249Z",
      hidden: false,
      id: 69,
      required: false,
      title: "hello",
      updated_at: "2022-05-18T15:55:59.249Z"
    },
    instructor_overview: '',
    instructor_contents: [],
    progress: {
      id: 0,
      status: 'unknown',
    },
    course_id: 0,
    course_attempt_id: 0,
    stage_id: 0,
    lesson_stats: {
      content_completed: 0,
      content_total: 0,
      ground_hours_completed :0,
      flight_hours_completed: 0,
      landings_completed: 0,
      assessment_tasks_total: 0,
      assessment_tasks_completed: 0
    }
  };


  @Input() sideNavOpen!: boolean;

  @Input()
  set lesson(value: ILesson) {
    this._lesson = value;
    this._selfStudy = value.contents.map(c => c.content_type).filter(ct => ct !== 9 && ct !== 10).length > 0;
    this._flightAssessment = value.contents.map(c => c.content_type).filter(ct => ct === 9).length > 0;
    this._groundAssessment = value.contents.map(c => c.content_type).filter(ct => ct === 10).length > 0;


    if (this._selfStudy) {
      this._selfStudyIconSrc = progressIconMapper(this.lesson.progress.status);
    }
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
    return lesson.contents[0].progress.status;
  }
}
