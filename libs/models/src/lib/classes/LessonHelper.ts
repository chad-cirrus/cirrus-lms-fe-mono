// import { IContent } from '../IContent';
// import { ILesson } from '../ILesson';
// import { Content } from './Content';
// import { Lesson } from './Lesson';

// export class LessonHelper {
//   static createLessonObject(lessonJson: ILesson): Lesson {
//     const contents = this.createContentsArray(lessonJson.contents);

//     return new Lesson(
//       lessonJson.id,
//       lessonJson.system_desc,
//       lessonJson.created_at,
//       lessonJson.updated_at,
//       lessonJson.system_name,
//       lessonJson.lesson_type,
//       lessonJson.order,
//       lessonJson.title,
//       lessonJson.overview,
//       lessonJson.is_archived,
//       lessonJson.contents_are_linear,
//       lessonJson.is_preview,
//       lessonJson.major_version,
//       lessonJson.minor_version,
//       contents,
//       lessonJson.lesson_progress,
//       lessonJson.self_study_progress,
//       lessonJson.overview_image_url,
//       lessonJson.student_intro_video,
//       lessonJson.instructor_intro_video,
//       lessonJson.estimated_time
//     );
//   }


//   static createContentsArray(contentsJsonArray: IContent[]): Content[] {
//     return contentsJsonArray.map(c => this.createContent(c));
//   }

//   static createContent(contentJson: IContent): Content {
//     return new Content(
//       contentJson.id,
//       contentJson.order,
//       contentJson.title,
//       contentJson.subtitle,
//       contentJson.status,
//       contentJson.score,
//       contentJson.url,
//       contentJson.meta_tags,
//       contentJson.content_tasks,
//       contentJson.estimated_time,
//       contentJson.content_type,
//       contentJson.desc,
//       contentJson.content_file,
//       contentJson.placeholder_image,
//       contentJson.jet_scoring,
//       contentJson.content_html,
//       contentJson.created_by,
//       contentJson.upload_image,
//       contentJson.content_filename,
//       contentJson.starter_file,
//       contentJson.blob_directory,
//       contentJson.show_comments,
//       contentJson.created_at,
//       contentJson.updated_at,
//       contentJson.link_id,
//       contentJson.version,
//       contentJson.quiz
//     );
//   }
// }
