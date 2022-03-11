import { ASSESSMENT_TYPE } from '../AssessmentType';
import { CONTENT_STATUS } from '../IContent';
import { ILesson, LessonProgress } from '../ILesson';
import { Content } from './Content';

export class Lesson implements ILesson {
  id: number;
  system_desc: string;
  created_at: string;
  updated_at: string;
  system_name: string;
  lesson_type: number;
  order: number;
  title: string;
  overview: string;
  is_archived: boolean;
  contents_are_linear: boolean;
  is_preview: boolean;
  major_version: number;
  minor_version: number;
  contents: Content[];
  lesson_progress: LessonProgress;
  self_study_progress: LessonProgress;
  assessment_progress: LessonProgress;
  assessment: ASSESSMENT_TYPE;
  self_study: boolean;
  overview_image_url: string;
  student_intro_video: string;
  instructor_intro_video: string;
  estimated_time: string;

  /**
   *
   */
  constructor(
    id: number,
    system_desc: string,
    created_at: string,
    updated_at: string,
    system_name: string,
    lesson_type: number,
    order: number,
    title: string,
    overview: string,
    is_archived: boolean,
    contents_are_linear: boolean,
    is_preview: boolean,
    major_version: number,
    minor_version: number,
    contents: Content[],
    lesson_progress: LessonProgress,
    self_study_progress: LessonProgress,
    overview_image_url: string,
    student_intro_video: string,
    instructor_intro_video: string,
    estimated_time: string
  ) {
    this.id = id;
    this.system_desc = system_desc;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.system_name = system_name;
    this.lesson_type = lesson_type;
    this.order = order;
    this.title = title;
    this.overview = overview;
    this.is_archived = is_archived;
    this.contents_are_linear = contents_are_linear;
    this.is_preview = is_preview;
    this.major_version = major_version;
    this.minor_version = minor_version;
    this.contents = contents;
    this.lesson_progress = lesson_progress;
    this.self_study_progress = self_study_progress;
    this.assessment_progress = this.determineProgress(contents);
    this.assessment = this.determineContentTypes(contents);
    this.self_study = this.determineSelfStudy(this);
    this.overview_image_url = overview_image_url;
    this.student_intro_video = student_intro_video;
    this.instructor_intro_video = instructor_intro_video;
    this.estimated_time = estimated_time;
  }

  private determineProgress(contents: Content[]): LessonProgress {
    const listContentStatus = contents.map(c => c.status);

    const notStarted =
      listContentStatus.every(s => s === CONTENT_STATUS.NotStarted) ||
      listContentStatus.every(s => s === null);
    if (notStarted) {
      return LessonProgress.NotStarted;
    }

    const completed = listContentStatus.every(
      s => s === CONTENT_STATUS.Completed
    );
    if (completed) {
      return LessonProgress.Complete;
    }

    return LessonProgress.InProgress;
  }

  private determineContentTypes(contents: Content[]): ASSESSMENT_TYPE {
    // filter for either 9 or 10
    const filteredContentTypes = contents
      .map(c => c.content_type)
      .filter(ct => [9, 10].includes(ct));

    if (filteredContentTypes.length === 0) {
      return ASSESSMENT_TYPE.none;
    }

    // check if all are equal
    const allEqual = filteredContentTypes.every(
      (val, i, arr) => val === arr[0]
    );

    const assessmentType = !allEqual
      ? ASSESSMENT_TYPE.none
      : filteredContentTypes[0] === 9
      ? ASSESSMENT_TYPE.flight
      : ASSESSMENT_TYPE.ground;

    return assessmentType;
  }

  private determineSelfStudy(lesson: Lesson): boolean {
    return (
      lesson.lesson_type === 0 ||
      lesson.contents
        .map(c => c.content_type)
        .some(c => [0, 1, 2, 3, 4, 5, 6, 7, 8, 11].includes(c))
    );
  }
}
